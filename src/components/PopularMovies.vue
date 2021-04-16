<template>
  <div class="PopularMovies">
    <section>
      <label for="movie">Select a movie from the dropdown list</label>
      <select id="movie" name="movie" v-model="selected">
        <option v-for="(movie, pos) in allMovies" :key="pos">
          {{ movie.title }}
        </option>
      </select>
      <button @click="goback">GoBack</button>
      <button @click="submit">Submit</button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Imbd_ID</th>
            <th>Rating</th>
            <th>Rated</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(x, pos) in allMovies" :key="pos">
            <td>{{ x.title }}</td>
            <td>{{ x.year }}</td>
            <td>{{ x.imdb_id }}</td>
            <td>{{ x.rating }}</td>
            <td>{{ x.rated }}</td>
            <template v-if="x.year > 2015">
              <td>30</td>
            </template>
            <template v-else>
              <td>10</td>
            </template>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";
import { QuerySnapshot } from "@firebase/firestore-types";
import { QueryDocumentSnapshot } from "@firebase/firestore-types";

interface Movie {
  title: string;
  year: number;
  imdb_id: string;
  rating: number;
  rated: string;
}

@Component
export default class PopularMovies extends Vue {
  private allMovies: Movie[] = [];
  readonly $appDB!: FirebaseFirestore;
  private uid = "none";
  readonly $appAuth!: FirebaseAuth;
  private selectedMovies: any[] = [];
  private selected = "";
  private price = 30;

  mounted(): void {
    console.log("API Key", this.$appDB.app.options_.apiKey);
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
    this.$appDB
      .collection(`users/${this.uid}/categories`)
      .orderBy("name") // Sort by category name
      .onSnapshot((qs: QuerySnapshot) => {
        this.selectedMovies.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const catData = qds.data();
            this.selectedMovies.push({
              selected: catData.selected,
            });
          }
        });
      });
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
          this.getpop(this.allMovies[x].imdb_id).then((mmm: any[]) => {
            this.allMovies[x].rating = mmm[0];
            this.allMovies[x].rated = mmm[1];
          });
        }
      });
  }
  submit() {
    console.log("Submit");
    this.$appDB
      .collection(`users/${this.uid}/categories`)
      .add({ title: this.selected, price: this.price });
      this.$router.push({ name: "SelectedMovies" });
  }
  goback() {
    this.$router.back();
  }
  async getpop(id: string) {
    return axios
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
