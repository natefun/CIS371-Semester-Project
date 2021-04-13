<template>
  <section>
    <h1>Search a Movie</h1>
    Search By Movie Name <br /><input type="text" v-model="movieName" /><br />
    <button @click="searchMovie">Go</button>
    <button @click="goback">GoBack</button>
    <section>
    <h2>Name: {{movieName}}</h2>
    <h2>Year:{{year}}</h2>
    <img :src="pic" style="width:100%;" alt="">
    </section>
  </section>
</template>
<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class MovieInfo extends Vue {
  private movieName = "";
  private id = "";
  private pic = "";
  private year = 0;

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
        this.id = movie[0].imdb_id;
        this.year = movie[0].year;
        console.log(this.id);
      });
  }
  searchMovie() {
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
        this.id = movie[0].imdb_id;
        this.year = movie[0].year;
        console.log(this.id);
      });
    axios
      .get("https://movies-tvshows-data-imdb.p.rapidapi.com/", {
        params: { type: "get-movies-images-by-imdb", imdb: this.id },
        headers: {
          "x-rapidapi-key":
            "ae7d7525edmshe28bd6a6eef3638p14f263jsnb3486bf90e1b",
          "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
        },
      })
      .then((r: AxiosResponse) => r.data)
      .then((p: any) => {
        this.pic = p.poster;
        console.log(this.pic);
      });
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
