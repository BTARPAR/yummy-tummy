<template>
  <div class="br3 pa2 mr2-l ml2-l mb4 w-60-m w-30-ns bg-white grow ba">
    <div class="flex items-center tc">
      <div class="w4 w3-s pa-3-s ml4 ml-s pa4 bg-lightest-blue br-100">
        <font-awesome-icon v-bind:icon="icon" size="3x" class="tc white icon-s"/>
      </div>
      <div class="flex flex-column justify-center w-50-m w-60">
        <h4 class="f3" v-if="label === 'Revenue'">$ {{Number(count).toFixed(2)}}</h4>
        <h4 class="f3" v-else>{{count}}</h4>
        <div class="f3">{{label}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistics',
  props: ['label','count', 'icon']
}
</script>