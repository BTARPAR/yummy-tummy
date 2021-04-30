<template>
  <div class="bg-black-50 dt fixed pa0 ma0 top-0 left-0 w-100 h-100 z-1" v-if="load">
    <div class="dtc v-mid tc white ph3 ph4-l">
      <font-awesome-icon icon="spinner" spin size="5x" class="icon-s white" v-if="message === ''"/>
      <p v-else class="f2 tc">{{message}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoadingScreen',
  props:['load', 'message']
}
</script>