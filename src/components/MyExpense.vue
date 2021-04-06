<template>
  <div id="top">
    <router-link to="/category" replace>Add New Category</router-link>
    <section>
      <h1>Enter Your Spending Details</h1>
      <input type="number" v-model.number="spendingAmount" />
      <input type="date" v-model="spendingDate" />
      <input type="text" v-model="spendingPlace" />
      <select v-model="spendingCategory">
        <option v-for="(c, pos) in allCategories" :value="c.name" :key="pos">{{
          c.name
        }}</option>
      </select>
      <button v-on:click="addExpense">Save</button>
    </section>
    <section>
      <h1>Expenses</h1>
      <tbody>
        <tr>
          <td>Date</td>
          <td>Category</td>
          <td>Place of Purchase</td>
          <td>Amount</td>
        </tr>
        <tr v-for="(z, pos) in allExpenses" :key="pos">
          <td>{{ z.date }}</td>
          <td>{{ z.category }}</td>
          <td>{{ z.place }}</td>
          <td>${{ z.amount.toFixed(2) }}</td>
        </tr>
      </tbody>
    </section>
    <section>
      <h1>Spending Summary</h1>
      <tbody>
        <tr>
          <td>Category</td>
          <td>Amount</td>
          <td>Monthly Allocation</td>
          <td>Spending Message</td>
        </tr>
        <tr v-for="(z, pos) in expenseByCategory" :key="pos">
          <td>{{ z.category }}</td>
          <td>{{ z.amount.toFixed(2) }}</td>
          <td>{{ z.limit }}</td>
          <td>{{ z.message }}</td>
        </tr>
      </tbody>
    </section>
    <ApexChart
      width="260"
      type="donut"
      :options="{
        labels: expenseByCategory.map((forDonut) => forDonut.category),
        series: expenseByCategory.map((sweets) => sweets.amount),
      }"
    ></ApexChart>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { QuerySnapshot } from "@firebase/firestore-types";
import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import ApexChart from "vue-apexcharts";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";

@Component({ components: { ApexChart } })
export default class MyExpense extends Vue {
  readonly $appDB!: FirebaseFirestore;
  private allExpenses: any[] = [];
  private allCategories: any[] = [];
  private spendingCategory: any[] = [];
  private spendingAmount = 20;
  private spendingDate = "";
  private spendingPlace = "Walmart";
  groupedTotal = new Map<string, number>();
  expenseByCategory: any = [];
  readonly $appAuth!: FirebaseAuth;
  private uid = "none";

  // This function is automatically called when the App component is added to the DOM tree
  mounted(): void {
    this.uid = this.$appAuth.currentUser?.uid ?? "none";

    //all categories
    this.$appDB
      .collection(`users/${this.uid}/categories`)
      .orderBy("name") // Sort by category name
      .onSnapshot((qs: QuerySnapshot) => {
        this.allCategories.splice(0); // remove old data
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

    //all expenses
    this.$appDB
      .collection(`users/${this.uid}/expenses`)
      .orderBy("date") // Sort by date
      .onSnapshot((qs: QuerySnapshot) => {
        this.allExpenses.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            const expData = qds.data();
            this.allExpenses.push({
              date: expData.date,
              category: expData.category,
              place: expData.place,
              amount: expData.amount,
            });
          }
        });
        //grouped total
        this.allExpenses.forEach((ex: any) => {
          const { category, amount } = ex;
          //   console.log("we got here", category, amount);
          if (this.groupedTotal.has(category)) {
            // This category has been recorded earlier, get the old total
            const oldTotal = this.groupedTotal.get(category) as number;
            this.groupedTotal.set(category, oldTotal + amount);
          } else {
            // This is a new category
            this.groupedTotal.set(category, amount);
          }
        });
        this.expenseByCategory.splice(0); // remove old data

        this.groupedTotal.forEach((spTotal: number, spCat: string) => {
          // locate the this category within the `allCategories` array
          const pos = this.allCategories.findIndex(
            (d: any) => d.name === spCat
          );
          if (spTotal > this.allCategories[pos].limit) {
            this.expenseByCategory.push({
              category: spCat,
              amount: spTotal,
              limit: this.allCategories[pos].limit,
              message: "Overspent",
            });
          } else {
            this.expenseByCategory.push({
              category: spCat,
              amount: spTotal,
              limit: this.allCategories[pos].limit,
              message: "All is Good",
            });
          }
        });
      });
  }

  addExpense(): void {
    this.$appDB.collection(`users/${this.uid}/expenses`).add({
      amount: this.spendingAmount,
      date: this.spendingDate,
      category: this.spendingCategory,
      place: this.spendingPlace,
    });
  }
}
</script>

<style>
#top {
  background: rgb(152, 213, 231);
  color: black;
  padding: 12px;
  border: 3px solid rgb(92, 92, 92);
  border-radius: 30px;
  margin: 5px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-areas: "input summary" "donut expenses";
}
#top > section:nth-child(1) {
  background: rgb(120, 185, 34);
  padding: 8px;
  border: 3px solid rgb(92, 92, 92);
  border-radius: 20px;
  margin: 5px;
  grid-area: input;
}
#top > section:nth-child(2) {
  background: rgb(202, 175, 22);
  padding: 8px;
  border: 3px solid rgb(92, 92, 92);
  border-radius: 20px;
  margin: 5px;
  grid-area: expenses;
}
#top > section:nth-child(3) {
  background: rgb(120, 185, 34);
  padding: 8px;
  border: 3px solid rgb(92, 92, 92);
  border-radius: 20px;
  margin: 5px;
  grid-area: summary;
}
#top > :nth-child(4) {
  background: rgb(202, 175, 22);
  padding: 8px;
  border: 3px solid rgb(92, 92, 92);
  border-radius: 20px;
  margin: 5px;
  grid-area: donut;
}
</style>
