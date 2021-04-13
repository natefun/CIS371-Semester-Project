<template>
  <div id="pick">
    <section>
      <h1>Select a Movie</h1> 
      <button @click="popular">Select a popular movie</button>
      <button @click="recentMovies">Select a recently added movie</button>
      <button @click="getMovieinfo">Get Information from a movie</button><br>
      <button @click="logout">Logout</button>
      <router-view></router-view>
    </section>
    <section></section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { QuerySnapshot } from "@firebase/firestore-types";
import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import axios, { AxiosResponse } from "axios";


interface Movie {
  title: string;
  year: number;
  imdb_id: string;
}
@Component
export default class PickMovie extends Vue {
  readonly $appDB!: FirebaseFirestore;
  private allMovies: any[] = [];
  readonly $appAuth!: FirebaseAuth;
  private uid = "none";

  // This function is automatically called when the App component is added to the DOM tree
  mounted(): void {
    this.uid = this.$appAuth.currentUser?.uid ?? "none";

    //this will have to be adapted to get current movie titles and posibly images as well
     this.$appDB
       .collection(`users/${this.uid}/categories`)
       .orderBy("name") // Sort by category name
    //   .onSnapshot((qs: QuerySnapshot) => {
    //     this.allMovies.splice(0); // remove old data
    //     qs.forEach((qds: QueryDocumentSnapshot) => {
    //       if (qds.exists) {
    //         const catData = qds.data();
    //         this.allMovies.push({
    //           name: catData.name,
    //         });
    //       }
    //     });
    //   }); 
  }
  logout(): void{
    this.$router.back();
  }
  popular(): void { 
    this.$router.push({ name: "PopularMovies" });
  }
  recentMovies(): void {
    this.$router.push({ name: "RecentMovies" });
  }
  getMovieinfo(): void {
  this.$router.push({ name: "MovieInfo" });
  }
}
</script>

<style></style>
