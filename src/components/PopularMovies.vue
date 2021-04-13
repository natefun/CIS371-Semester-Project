<template>
  <div class="PopularMovies">
  <section>
    <button @click="goback">GoBack</button>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Rating</th>
          <th>Rated</th>
        </tr>
      </thead>
      <tr v-for="(x, pos) in allMovies" :prop="x" :key="pos">
        <td>{{ x.title }}</td>
        <td>{{ x.year }}</td>
        <td>{{}}</td>
        <td>{{}}</td>
      </tr>
      <tbody></tbody>
    </table>
  </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";

interface Movie {
  title: string;
  year: number;
  imdb_id: string;
  rating: string;
  rated: string;
}

@Component
export default class PopularMivies extends Vue {
  private allMovies: any[] = [];
  private movie_imbd: string[] = [];
  private movie_rated: string[] = [];
  private movie_rating: string[] = [];
  mounted(): void {
    axios
      .get("https://movies-tvshows-data-imdb.p.rapidapi.com/", {
        params: { type: "get-popular-movies", page: "1", year: "2020" },
        headers: {
          "x-rapidapi-key":
            "ae7d7525edmshe28bd6a6eef3638p14f263jsnb3486bf90e1b",
          "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
        },
      })
      .then((r: AxiosResponse) => r.data)
      .then((p: any) => p.movie_results)
      .then((movieInfo: Movie[]) => {
        this.allMovies.push(...movieInfo);
        this.movie_imbd = movieInfo.map((a) => a.imdb_id);
        this.getpop();
      });
  }
  goback() {
    this.$router.back();
  }
  getpop() {
    //the maximum number for getting images of the movies is 15,
    //I tried 20 but it returns a 429 error message because of the limit of the API
    for (let x = 0; x < 15; x++) {
      axios
        .get("https://movies-tvshows-data-imdb.p.rapidapi.com/", {
          params: {
            type: "get-movie-details",
            imdb: this.movie_imbd[x],
          },
          headers: {
            "x-rapidapi-key":
              "ae7d7525edmshe28bd6a6eef3638p14f263jsnb3486bf90e1b",
            "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
          },
        })
        .then((r: AxiosResponse) => r.data)
        .then((p: any) => {
          this.movie_rated.push(p.rated);
          this.movie_rating.push(p.imdb_rating);
        });
    }
        //console.log(this.movie_rated);
        console.log(this.movie_rating);
     for(let x = 0; x < 15; x++){
         this.allMovies.push({rating : this.movie_rating[x]});
     }
     console.log(this.allMovies);
    
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
