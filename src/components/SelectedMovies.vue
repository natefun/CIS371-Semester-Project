<template>
  <section>
    <h1>Selected Movies</h1>
    <label for="movie">Select a movie to remove from the dropdown list</label>
    <select id="movie" name="movie" v-model="selected">
      <option v-for="(movie, pos) in selectedMovies" :key="pos">
        {{ movie.title }}
      </option>
    </select>
    <button @click="deleteMovie" href="#" class="myButton">Delete</button>
    <button @click="goback" href="#" class="myButton">GoBack</button>
    <section>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(x, pos) in selectedMovies" :key="pos">
            <td>{{ x.title }}</td>
            <td>{{ x.price }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{{total}}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  </section>
</template>
<script lang="ts">
import axios, { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";
import { QuerySnapshot } from "@firebase/firestore-types";
import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import firebase from "firebase";

interface Movie {
  title: string;
  year: number;
  imdb_id: string;
  poster: string;
  price: number;
}
@Component
export default class selectedMovies extends Vue {
  private selectedMovies: Movie[] = [];
  readonly $appDB!: FirebaseFirestore;
  private uid = "none";
  readonly $appAuth!: FirebaseAuth;
  private selected = "";
  private total = 0;

  goback() {
    this.$router.back();
  }
  mounted(): void {
    this.uid = this.$appAuth.currentUser?.uid ?? "none";
    this.$appDB
      .collection(`users/${this.uid}/categories`)
      .orderBy("title") // Sort by category name
      .get()
      .then((qs: QuerySnapshot) => {
        this.selectedMovies.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const catData = qds.data();
            this.selectedMovies.push({
              title: catData.title,
              price: catData.price,
              year: 0,
              imdb_id: "",
              poster: "",
            });
          }
        });
        for(const x in this.selectedMovies){
          this.total += this.selectedMovies[x].price;
        }
      });   
  }
  deleteMovie() {
    this.$appDB
    .doc(`users/${this.uid}/categories/${this.selected}`)
    .delete();
        this.uid = this.$appAuth.currentUser?.uid ?? "none";
    this.$appDB
      .collection(`users/${this.uid}/categories`)
      .orderBy("title") // Sort by category name
      .get()
      .then((qs: QuerySnapshot) => {
        this.selectedMovies.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const catData = qds.data();
            this.selectedMovies.push({
              title: catData.title,
              price: catData.price,
              year: 0,
              imdb_id: "",
              poster: "",
            });
          }
        });
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

tr:nth-child(even)
  {
    background-color: rgb(119, 241, 180);
  }
tr:nth-child(odd)
  {
    background-color: rgb(230, 250, 159);
  }
</style>
