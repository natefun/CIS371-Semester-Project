<template>
  <div id="budget">
    <router-link to="/expenses" replace>Add Expense Details</router-link>
    <section>
        <h1>Add Expense Category</h1>
        <p>Name</p>
        <input type="text" v-model="budgetCategory">
        <p>Limit</p>
        <input type="number" v-model.number = "budgetLimit">
        <button v-on:click="saveCategory">Add Category</button>
    </section>
    <section>
        <tbody>
            <tr>
                <td>Category</td>
                <td>Monthly Limit</td>
            </tr>
            <tr v-for="(z,pos) in allCategories" :key="pos">
                <td>{{z.name}}</td>
                <td>${{z.limit.toFixed(2)}}</td>
            </tr>
        </tbody>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {FirebaseFirestore} from "@firebase/firestore-types";
import {QuerySnapshot} from '@firebase/firestore-types';
import {QueryDocumentSnapshot} from '@firebase/firestore-types';
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";


@Component
export default class BudgetCategory extends Vue {
  readonly $appDB!: FirebaseFirestore;
  private budgetCategory = "";
  private budgetLimit = 50;
  private allCategories: any[] = [];
  readonly $appAuth!: FirebaseAuth;
  private uid = "none"


  // This function is automatically called when the App component is added to the DOM tree
  mounted(): void {
    this.uid = this.$appAuth.currentUser?.uid ?? "none";

    //   console.log("testLog");

    this.$appDB
    .collection(`users/${this.uid}/categories`)
      .orderBy("name")       // Sort by category name
      .onSnapshot((qs: QuerySnapshot) => {
        this.allCategories.splice(0);  // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const catData = qds.data();
            this.allCategories.push({
              name: catData.name,
              limit: catData.monthlyLimit,
            });
          }
        });
      });
  }

  saveCategory(): void {
    this.$appDB
    .collection(`users/${this.uid}/categories`)
      .add({name: this.budgetCategory, monthlyLimit: this.budgetLimit})
  }
}
</script>

<style>
#budget {
  background: rgb(152, 213, 231);
  color: black;
  padding: 12px;
  border: 3px solid rgb(92, 92, 92);
  border-radius: 30px;
  margin: 5px;
  display: block;
}
#budget > section:nth-child(1)  {
  background: rgb(120, 185, 34);
  padding: 8px;
  border: 3px solid rgb(92, 92, 92);
  border-radius: 20px;
  margin: 5px;
}
#budget > section:nth-child(2){
  background: rgb(202, 175, 22);
  padding: 8px;
  border: 3px solid rgb(92, 92, 92);
  border-radius: 20px;
  margin: 5px;
}

</style>

