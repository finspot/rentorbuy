<template>
  <div class="home">
    <!-- Comment <HelloWorld
      msg="Welcome to the Rent Or Buy calculator"
      style="padding: 30px"
    /> -->
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
            label="Apport"
            @input="contribution = $event"
          />
          <div class="advanced" style="cursor: pointer" @click="showAdvanced = !showAdvanced">
            Paramètres avancés
            <i :class="showAdvanced ? 'angle down icon' : 'angle right icon'" style="color: #42b983"></i>
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
          <number-input
            v-if="showAdvanced"
            :value="monthlySavings"
            label="Epargne mensuelle"
            @input="monthlySavings = $event"
            :placeholder="computedMonthlySavings"
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
            label="Croissance du prix du bien"
            @input="homePriceGrowthRate = $event / 10"
          />
          <slider-input
            :value="computedRentGrowthRate * 1000"
            :min="0"
            :max="50"
            rightLabel="%"
            label="Croissance de la location"
            @input="rentGrowthRate = $event / 10"
          />
          <slider-input
            :value="computedSavingsReturnRate * 1000"
            label="Rendement de l'épargne"
            :min="0"
            :max="50"
            rightLabel="%"
            @input="savingsReturnRate = $event / 10"
          />
          <slider-input
            :value="computedPropertyTaxRate * 1000"
            label="Taux de taxe foncière"
            :min="0"
            :max="500"
            rightLabel="%"
            @input="propertyTaxRate = $event / 10"
          />
          <slider-input
            :value="computedMortgageRate * 12000"
            label="Taux du prêt"
            :min="0"
            :max="50"
            rightLabel="%"
            @input="mortgageRate = $event / 10"
          />
        </li>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
  private incomes: any = null;
  private insuranceRate: any = null;
  private monthlySavings: any = null;
  private mortgageDuration: any = null;
  private mortgageRate: any = null;
  private notaryFees: any = null;
  private purchaseSurface: any = null;
  private price: any = null;
  private propertyCharges: any = null;
  private propertyTax: any = null;
  private propertyTaxRate: any = null;
  private rent: any = null;
  private rentGrowthRate: any = null;
  private savingsReturnRate: any = null;
  private zipcode: any = null;
  private showing: any = 'general';
  private slidevalue: any = null;
  private backgroundUrl = require("@/assets/background-image.png");
  private showAdvanced = false;

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
  get computedMonthlySavings(): number {
    return +this.monthlySavings || this.payment - this.computedRent
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
      return (this.principal * 0.99 + +this.contribution) / (1.08 * this.getHashOf(PurchasePriceSqm)[this.department])
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
    return this.costs.findIndex(this.purchaseIsFavorable) + 1
  }
  get labels(): Array<number> {
    return [...Array(25).keys()]
  }
  get principal(): number {
    if (this.purchaseSurface || this.price) {
      return (this.computedPrice * 1.08 - +this.contribution) / 0.99
    }
    else {
      return (this.payment * ( 1 - ( 1 + this.computedMortgageRate ) ** ( - this.computedMortgagoDuration) )) / this.computedMortgageRate
    }
  }
  get payment() {
    if (this.purchaseSurface || this.price) {
      return this.principal * this.computedMortgageRate / ( 1 - ( 1 + this.computedMortgageRate ) ** ( - this.computedMortgagoDuration) )
    }
    else {
      return (+this.incomes * 0.33)
    }
  }
  get purchaseCosts(): number {
    return this.getHashOf(this.costs)[this.equilibrium]['purchase']['initialCosts'] + this.getHashOf(this.costs)[this.equilibrium]['purchase']['recuringCosts']
  }
  get purchaseCostsArray(): Array<number> {
    return [...Array(25).keys()].map(i => this.getHashOf(this.getHashOfCosts(i))['purchase']['initialCosts'] + this.getHashOf(this.getHashOfCosts(i))['purchase']['recuringCosts'] + this.getHashOf(this.getHashOfCosts(i))['purchase']['finalSavings'])
  }
  get rentalCosts(): number {
    return this.getHashOf(this.costs)[this.equilibrium]['rent']['initialCosts'] + this.getHashOf(this.costs)[this.equilibrium]['rent']['recuringCosts']
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
  public rentFinalSavings(duration: number): number {
    const returnRate = this.computedSavingsReturnRate;
    const contribution = this.contribution;
    const yearlySavings = this.computedMonthlySavings * 12;
    const investmentGain = yearlySavings * returnRate * ( (1 + returnRate) ** duration - 1 ) /
      returnRate;
    return contribution * ( (1 + returnRate) ** duration ) + investmentGain
  }
  public remainingPrincipal(duration: number): number {
    return this.payment * ( 1 - (1 + this.computedMortgageRate)**( duration * 12 - this.computedMortgagoDuration ) ) / this.computedMortgageRate;
  }
  public getHashOfCosts(i: number): object {
    const duration = i + 1;
    return {
      rent: {
        finalSavings: - this.rentFinalSavings(duration),
        initialCosts: this.computedAgencyFees,
        recuringCosts: (12 * this.computedRent * ((1 + this.computedRentGrowthRate)**(duration - 1)) + this.computedHousingTax) * duration
      },
      purchase: {
        finalSavings: - (this.computedPrice * ((1 + this.computedHomePriceGrowthRate)**(duration - 1)) - this.remainingPrincipal(duration)),
        initialCosts: this.computedGuarantyFees + this.computedNotaryFees,
        recuringCosts: ( (this.payment + this.computedInsuranceRate * this.principal) * 12 + this.computedPropertyCharges + this.computedHousingTax + this.computedPropertyTax) * duration
      }
    }
  }
  public purchaseIsFavorable(res: any) {
    return res['rent']['finalSavings'] + res['rent']['initialCosts'] + res['rent']['recuringCosts'] >=
      res['purchase']['finalSavings'] + res['purchase']['initialCosts'] + res['purchase']['recuringCosts']
  }
}
</script>

<style>
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
  color: #42b983;
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
  color: #42b983;
}
</style>
