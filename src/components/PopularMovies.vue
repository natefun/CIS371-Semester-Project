<template>
  <div class="PopularMovies">
    <section>
      <button @click="goback">GoBack</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Imbd_ID</th>
            <th>Rating</th>
            <th>Rated</th>
          </tr>
        </thead>
        <tr v-for="(x, pos) in allMovies" :key="pos">
          <td>{{ x.title }}</td>
          <td>{{ x.year }}</td>
          <td>{{ x.imdb_id }}</td>
          <td>{{ x.rating }}</td>
          <td>{{ x.rated }}</td>
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
  rating: number;
  rated: string;
}

@Component
export default class PopularMivies extends Vue {
  private allMovies: Movie[] = [];
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
         this.allMovies = movieInfo;
        for (let x = 0; x < this.allMovies.length; x++) {
          const sth = this.getpop(this.allMovies[x].imdb_id)
          .then((mmm: any[]) =>{
            movieInfo[x].rating = mmm[0];
            movieInfo[x].rated = mmm[1];
          })
          
        }
      });
  }
  goback() {
    this.$router.back();
  }
  async getpop(id: string) {
    return await axios
      .get("https://movies-tvshows-data-imdb.p.rapidapi.com/", {
        params: {
          type: "get-movie-details",
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
       return [p.imdb_rating, p.rated];
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
