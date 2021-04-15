import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import { AppRouter } from "./app-routing";


Vue.config.productionTip = false;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9A9AntRVdS-hTXAvooqBNqp2eytON1Wg",
  authDomain: "finalproject-30b18.firebaseapp.com",
  projectId: "finalproject-30b18",
  storageBucket: "finalproject-30b18.appspot.com",
  messagingSenderId: "286227750333",
  appId: "1:286227750333:web:8afc38253788fa9f4d06d4",
  measurementId: "G-TTSN5SH7RB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
Vue.prototype.$appAuth = firebase.auth();
Vue.prototype.$appDB = firebase.firestore();


new Vue({
  router: AppRouter,
  render: h => h(App),
}).$mount('#app')



