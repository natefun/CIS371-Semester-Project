<template>
  <div id="app" :style="{backgroundImage:'url(https://media.istockphoto.com/photos/paper-cup-with-a-popcorn-on-white-picture-id1160441778?k=6&m=1160441778&s=612x612&w=0&h=4ao1AKLeDLTh1fZKp-cSq7oRmq7u94REMnSc7JWj3PE=)'}">
    <h1>Movie Ticket Sales</h1>
    <button v-if="userLoggedIn()" v-on:click="doLogout">Logout</button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PickMovie from './components/PickMovie.vue';
import AppLogin from './AppLogin.vue';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

@Component({
  components: {
    PickMovie,
    AppLogin,
  },
})
export default class App extends Vue {
  readonly $appAuth!: FirebaseAuth;

  userLoggedIn(): boolean {
    return this.$appAuth.currentUser?.uid !== undefined;
  }

  doLogout(): void {
    this.$appAuth.signOut();
    this.$router.back();    // Go backward in the "history stack"
  }


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.myButton {
	box-shadow: 3px 4px 0px 0px #1564ad;
	background:linear-gradient(to bottom, #79bbff 5%, #378de5 100%);
	background-color:#79bbff;
	border-radius:5px;
	border:1px solid #337bc4;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:10px;
	font-weight:bold;
	padding:10px 20px;
	text-decoration:none;
	text-shadow:0px 1px 0px #528ecc;
}
.myButton:hover {
	background:linear-gradient(to bottom, #378de5 5%, #79bbff 100%);
	background-color:#378de5;
}
.myButton:active {
	position:relative;
	top:1px;
}
table {
  margin: auto auto;
}
</style>
