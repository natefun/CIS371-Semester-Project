<template>
  <div id="app">
    <h1>Movie Ticket Sales</h1>
    <button v-if="userLoggedIn()" v-on:click="doLogout">Logout</button>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import BudgetCategory from './components/BudgetCategory.vue';
import MyExpense from './components/MyExpense.vue';
import AppLogin from './AppLogin.vue';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

@Component({
  components: {
    BudgetCategory,
    MyExpense,
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

table, tr, td {
  border: 2px solid black;
  padding: 4px;
  margin: 4px;
  text-align: center;
}

</style>
