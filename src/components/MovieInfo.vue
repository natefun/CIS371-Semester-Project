<template>
  <section>
    <h1>Search a Movie</h1>
    Search By Movie Name <br /><input type="text" v-model="movieName" /><br />
    <button @click="getImage">Go</button>
    <button @click="goback">GoBack</button>
    <section>
      <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Poster</th>
        </tr>
      </thead>
      <tr v-for="(x, pos) in allMovies" :key="pos">
        <td>{{ x.title }}</td>
        <td>{{ x.year }}</td>
        <td>{{ x.poster }}</td>
      </tr>
      <tbody></tbody>
    </table>
    </section>
  </section>
</template>
<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";

interface Movie {
  title: string;
  year: number;
  imdb_id: string;
  poster: string;
}
@Component
export default class MovieInfo extends Vue {
  private movieName = "The Avengers";
  private id = "";
  //private pic: string[] = "";
  private year = 0;
  private allMovies: Movie[] = [];
  goback() {
    this.$router.back();
  }
  mounted(): void {
    axios
      .get("https://movies-tvshows-data-imdb.p.rapidapi.com/", {
        params: {
          type: "get-movies-by-title",
          title: this.movieName,
        },
        headers: {
          "x-rapidapi-key":
            "ae7d7525edmshe28bd6a6eef3638p14f263jsnb3486bf90e1b",
          "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
        },
      })
      .then((r: AxiosResponse) => r.data)
      .then((p: any) => p.movie_results)
      .then((movie: any[]) => {
        console.log(movie);
        this.allMovies = movie;
        for (let i = 0; i < movie.length; i++) {
          //get image by id
          console.log("movie[i]",movie[i])
          console.log("allMovies",this.allMovies)
          console.log("id",movie[i].imdb_id);
          this.getImage(movie[i].imdb_id)
          //this.allMovies.poster = poster
          .then((po:string) => {
              this.allMovies[i].poster = po;
          })
        }
      });
  }
  async getImage(id: string) {
    return await axios
      .get("https://movies-tvshows-data-imdb.p.rapidapi.com/", {
        params: {
          type: "get-movies-images-by-imdb",
          imdb: id,
        },
        headers: {
          "x-rapidapi-key":
            "ae7d7525edmshe28bd6a6eef3638p14f263jsnb3486bf90e1b",
          "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
        },
      })
      .then((r: AxiosResponse) => r.data)
      .then((p: any) => {
        console.log("P in getImage", p)
        return p.poster})
  }
}
</script>
<style scoped>
table,
th,
td {
  border: 1px solid black;
}
</style>
