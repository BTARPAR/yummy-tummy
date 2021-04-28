<template>
  <div class="ba pa4 tl br3">
    <span class="courier f4 fw9">{{ title }}</span>
    <div class="flex flex-column tl mt2">
      <span>{{ detailObject.name }}</span>
      <div>
        <span>{{ detailObject.address.street }}, </span>
        <span>{{ detailObject.address.city }}</span>
      </div>
      <div>
        <span>{{ detailObject.address.state }} - </span>
        <span>{{ detailObject.address.zipCode }}</span>
      </div>

      <span>+1{{ detailObject.phone_number }}</span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InformationBoard',
  props: ['title','detailObject']
}
</script>