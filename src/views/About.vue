<template>
  <div class="about">
    <button class="ui button" @click="choose('housing_tax')">Taxe d'habitation</button>
    <button class="ui button" @click="choose('property_charge')">Charges de copropriété</button>
    <button class="ui button" @click="choose('property_tax')">Taxe foncière</button>
    <button class="ui button" @click="choose('purchase_price')">Prix d'achat au m²</button>
    <button class="ui button" @click="choose('rent_price')">Prix de location au m²</button>
    <div class="ui four column centered grid">
      <div v-show="choosen=='housing_tax'" :key="i" v-for="(column, i) in table('housing_tax')" class="ui column">
        <table class="ui celled table">
          <thead>
            <tr>
              <th>Département</th>
              <th>Taux (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(couple, i) in column">
              <td data-label="department">{{ couple[0] }}</td>
              <td data-label="tax">{{ couple[1] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="choosen=='property_charge'" :key="i" v-for="(column, i) in table('property_charge')" class="ui column" style="margin-bottom: 1000px">
        <table class="ui celled table">
          <thead>
            <tr>
              <th>Département</th>
              <th>Prix (€ / an / m²)</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(couple, i) in column">
              <td data-label="department">{{ couple[0] }}</td>
              <td data-label="tax">{{ couple[1] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="choosen=='property_tax'" :key="i" v-for="(column, i) in table('property_tax')" class="ui column">
        <table class="ui celled table">
          <thead>
            <tr>
              <th>Département</th>
              <th>Taux (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(couple, i) in column">
              <td data-label="department">{{ couple[0] }}</td>
              <td data-label="tax">{{ couple[1] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="choosen=='purchase_price'" :key="i" v-for="(column, i) in table('purchase_price')" class="ui column">
        <table class="ui celled table">
          <thead>
            <tr>
              <th>Département</th>
              <th>Prix (€ / m²)</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(couple, i) in column">
              <td data-label="department">{{ couple[0] }}</td>
              <td data-label="tax">{{ couple[1] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="choosen=='rent_price'" :key="i" v-for="(column, i) in table('rent_price')" class="ui column">
        <table class="ui celled table">
          <thead>
            <tr>
              <th>Département</th>
              <th>Prix (€ / m²)</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(couple, i) in column">
              <td data-label="department">{{ couple[0] }}</td>
              <td data-label="tax">{{ couple[1] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import HousingTaxes from "@/config/housing_tax.json";
import PropertyCharges from "@/config/property_charges.json";
import PropertyTaxes from "@/config/property_tax.json";
import PurchasePriceSqm from "@/config/purchase_price_sqm.json";
import RentPriceSqm from "@/config/rent_price_sqm.json";

export default class About extends Vue {
  
  private backgroundUrl = require("@/assets/background-image.png");
  private choosen = "housing_tax"

  public table(value: string): any {
    const file = Object.create({
      'housing_tax': HousingTaxes,
      'property_charge': PropertyCharges,
      'property_tax': PropertyTaxes,
      'purchase_price': PurchasePriceSqm,
      'rent_price': RentPriceSqm
    })[value]
    const length = Object.keys(file).length
    const n = Math.floor(length / 4)
    const out = []
    for (let i = 0; i < 3; i++) {
      const semi = []
      for (let j = 0; j < n; j++) {
        const key = Object.keys(file)[i * n + j]
        semi.push([key, file[key]])
      }
      out.push(semi)
    }
    const semi = []
    for (let j = 3*n; j < length; j++){
      const key = Object.keys(file)[j]
      semi.push([key, file[key]])
    }
    out.push(semi)
    return out
  }

  public choose(value: string): void {
    this.choosen = value
    this.$forceUpdate();
  }
}

</script>

<style>

.ui.button {
  margin: 30px;
}
.ui.table {
  width: 300px;
  padding: 0;
  margin: 0;
  margin-left: 60px;
}
.ui.table thead th {
  width: 150px;
}
.ui.grid > .column {
  width: 300px;
}
.ui.grid {
  width: 1500px;
  margin-left: 110px;
}

</style>