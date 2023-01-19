<template>
  <div class="small">
    <line-chart :chart-data="datacollection" :options="options"></line-chart>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  export default {
    props: ['purchaseCapital', 'rentalCapital', 'labels'],
    components: {
      LineChart
    },
    computed: {
      datacollection() {
        return {
          labels: this.labels,
          datasets: [
            {
              label: "Scénario achat",
              borderColor: '#0A806B',
              data: this.purchaseCapital
            }, {
              label: "Scénario location",
              borderColor: 'rgb(252, 92, 99)',
              data: this.rentalCapital
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
