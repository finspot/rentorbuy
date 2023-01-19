<template>
  <div class="home">
    <div class="landing">
      <h1 style="font-size: 5rem">Acheter ou louer en 2023 ?</h1>
      <h2>Choisissez votre camp entre la cigale ou la fourmi</h2>
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
          :value="rent"
          label="Loyer visé"
          @input="rent = $event"
          :placeholder="computedRent"
        />
      </div>
      <button class="submit" v-on:click="handleScroll">Voir le résultat</button>
      <div class="images">
        <img src="@/assets/cicada.png" />
        <p class="poem">
          La cigale, joyeuse et insouciante,<br/>
          Voulait un bel appartement pour vivre à son aise.<br/>
          Elle se dit : "Pourquoi payer un loyer chaque mois,<br/>
          Si je peux acheter et économiser à long terme ?"
          <br/><br/>

          La fourmi, sage et prévoyante,<br/>
          Lui dit : "Avant de prendre une telle décision,<br/>
          Pense à ta situation financière,<br/>
          Et à ta volonté de rester dans cette région."
          <br/><br/>
          La cigale réfléchit et se dit :<br/>
          "Si je dois rester des années ici,<br/>
          L'achat sera peut-être plus avantageux,<br/>
          Mais il faut que je puisse rembourser un prêt."
          <br/><br/>
          La fourmi lui dit : "Rappelle-toi aussi,<br/>
          Que tu seras responsable des réparations,<br/>
          Et de l'entretien de cet appartement,<br/>
          Si tu décides de devenir propriétaire."
          <br/><br/>
          La cigale réfléchit encore,<br/>
          Et finit par comprendre,<br/>
          Qu'il faut être raisonnable,<br/>
          Et bien réfléchir avant de prendre une telle décision.
          <br/><br/>
        </p>
        <img src="@/assets/ant.png" />
      </div>
    </div>
    <div class="ui three columns centered grid">
      <div>
        <h2>
          Dans le scénario achat, vous êtes rentable au bout de {{ formatNumber(equilibrium) }} ans
        </h2>
        <table>
          <thead>
            <th></th>
            <th>Location</th>
            <th>Achat</th>
          </thead>
          <tbody>
            <tr> <td>Total dépensé</td>
              <td>{{ formatNumber(computedFinalArray[equilibrium*12].rent.totalCosts) }}€</td>
              <td>{{ formatNumber(computedFinalArray[equilibrium*12].buy.totalCosts) }}€</td>
            </tr>
            <tr>
              <td>Capital total</td>
              <td>{{ formatNumber(computedFinalArray[equilibrium*12].rent.capital + computedFinalArray[equilibrium*12].rent.cashFlowCapital) }}€</td>
              <td>{{ formatNumber(computedFinalArray[equilibrium*12].buy.capital) }}€</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="ui three columns centered grid">
      <div class="ui side column">
        <li class="ui card">
          <h3>Données</h3>
          <div class="ui divider"></div>
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
            :value="rent"
            label="Loyer visé"
            @input="rent = $event"
            :placeholder="computedRent"
          />
          <number-input
            :value="mortgageDuration"
            label="Durée du prêt"
            @input="mortgageDuration = $event"
            :placeholder="computedMortgagoDuration / 12"
            rightLabel="ans"
          />
          <number-input
            :value="insuranceRate"
            label="Taux de l'assurance"
            @input="insuranceRate = $event"
            :placeholder="computedInsuranceRate * 1200"
            rightLabel="%"
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
      <div class="ui six wide column">
        <div class="ui centered" style="margin-bottom: 30px">
          <div style="margin: 10px">
            <h4><strong>Capital généré dans les deux scénarios</strong></h4>
          </div>
        </div>
        <chart :purchaseCapital="purchaseCapitalArray" :rentalCapital="rentalCapitalArray" :labels="labels" />
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
        </li>
      </div>
    </div>
    <div class="ui three columns centered grid">
      <h1>Vous vous sentez plutôt :</h1>
      <div class="choose">
        <button v-on:click="toggleChoice('ant')" :style="{ backgroundColor: choice === 'ant' ? '#0A806B' : 'white' }">FOURMI</button>
        <button v-on:click="toggleChoice('cicada')" :style="{ backgroundColor: choice !== 'ant' ? 'rgb(252, 92, 99)' : 'white' }">CIGALE</button>
      </div>
      <div class="ant" :style="{ display: choice === 'ant' ? 'block' : 'none' }">
        <img src="@/assets/antResult.png" class="img-result" />
        <p>
          Vous avez pris l’habitude de surveiller vos dépenses et n’avez pas peur de travailler dur ? Vous êtes habitués à vous serrer la ceinture, à épargner chaque centime. Aucun doute, <strong>vous êtes une fourmi.</strong>
        </p>
        <p>
          Le choix est évident  pour vous : pour éviter de jeter de l’argent par les fenêtres, achetez !
        </p>
        <button class="contact">Contacter un expert Pretto</button>
      </div>
      <div class="cicada" :style="{ display: choice !== 'ant' ? 'block' : 'none' }">
        <img src="@/assets/cicadaResult.png" class="img-result" />
        <p>
          Vous êtes un bon vivant et vous dépensez sans compter quand il s’agit de faire plaisir ? Si les idées de réduire votre confort de vie et devoir vous limiter dans vos sorties ne vous enchantent pas, <strong>vous êtes une cigale.</strong>
        </p>
        <p>
          Pas de panique ! Pour continuer à maintenir ce train de vie, tout en commençant à vous mettre à l’abri, optez pour <strong>la location et un investissement locatif</strong> plutôt qu’acheter. 
        </p>
        <button class="contact">Contacter un expert Pretto</button>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NumberInput from "@/components/NumberInput.vue";
import SliderInput from "@/components/SliderInput.vue";
import Chart from "@/components/Chart.vue";
import HousingTaxes from "@/config/housing_tax.json";
import PropertyCharges from "@/config/property_charges.json";
import PropertyTaxes from "@/config/property_tax.json";
import PurchasePriceSqm from "@/config/purchase_price_sqm.json";
import RentPriceSqm from "@/config/rent_price_sqm.json";
import { finalArray } from "@/lib/helpers.ts";

@Component({
  components: {
    'number-input': NumberInput,
    'slider-input': SliderInput,
    chart: Chart
  }
})
export default class Home extends Vue {

  private HOME_PRICE_GROWTH_RATE = 1;
  private INFLATION_RATE = 2;
  private INSURANCE_RATE = 0.2;
  private MORTGAGE_DURATION = 25;
  private MORTGAGE_RATE = 3.5;
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
  public choice: any = 'fourmi'


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
  get department(): string {
    const zip = (this.zipcode && this.zipcode.toString()) || "75"
    return zip.slice(0, 2) == "97" ? zip.slice(0, 3) : zip.slice(0, 2)
  }
  get equilibrium(): number {
    let i = 0;
    while(i < 25) {
      if(this.purchaseCapitalArray[i] > this.rentalCapitalArray[i]) return i;
      i++
    }
    return i;
  }
  get labels(): Array<number> {
    return [...Array(26).keys()]
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
  get computedFinalArray(): Array<any> {
    return finalArray(this.MORTGAGE_DURATION, this.price, this.contribution, this.computedRent, this.computedMortgageRate, this.computedInsuranceRate, this.computedHomePriceGrowthRate)
  }
  get purchaseCapitalArray(): Array<number> {
    return [...Array(26).keys()].map(i => this.computedFinalArray[i*12].buy.capital)
  }
  get rentalCapitalArray(): Array<number> {
    return [...Array(26).keys()].map(i => +this.computedFinalArray[i*12].rent.capital + this.computedFinalArray[i*12]?.rent.cashFlowCapital)
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
  public handleScroll() {
    if (this.price && this.contribution && this.rent) {
      window.scrollTo(0, 1050)
    }
  }

  public toggleChoice(choice: any) {
    this.choice = choice
  }
  
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

.landing {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20%;
}
.row-inputs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  margin: 24px 0;
}

.row-inputs > div {
  max-width: 360px;
}

.submit {
  margin: 16px 0;
  font-size: 2rem;
  padding: 24px;
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
  align-items: center;
  margin-top: 64px;
}

.poem {
  font-size: 1.1rem;
  font-style: italic;
  text-align: left;
}

.images img {
  width: 300px;
  height: 300px;
}

table {
  width: 600px;
  font-size: 1.5rem;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 4px 0;
}

.good-news {
  padding: 32px;
  border: 1px solid grey;
}

.contact {
  margin: 128px;
  min-width: 300px;
  min-height: 60px;
  font-family: 'Nunito', sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  font-weight: 700;
  color: white;
  background-color:   ;
background: linear-gradient(90deg, rgba(129,230,217,1) 0%, rgba(79,209,197,1) 100%);
  border: none;
  border-radius: 1000px;
  box-shadow: 12px 12px 24px rgba(79,209,197,.64);
  transition: all 0.3s ease-in-out 0s;
  cursor: pointer;
  outline: none;
  position: relative;
  padding: 24px;
  }

.contact::before {
content: '';
  border-radius: 1000px;
  min-width: calc(300px + 12px);
  min-height: calc(60px + 12px);
  border: 6px solid #00FFCB;
  box-shadow: 0 0 60px rgba(0,255,203,.64);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all .3s ease-in-out 0s;
}

.contact::after {
  content: '';
  width: 30px; height: 30px;
  border-radius: 100%;
  border: 6px solid #00FFCB;
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ring 1.5s infinite;
}

@keyframes ring {
  0% {
    width: 30px;
    height: 30px;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}


.choose {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}


.choose button {
  width: 300px;
  padding: 24px;
  font-size: 2rem;
  border: 1px solid grey;
}

.choose button:hover {
  cursor: pointer;
}

.choose button + button {
  margin-left: 16px;
}

.img-result {
  width: 300px;
  height: auto;
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
