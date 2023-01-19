<template>
  <div>
    <div style="margin-bottom: 5px">
      <label>{{ label }}</label>
    </div>
    <div :class="computedRightLabel ? 'ui right labeled input' : 'ui input'" :style="inputStyle">
      <input v-model="value" :placeholder="inputPlaceholder"/>
      <div v-if="computedRightLabel" class="ui basic label" style="width: 30%; text-align: center">{{computedRightLabel}}</div>
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
  @Prop() private rightLabel!: string
  @Watch('value')
  valueChanged() {
    this.$emit('input', this.value)
  }

  get computedRightLabel(): any {
    if (!this.rightLabel) {
      return "€"
    }
    else if (this.rightLabel == "null") {
      return null
    }
    else {
      return this.rightLabel
    }
  }
  get inputStyle(): string {
    if (!this.computedRightLabel) {
      return "width: 100%"
    }
    else {
      return "width: 80%"
    }
  }
  get inputPlaceholder(): string {
    if (this.computedRightLabel == "%") {
      return this.placeholder.toFixed(2)
    }
    else if (!this.placeholder) {
      return ". . ."
    }
    else {
      return this.placeholder.toFixed()
    }
  }
}
</script>

<style>

.ui.input input::placeholder {
  color: rgb(133, 133, 133);
}

</style>