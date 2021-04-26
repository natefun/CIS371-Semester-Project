<template>
  <section>
    <h1>Search a Movie</h1>
    Search By Movie Name <br /><input type="text" v-model="movieName" /><br />
    <button @click="go" href="#" class="myButton">Go</button>
    <button @click="goback" href="#" class="myButton">GoBack</button>
    <section>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Poster</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(x, pos) in allMovies" :key="pos">
            <td>{{ x.Title }}</td>
            <td>{{ x.Year }}</td>
            <td>
              <img
                :src="x.Poster"
                alt="No Poster Availible"
                width="200"
                height="300"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>
<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";

interface Movie {
  Title: string;
  Year: number;
  imdbID: string;
  Poster: string;
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
      .get("https://movie-database-imdb-alternative.p.rapidapi.com/", {
        params: {
          s: this.movieName,
          page: "1",
          r: "json",
        },
        headers: {
          "x-rapidapi-key":
            "ae7d7525edmshe28bd6a6eef3638p14f263jsnb3486bf90e1b",
          "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        },
      })
      .then((r: AxiosResponse) => r.data)
      .then((p: any) => p.Search)
      .then((movie: any[]) => {
        this.allMovies = movie;
        for (let i = 0; i < movie.length; i++) {
          //get image by id
          console.log("movie[i]", movie[i]);
          console.log("allMovies", this.allMovies);
          console.log("id", movie[i].imdb_id);
          //this.allMovies.poster = poster
          
        }
      });
  }
  go() {
    axios
      .get("https://movie-database-imdb-alternative.p.rapidapi.com/", {
        params: {
          s: this.movieName,
          page: "1",
          r: "json",
        },
        headers: {
          "x-rapidapi-key":
            "ae7d7525edmshe28bd6a6eef3638p14f263jsnb3486bf90e1b",
          "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        },
      })
      .then((r: AxiosResponse) => r.data)
      .then((p: any) => p.Search)
      .then((movie: any[]) => {
        this.allMovies = movie;
        for (let i = 0; i < movie.length; i++) {
          //get image by id
          console.log("movie[i]", movie[i]);
          console.log("allMovies", this.allMovies);
          console.log("id", movie[i].imdb_id);
        }
      });
  }
}
</script>
<style scoped>
table,
th,
td {
  position: relative;
  border: 1px solid black;
}
tr:nth-child(even) {
  background-color: rgb(151, 208, 212);
}
tr:nth-child(odd) {
  background-color: rgb(213, 216, 62);
}
</style>
