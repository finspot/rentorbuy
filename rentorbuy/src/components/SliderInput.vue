<template>
  <div style="margin: 10px">
    <h6>{{label}}</h6>
    <h5>{{displayedValue}} {{right_label}}</h5>
    <vue-slide-bar
      v-model="value"
      :processStyle="{ backgroundColor: '#42b983' }"
      :lineHeight="10"
      :min="min"
      :max="max"
      style="margin-right: 10px; margin-left: 10px; margin-bottom: 10px; padding-top: 0">
      <template slot="tooltip">
        <img style="margin: 14px" src="@/assets/rond.png">
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
  @Prop() private right_label!: string
  @Watch('value')
  valueChanged() {
    this.$emit('input', this.value)
  }

  get displayedValue(): number {
    if (this.right_label == "%") {
      return +this.value / 10
    }
    else {
      return this.value
    }
  }
}

</script>