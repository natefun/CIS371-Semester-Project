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
  apiKey: "AIzaSyCjKU8Geufig5049hqNx0KVJeySQcLZDkM",
  authDomain: "cis371-budget-tutorial.firebaseapp.com",
  projectId: "cis371-budget-tutorial",
  storageBucket: "cis371-budget-tutorial.appspot.com",
  messagingSenderId: "497673969426",
  appId: "1:497673969426:web:0249b916ac313f753d5dcb",
  measurementId: "G-9V0RW1ZXCW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
Vue.prototype.$appAuth = firebase.auth();
Vue.prototype.$appDB = firebase.firestore();


new Vue({
  router: AppRouter,
  render: h => h(App),
}).$mount('#app')



