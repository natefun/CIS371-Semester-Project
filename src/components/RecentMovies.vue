<template>
<div class="RecentMovies">
  <section>
    <h1>RecentMovies</h1>
    <button @click="goback">GoBack</button>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
        </tr>
      </thead>
      <tr v-for="(x, pos) in allMovies" :prop="x" :key="pos">
        <td>{{ x.title }}</td>
        <td>{{ x.year }}</td>
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
export default class RecentMovies extends Vue {
  private allMovies: any[] = [];
  goback() {
    this.$router.back();
  }
  mounted(): void {
    axios
      .get("https://movies-tvshows-data-imdb.p.rapidapi.com/", {
        params: {
          type: "get-nowplaying-movies",
          page: "1",
        },
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