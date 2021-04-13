<template>
  <div id="login">
      <p>Email</p>
      <input type="text" v-model="userEmail">
      <p>Password</p>
      <input type="password" v-model="userPassword">
      <button :disabled="noInput" v-on:click="createAccount">Sign Up</button>
      <button :disabled="noInput" v-on:click="authenticate">Sign In</button>
      <div>{{message}}</div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import {FirebaseFirestore} from "@firebase/firestore-types";

@Component
export default class AppLogin extends Vue {
    private message = "";
    private userEmail = "";
    private userPassword = "";
    readonly $appAuth!: FirebaseAuth;


    get noInput(): boolean {
        return this.userEmail.length === 0 || this.userPassword.length === 0;
    }

    createAccount(): void {
        this.$appAuth
        .createUserWithEmailAndPassword(this.userEmail, this.userPassword)
        .then((u: UserCredential) => {
            this.showMessage(`User create UID ${u.user?.uid}`);
        })
        .catch((err: any) => {
            this.showMessage(`Unable to create account ${err}`);
        });
        this.$router.push({ name: "PickMovie" });    
    }

    authenticate(): void {
        this.$appAuth
        .signInWithEmailAndPassword(this.userEmail, this.userPassword)
        .then((u: UserCredential) => {
            this.showMessage(`Login successful UID ${u.user?.uid}`);
        })
        .catch((err: any) => {
            this.showMessage(`Unable to login ${err}`);
        });
        this.$router.push({ name: "PickMovie" });
    }

    showMessage(m: string): void {
        this.message = m;
        setTimeout(() => {    // Auto disappear after 5 seconds
            this.message = "";
        }, 5000);
    }


}
</script>

<style>
</style>
