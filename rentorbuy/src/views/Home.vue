<template>
  <div class="home" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <HelloWorld msg="Welcome to the Rent Or Buy calculator" style="padding: 30px"/>
    <div class="ui three columns grid">
      <div class="ui three wide column">
        <li class="ui card">
          <h3>Paramètres</h3>
          <div class="ui divider"></div>
          <slider-input :value="homePriceGrowthRate * 1000" :min="0" :max="50" right_label="%" label="Croissance du prix du bien" @input="home_price_growth_rate = $event / 10"/>
          <slider-input :value="rentGrowthRate * 1000" :min="0" :max="50" right_label="%" label="Croissance de la location" @input="rent_growth_rate = $event / 10"/>
          <slider-input :value="housingTax" label="Taxe d'habitation" :min="0" :max="3000" right_label="€ / an" @input="housing_tax = $event"/>
          <slider-input :value="savingsReturnRate * 1000" label="Rendement de l'épargne" :min="0" :max="50" right_label="%" @input="savings_return_rate = $event / 10"/>
        </li>
      </div>
      <div class="ui seven wide column">
        <div class="ui centered card">
          <h3>Informations générales</h3>
          <div class="ui divider"></div>
          <div class="ui two column centered grid">
            <div class="column" style="padding: 0; text-align: right">
              <number-input :value="zipcode" label="Code postal" @input="zipcode = $event" right_label="null" />
              <number-input :value="contribution" label="Apport" @input="contribution = $event" />
            </div>
            <div class="column" style="padding: 0; text-align: right">
              <number-input :value="incomes" label="Revenus mensuels nets" @input="incomes = $event" />
              <number-input :value="purchase_surface" label="Surface d'achat" @input="purchase_surface = $event" :placeholder="purchaseSurface" right_label="m2"/>
            </div>
          </div>
        </div>
        <div class="ui two column centered grid" style="margin: 0">
          <div class="column" style="padding-left: 0">
            <li class="ui card">
              <h3>Achat</h3>
              <div class="ui divider"></div>
              <number-input :value="price" label="Prix du bien" @input="price = $event" :placeholder="computedPrice" />
              <number-input :value="payment" label="Mensualité" @input="payment = $event" :placeholder="computedPayment"/>
              <number-input :value="mortgage_rate" label="Taux du prêt" @input="mortgage_rate = $event" :placeholder="mortgageRate * 1200" right_label="%"/>
              <number-input :value="insurance_rate" label="Taux de l'assurance" @input="insurance_rate = $event" :placeholder="insuranceRate * 1200" right_label="%"/>
              <number-input :value="mortgage_duration" label="Durée du prêt" @input="mortgage_duration = $event" :placeholder="mortgageDuration / 12" right_label="ans"/>
              <number-input :value="property_charges" label="Charges de propriété" @input="property_charges = $event" :placeholder="propertyCharges"/>
              <number-input :value="guaranty_fees" label="Frais de garantie" @input="guaranty_fees = $event" :placeholder="guarantyFees"/>
              <number-input :value="notary_fees" label="Frais de notaire" @input="notary_fees = $event" :placeholder="notaryFees"/>
              <number-input :value="property_tax" label="Taxe foncière" @input="property_tax = $event" :placeholder="propertyTax"/>
            </li>
          </div>
          <div class="column" style="padding-right: 0">
            <li class="ui card">
              <h3>Location</h3>
              <div class="ui divider"></div>
              <number-input :value="rent" label="Loyer" @input="rent = $event" :placeholder="computedRent"/>
              <number-input :value="agency_fees" label="Frais d'agence" @input="agency_fees = $event" :placeholder="agencyFees"/>
              <number-input :value="housing_tax" label="Taxe d'habitation" @input="housing_tax = $event" :placeholder="housingTax"/>
              <number-input :value="monthly_savings" label="Epargne mensuelle" @input="monthly_savings = $event" :placeholder="monthlyRentSavings"/>
            </li>
            <li class="ui card">
              <div>Capital : {{ principal }}</div>
              <div>Epargne de location : {{ rentFinalSavings(equilibrium) }}</div>
              <div>Epargne d'achat : {{ - getHashOfCosts(equilibrium - 1)['purchase']['finalSavings'] }}</div>
              <div>CRD : {{ remainingPrincipal(equilibrium) }}</div>
            </li>
          </div>
        </div>
      </div>
      <div class="ui six wide column">
        <div class="ui centered card" style="margin-bottom: 30px">
          <div>
            <h3>Coûts de location : {{ Math.round(rentalCosts) }} €</h3>
          </div>
          <div style="margin-top: 10px">
            <h3>Coûts d'achat : {{ Math.round(purchaseCosts) }} €</h3>
          </div>
          <div style="margin-top: 10px">
            <h3>Equilibre : {{ equilibrium }} ans</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'
import NumberInput from '@/components/NumberInput.vue'
import SliderInput from '@/components/SliderInput.vue'
import HousingTaxes from '@/config/housing_tax.json'
import PropertyCharges from '@/config/property_charges.json'
import PurchasePriceSqm from '@/config/purchase_price_sqm.json'
import RentPriceSqm from '@/config/rent_price_sqm.json'

@Component({
  components: {
    HelloWorld,
    'number-input': NumberInput,
    'slider-input': SliderInput
  }
})
export default class Home extends Vue {

  private HOME_PRICE_GROWTH_RATE = 3
  private INSURANCE_RATE = 0.2
  private MORTGAGE_DURATION = 25
  private MORTGAGE_RATE = 1.5
  private RENT_GROWTH_RATE = 1
  private SAVINGS_RETURN_RATE = 1
  private agency_fees = null
  private contribution = null
  private guaranty_fees = null
  private home_price_growth_rate = null
  private housing_tax = null
  private incomes = null
  private insurance_rate = null
  private monthly_savings = null
  private mortgage_duration = null
  private mortgage_rate = null
  private notary_fees = null
  private payment = null
  private purchase_surface = null
  private price = null
  private property_charges = null
  private property_tax = null
  private rent = null
  private rent_growth_rate = null
  private savings_return_rate = null
  private zipcode = null
  private slidevalue = null
  private backgroundUrl = require("@/assets/background-image.png")

  get agencyFees(): number {
    return this.agency_fees || this.computedRent
  }
  get computedPayment(): number {
    return this.payment || (this.incomes * 0.33)
  }
  get computedPrice(): number {
    return this.price || (this.principal - this.guarantyFees + +this.contribution) / 1.08
  }
  get computedRent(): number {
    return this.rent || RentPriceSqm[this.department] * this.purchaseSurface
  }
  get costs(): Array<object> {
    return [...Array(25).keys()].map(this.getHashOfCosts)
  }
  get department(): string {
    const zip = (this.zipcode && this.zipcode.toString()) || "75"
    return zip.slice(0, 2) == "97" ? zip.slice(0, 3) : zip.slice(0, 2)
  }
  get equilibrium(): number {
    return this.costs.findIndex(this.rentIsFavorable) + 1
  }
  get guarantyFees(): number {
    return this.guaranty_fees || 0.01 * this.principal
  }
  get homePriceGrowthRate() {
    return (this.home_price_growth_rate && +this.home_price_growth_rate / 100) || this.HOME_PRICE_GROWTH_RATE / 100
  }
  get housingTax(): number {
    console.log("tax", HousingTaxes[this.department])
    console.log("surface", this.purchaseSurface)
    console.log(this.housing_tax)
    return this.housing_tax || ( HousingTaxes[this.department] * this.purchaseSurface )
  }
  get insuranceRate(): number {
    return (this.insurance_rate && (+this.insurance_rate / 1200)) || this.INSURANCE_RATE / 1200
  }
  get monthlyRentSavings(): number {
    return this.monthly_savings || this.computedPayment - this.computedRent
  }
  get mortgageDuration(): number {
    return (this.mortgage_duration && (+this.mortgage_duration * 12)) || this.MORTGAGE_DURATION * 12
  }
  get mortgageRate(): number {
    return (this.mortgage_rate && (+this.mortgage_rate / 1200)) || this.MORTGAGE_RATE / 1200
  }
  get notaryFees(): number {
    return this.notary_fees || 0.08 * this.computedPrice
  }
  get principal(): number {
    return (this.computedPayment * ( 1 - ( 1 + this.mortgageRate ) ** ( - this.mortgageDuration) )) / this.mortgageRate
  }
  get propertyCharges(): number {
    return this.property_charges || PropertyCharges[this.department] || PropertyCharges["00"]
  }
  get propertyTax(): number {
    return this.property_tax || ( RentPriceSqm[this.department] * this.purchaseSurface / 2 )
  }
  get purchaseCosts(): number {
    return this.costs[this.equilibrium]['purchase']['initialCosts'] + this.costs[this.equilibrium]['purchase']['recuringCosts']
  }
  get purchaseSurface(): number {
    if (this.purchase_surface) {
      return this.purchase_surface
    }
    else if (this.rent) {
      return this.rent / RentPriceSqm[this.department]
    }
    else { 
      return +this.computedPrice / PurchasePriceSqm[this.department]
    }
  }
  get rentalCosts(): number {
    return this.costs[this.equilibrium]['rent']['initialCosts'] + this.costs[this.equilibrium]['rent']['recuringCosts']
  }
  get rentGrowthRate(): number {
    return (this.rent_growth_rate && +this.rent_growth_rate / 100) || this.RENT_GROWTH_RATE / 100
  }
  get savingsReturnRate(): number {
    return (this.savings_return_rate && +this.savings_return_rate / 100) || this.SAVINGS_RETURN_RATE / 100
  }

  public rentFinalSavings(duration): number {
    const returnRate = this.savingsReturnRate
    const contribution = this.contribution
    const yearlySavings = this.monthlyRentSavings * 12
    const investmentGain = yearlySavings * returnRate * ( (1 + returnRate)**(duration) - 1 ) / returnRate
    return contribution * ( (1 + returnRate) ** duration ) + investmentGain
  }
  public remainingPrincipal(duration): number {
    return this.computedPayment * ( 1 - (1 + this.mortgageRate)**( duration * 12 - this.mortgageDuration ) ) / this.mortgageRate
  }
  public getHashOfCosts(i): object {
    const duration = i + 1;
    return {
      rent: {
        finalSavings: - this.rentFinalSavings(duration),
        initialCosts: this.agencyFees,
        recuringCosts: (12 * this.computedRent + this.housingTax) * duration
      },
      purchase: {
        finalSavings: - (this.computedPrice * ((1 + this.homePriceGrowthRate)**(duration - 1)) - this.remainingPrincipal(duration)),
        initialCosts: this.guarantyFees + this.notaryFees,
        recuringCosts: ( (this.computedPayment + this.insuranceRate * this.principal) * 12 + this.propertyCharges + this.housingTax + this.propertyTax) * duration
      }
    }
  }
  public rentIsFavorable(res) {
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
  text-align: right;
}
li.ui.card {
  width: 800px;
  padding: 5px;
  padding-top: 10px;
  box-shadow: 2px 2px 10px #505050;
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
  box-shadow: 2px 2px 10px #505050;
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
</style>
