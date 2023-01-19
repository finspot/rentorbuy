<template>
  <div style="margin: 10px">
    <h6>{{label}}<img class="info" src="@/assets/info-bubble.png" v-on:click="openInfo(id)"/>
    </h6>
    <h5>{{displayedValue.toFixed(2)}} {{rightLabel}}</h5>
    <vue-slide-bar
      v-model="value"
      :processStyle="{ backgroundColor: '#0A806B' }"
      :lineHeight="5"
      :min="min"
      :max="max"
      style="margin: 10px; padding-top: 0">
      <template slot="tooltip">
        <img style="margin: 12px 0 0 0" src="@/assets/rond.png">
      </template>
    </vue-slide-bar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import VueSlideBar from 'vue-slide-bar'

@Component({
  components: {
    'vue-slide-bar': VueSlideBar
  }
})

export default class HelloWorld extends Vue {
  @Prop() private label!: string
  @Prop() private value!: number
  @Prop() private max!: number
  @Prop() private min!: number
  @Prop() private rightLabel!: string
  @Prop() private id!: string
  @Watch('value')
  valueChanged() {
    this.$emit('input', this.value)
  }

  openInfo(id: string) {
    console.log(id)
  }

  get displayedValue(): number {
    if (this.rightLabel == "%") {
      return +this.value / 10
    }
    else {
      return this.value
    }
  }
}

</script>

<style>
  .info {
    display: inline;
    height: 24px;
    width: 24px;
    margin: 0;
    margin-left: 4px;
    vertical-align: bottom;
  }

  .info:hover {
    cursor: pointer;
  }
</style>