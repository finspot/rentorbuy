<template>
  <div style="margin: 10px">
    <label>{{ label ? (label + ' : ') : '' }}</label>
    <div :class="rightLabel ? 'ui right labeled input' : 'ui input'" :style="inputStyle">
      <input v-model="value" :placeholder="inputPlaceholder"/>
      <div v-if="rightLabel" class="ui basic label" style="width: 40px; text-align: center">{{rightLabel}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class HelloWorld extends Vue {
  @Prop() private label!: string
  @Prop() private value!: unknown
  @Prop() private placeholder!: number
  @Prop() private right_label!: string
  @Watch('value')
  valueChanged() {
    this.$emit('input', this.value)
  }

  get rightLabel(): string {
    if (!this.right_label) {
      return "€"
    }
    else if (this.right_label == "null") {
      return null
    }
    else {
      return this.right_label
    }
  }
  get inputStyle(): string {
    if (!this.rightLabel) {
      return "width: 190px; margin-right: 20px; margin-left: 20px"
    }
    else {
      return "width: 150px; margin-right: 60px; margin-left: 20px"
    }
  }
  get inputPlaceholder(): string {
    if (this.rightLabel == "%") {
      return this.placeholder.toFixed(2)
    }
    else if (!this.placeholder) {
      return "Entrer une valeur..."
    }
    else {
      return this.placeholder.toFixed()
    }
  }
}
</script>