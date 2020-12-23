<template>
  <div class="small">
    <line-chart :chart-data="datacollection" :options="options"></line-chart>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    props: ['purchaseCosts', 'rentalCosts', 'labels'],
    components: {
      LineChart
    },
    computed: {
      datacollection() {
        return {
          labels: this.labels,
          datasets: [
            {
              label: "Coûts d'achat",
              borderColor: '#88d6b3',
              data: this.purchaseCosts
            }, {
              label: "Coûts de location",
              borderColor: '#bfe9ec',
              data: this.rentalCosts
            }
          ]
        }
      },
      options() {
          return {responsive: true}
      }
    }
  }
</script>