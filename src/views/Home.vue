<template>
  <div class="home">
    <!-- Comment <HelloWorld
      msg="Welcome to the Rent Or Buy calculator"
      style="padding: 30px"
    /> -->
    <div class="landing">
      <h1 style="font-size: 5rem">Acheter ou louer en 2023 ?</h1>
      <h2>Découvrez si vous devriez plutôt être une cigale ou une fourmi pour votre futur
  projet immobilier</h2>
      <div class="row-inputs">
        <number-input
          :value="price"
          label="Prix du bien visé"
          @input="price = $event"
          :placeholder="computedPrice"
        />
        <number-input
          :value="contribution"
          label="Apport possible"
          @input="contribution = $event"
        />
        <number-input
          :value="zipcode"
          label="Code postal"
          @input="changeZipcode($event)"
          rightLabel="null"
        />
      </div>
      <button class="submit" v-on:click="handleScroll">Voir le résultat</button>
      <div class="images">
        <img src="@/assets/cicada.png" />
        <img src="@/assets/house.png" />
        <img src="@/assets/ant.png" />
      </div>
    </div>
    <div class="ui three columns centered grid">
      <div class="ui side column">
        <li class="ui card">
          <h3>Données</h3>
          <div class="ui divider"></div>
          <number-input
            :value="zipcode"
            label="Code postal"
            @input="changeZipcode($event)"
            rightLabel="null"
          />
          <number-input
            :value="price"
            label="Prix du bien visé"
            @input="price = $event"
            :placeholder="computedPrice"
          />
          <number-input
            :value="rent"
            label="Loyer visé"
            @input="rent = $event"
            :placeholder="computedRent"
          />
          <number-input
            :value="purchaseSurface"
            label="Surface visée"
            @input="purchaseSurface = $event"
            :placeholder="computedPurchaseSurface"
            rightLabel="m2"
          />
          <number-input
            :value="contribution"
            label="Apport possible"
            @input="contribution = $event"
          />
          <div class="advanced" style="cursor: pointer" @click="showAdvanced = !showAdvanced">
            Paramètres avancés
            <i :class="showAdvanced ? 'angle down icon' : 'angle right icon'" style="color: #0A806B"></i>
          </div>
          <number-input
            v-if="showAdvanced"
            :value="mortgageDuration"
            label="Durée du prêt"
            @input="mortgageDuration = $event"
            :placeholder="computedMortgagoDuration / 12"
            rightLabel="ans"
          />
          <number-input
            v-if="showAdvanced"
            :value="payment"
            label="Mensualité"
            @input="payment = $event"
            :placeholder="computedPayment"
          />
          <number-input
            v-if="showAdvanced"
            :value="insuranceRate"
            label="Taux de l'assurance"
            @input="insuranceRate = $event"
            :placeholder="computedInsuranceRate * 1200"
            rightLabel="%"
          />
          <number-input
            v-if="showAdvanced"
            :value="notaryFees"
            label="Frais de notaire"
            @input="notaryFees = $event"
            :placeholder="computedNotaryFees"
          />
          <number-input
            v-if="showAdvanced"
            :value="guarantyFees"
            label="Frais de garantie"
            @input="guarantyFees = $event"
            :placeholder="computedGuarantyFees"
          />
          <number-input
            v-if="showAdvanced"
            :value="propertyCharges"
            label="Charges de propriété"
            @input="propertyCharges = $event"
            :placeholder="computedPropertyCharges"
          />
          <number-input
            v-if="showAdvanced"
            :value="maintenance"
            label="Maintenance / Rénovation"
            @input="maintenance = $event"
            :placeholder="computedMaintenance"
          />
          <number-input
            v-if="showAdvanced"
            :value="housingTax"
            label="Taxe d'habitation"
            @input="housingTax = $event"
            :placeholder="computedHousingTax"
          />
          <number-input
            v-if="showAdvanced"
            :value="propertyTax"
            label="Taxe foncière"
            @input="propertyTax = $event"
            :placeholder="computedPropertyTax"
          />
          <number-input
            v-if="showAdvanced"
            :value="agencyFees"
            label="Frais d'agence"
            @input="agencyFees = $event"
            :placeholder="computedAgencyFees"
          />
        </li>
      </div>
      <div class="ui six wide column">
        <chart :purchaseCosts="purchaseCostsArray" :rentalCosts="rentalCostsArray" :labels="labels" />
        <div class="ui centered card" style="margin-bottom: 30px">
          <div style="margin: 10px">
            <h4>Il vaut mieux acheter à partir de : <strong>{{ formatNumber(equilibrium) }} ans</strong></h4>
          </div>
        </div>
      </div>
      <div class="ui side column">
        <li class="ui card">
          <h3>Paramètres</h3>
          <div class="ui divider"></div>
          <slider-input
            :value="computedHomePriceGrowthRate * 1000"
            :min="0"
            :max="50"
            rightLabel="%"
            v-
            label="Croissance du prix du bien"
            id="homePriceGrowthRate"
            @input="homePriceGrowthRate = $event / 10"
          />
          <slider-input
            :value="computedRentGrowthRate * 1000"
            :min="0"
            :max="50"
            rightLabel="%"
            label="Croissance de la location"
            id="rentGrowthRate"
            @input="rentGrowthRate = $event / 10"
          />
          <slider-input
            :value="computedSavingsReturnRate * 1000"
            label="Rendement de l'épargne"
            :min="0"
            :max="50"
            rightLabel="%"
            id="savingsReturnRate"
            @input="savingsReturnRate = $event / 10"
          />
          <slider-input
            :value="computedInflationRate * 1000"
            label="Inflation"
            :min="0"
            :max="50"
            rightLabel="%"
            id="inflationRate"
            @input="inflationRate = $event / 10"
          />
          <slider-input
            :value="computedPropertyTaxRate * 1000"
            label="Taux de taxe foncière"
            :min="0"
            :max="500"
            rightLabel="%"
            id="propertyTaxRate"
            @input="propertyTaxRate = $event / 10"
          />
          <slider-input
            :value="computedMortgageRate * 12000"
            label="Taux du prêt"
            :min="0"
            :max="50"
            rightLabel="%"
            id="mortgageRate"
            @input="mortgageRate = $event / 10"
          />
        </li>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import NumberInput from "@/components/NumberInput.vue";
import SliderInput from "@/components/SliderInput.vue";
import Chart from "@/components/Chart.vue";
import HousingTaxes from "@/config/housing_tax.json";
import PropertyCharges from "@/config/property_charges.json";
import PropertyTaxes from "@/config/property_tax.json";
import PurchasePriceSqm from "@/config/purchase_price_sqm.json";
import RentPriceSqm from "@/config/rent_price_sqm.json";

@Component({
  components: {
    HelloWorld,
    'number-input': NumberInput,
    'slider-input': SliderInput,
    chart: Chart
  }
})
export default class Home extends Vue {

  private HOME_PRICE_GROWTH_RATE = 3;
  private INFLATION_RATE = 2;
  private INSURANCE_RATE = 0.2;
  private MORTGAGE_DURATION = 25;
  private MORTGAGE_RATE = 1.5;
  private RENT_GROWTH_RATE = 1;
  private SAVINGS_RETURN_RATE = 1;
  private agencyFees: any = null;
  private contribution: any = null;
  private guarantyFees: any = null;
  private homePriceGrowthRate: any = null;
  private housingTax: any = null;
  private inflationRate: any = null;
  private insuranceRate: any = null;
  private maintenance: any = null;
  private monthlySavings: any = null;
  private mortgageDuration: any = null;
  private mortgageRate: any = null;
  private notaryFees: any = null;
  private payment: any = null;
  private purchaseSurface: any = null;
  private price: any = null;
  private propertyCharges: any = null;
  private propertyTax: any = null;
  private propertyTaxRate: any = null;
  private rent: any = null;
  private rentGrowthRate: any = null;
  private savingsReturnRate: any = null;
  private zipcode: any = null;
  private backgroundUrl = require("@/assets/background-image.png");
  private showAdvanced = false;

  get computedWatchedVars() {
    return [this.price, this.contribution, this.zipcode]
  }
  get computedAgencyFees(): number {
    return +this.agencyFees || this.computedRent
  }
  get computedGuarantyFees(): number {
    return +this.guarantyFees || 0.01 * this.principal
  }
  get computedHomePriceGrowthRate() {
    return (this.homePriceGrowthRate && +this.homePriceGrowthRate / 100) || this.HOME_PRICE_GROWTH_RATE / 100
  }
  get computedHousingTax(): number {
    return +this.housingTax || ( this.getHashOf(HousingTaxes)[this.department] * this.computedPurchaseSurface )
  }
  get computedInsuranceRate(): number {
    return (this.insuranceRate && (+this.insuranceRate / 1200)) || this.INSURANCE_RATE / 1200
  }
  get computedInflationRate(): number {
    return (this.inflationRate && +this.inflationRate / 100) || this.INFLATION_RATE / 100
  }
  get computedMaintenance(): number {
    return +this.maintenance || 0.01 * this.computedPrice
  }
  get computedMortgagoDuration(): number {
    return (this.mortgageDuration && (+this.mortgageDuration * 12)) || this.MORTGAGE_DURATION * 12
  }
  get computedMortgageRate(): number {
    return (this.mortgageRate && +this.mortgageRate / 1200) || this.MORTGAGE_RATE / 1200
  }
  get computedNotaryFees(): number {
    return +this.notaryFees || 0.08 * this.computedPrice
  }
  get computedPayment() {
    if (this.payment) {
      return +this.payment
    }
    else {
      return this.principal * this.computedMortgageRate / ( 1 - ( 1 + this.computedMortgageRate ) ** ( - this.computedMortgagoDuration) )
    }
  }
  get computedPrice(): number {
    if (this.price) {
      return +this.price
    }
    else if (this.purchaseSurface) {
      return this.getHashOf(PurchasePriceSqm)[this.department] * +this.purchaseSurface
    }
    else {
      return (this.principal - this.computedGuarantyFees + +this.contribution) / 1.08
    }
  }
  get computedPropertyCharges(): number {
    return +this.propertyCharges || this.getHashOf(PropertyCharges)[this.department] * this.computedPurchaseSurface || PropertyCharges["00"] * this.computedPurchaseSurface
  }
  get computedPropertyTax(): number {
    return +this.propertyTax || this.getHashOf(RentPriceSqm)[this.department] * this.computedPurchaseSurface * 3 * this.computedPropertyTaxRate
  }
  get computedPropertyTaxRate(): number {
    return this.propertyTaxRate && (+this.propertyTaxRate / 100) || this.getHashOf(PropertyTaxes)[this.department] / 100
  }
  get computedPurchaseSurface(): number {
    if (this.purchaseSurface) {
      return +this.purchaseSurface
    }
    else {
      return this.computedPrice / this.getHashOf(PurchasePriceSqm)[this.department]
    }
  }
  get computedRent(): number {
    return +this.rent || this.getHashOf(RentPriceSqm)[this.department] * this.computedPurchaseSurface
  }
  get computedRentGrowthRate(): number {
    return (this.rentGrowthRate && +this.rentGrowthRate / 100) || this.RENT_GROWTH_RATE / 100
  }
  get computedSavingsReturnRate(): number {
    return (this.savingsReturnRate && +this.savingsReturnRate / 100) || this.SAVINGS_RETURN_RATE / 100
  }
  get costs(): Array<object> {
    return [...Array(25).keys()].map(this.getHashOfCosts)
  }
  get department(): string {
    const zip = (this.zipcode && this.zipcode.toString()) || "75"
    return zip.slice(0, 2) == "97" ? zip.slice(0, 3) : zip.slice(0, 2)
  }
  get equilibrium(): number {
    return this.costs.findIndex(this.purchaseIsFavorable)
  }
  get labels(): Array<number> {
    return [...Array(25).keys()]
  }
  get principal(): number {
    if (this.purchaseSurface || this.price) {
      return (this.computedPrice * 1.08 - +this.contribution) / 0.99
    }
    else if (this.payment) {
      return (this.payment * ( 1 - ( 1 + this.computedMortgageRate ) ** ( - this.computedMortgagoDuration) )) / this.computedMortgageRate
    }
    else {
      return 0
    }
  }
  get purchaseCostsArray(): Array<number> {
    return [...Array(25).keys()].map(i => this.getHashOf(this.getHashOfCosts(i))['purchase']['initialCosts'] + this.getHashOf(this.getHashOfCosts(i))['purchase']['recuringCosts'] + this.getHashOf(this.getHashOfCosts(i))['purchase']['finalSavings'])
  }
  get rentalCostsArray(): Array<number> {
    return [...Array(25).keys()].map(i => this.getHashOf(this.getHashOfCosts(i))['rent']['initialCosts'] + this.getHashOf(this.getHashOfCosts(i))['rent']['recuringCosts'] + this.getHashOf(this.getHashOfCosts(i))['rent']['finalSavings'])
  }

  public changeZipcode(input: number): void {
    this.zipcode = input;
    this.propertyTaxRate = null;
    this.propertyTax = null;
    this.housingTax = null;
  }
  public getHashOf(jsonFile: any): any {
    const result: { [unit: string]: number } = jsonFile
    return result
  }
  public formatNumber(input: number, i: number): string {
    const stringNumber = (input.toFixed(i)).toString();
    const floor = Math.floor(stringNumber.length / 3);
    const rest = stringNumber.length % 3;
    let stringResult = stringNumber.slice(0, rest) + ' ';
    for(let i=0; i < floor; i++){
      stringResult += stringNumber.slice(rest + i * 3, rest + (i+1) * 3) + ' ';
    }
    return stringResult
  }
  public yearlySavings(duration: number): number {
    return this.purchaseRecuringCosts(duration) - this.rentRecuringCosts(duration)
  }
  public rentFinalSavings(duration: number): number {
    const returnRate = this.computedSavingsReturnRate;
    const contribution = this.contribution;
    const yearlySavings = this.yearlySavings(duration);
    const investmentGain = yearlySavings * ( ( (1 + returnRate) * ( (1 + returnRate) ** duration - 1 ) / returnRate ) - duration );
    return contribution * ( (1 + returnRate) ** duration ) + investmentGain
  }
  public rentRecuringCosts(duration: number): number {
    if (duration == 0) { return 0 }
    else {
      return (12 * this.computedRent * ((1 + this.computedRentGrowthRate)**(duration - 1)) + this.computedHousingTax * (1 + this.computedInflationRate)**(duration - 1))
    }
  }
  public addRecuringCosts(recuringCosts: any, duration: number): number {
    let sum = 0
    for (let i=1; i<duration+1; i++) {
      sum += recuringCosts(i)
    }
    return sum
  }
  public purchaseRecuringCosts(duration: number): number {
    if (duration == 0) { return 0 }
    else {
      return ( (this.computedPayment + this.computedInsuranceRate * this.principal) * 12 + (this.computedPropertyCharges + this.computedHousingTax + this.computedPropertyTax + this.computedMaintenance) * (1 + this.computedInflationRate)**(duration - 1))
    }
  }
  public remainingPrincipal(duration: number): number {
    return this.computedPayment * ( 1 - (1 + this.computedMortgageRate)**( duration * 12 - this.computedMortgagoDuration ) ) / this.computedMortgageRate;
  }
  public getHashOfCosts(i: number): object {
    const duration = i;
    return {
      rent: {
        finalSavings: - this.rentFinalSavings(duration),
        initialCosts: this.computedAgencyFees,
        recuringCosts: this.addRecuringCosts(this.rentRecuringCosts, duration)
      },
      purchase: {
        finalSavings: - (this.computedPrice * ((1 + this.computedHomePriceGrowthRate)**(duration - 1)) - this.remainingPrincipal(duration)),
        initialCosts: this.computedGuarantyFees + this.computedNotaryFees,
        recuringCosts: this.addRecuringCosts(this.purchaseRecuringCosts, duration)
      }
    }
  }
  public purchaseIsFavorable(res: any) {
    return res['rent']['finalSavings'] + res['rent']['initialCosts'] + res['rent']['recuringCosts'] >=
      res['purchase']['finalSavings'] + res['purchase']['initialCosts'] + res['purchase']['recuringCosts']
  }

  public handleScroll() {
    if (this.price && this.contribution && this.zipcode) {
      window.scrollTo(0, 1000)
    }
  }
  
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

.landing {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20%;
}
.row-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: auto;
}

.submit {
  margin: 16px 0;
  font-size: 2rem;
  padding: 8px;
  width: 300px;
  background-color: rgb(252, 92, 99);
  border-radius: 8px;
  box-shadow: none;
  border: none;
  color: white;
}

.submit:hover {
  cursor: pointer;
}

.images {
  display: flex;
  justify-content: space-between;
  width: 80%;
}

.images img {
  width: 200px;
  height: 200px;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  text-align: left;
}
li.ui.card {
  width: 800px;
  padding: 5px;
  padding-top: 10px;
  box-shadow: 2px 2px 10px #cacaca;
  font-size: 1rem;
}
h3 {
  text-align: center;
  margin: 0;
  font-size: 1.5rem;
}
div.ui.card {
  width: 900px;
  padding: 5px;
  padding-top: 10px;
  box-shadow: 2px 2px 10px #cacaca;
  font-size: 1rem;
}
div.ui.two.column.centered.grid {
  margin: 0;
  padding: 0;
}
.ui.grid {
  margin: 10px;
}
a {
  color: #0A806B;
}
.home {
  padding-bottom: 30px;
  padding-top: 30px;
}
h6 {
  font-size: 15px;
  font-weight: 100;
  text-align: center;
  margin: 0;
}
h5 {
  font-size: 15px;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 7px;
}
h4 {
  text-align: center;
  font-size: 1.5rem;
  font-weight: normal;
}
.ui.grid>.ui.side.column {
  width: 16%;
  padding-top: 50px;
}
.advanced {
  text-align: center;
  color: #0A806B;
}
</style>
