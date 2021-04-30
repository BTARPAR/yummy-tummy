<template>
  <div class="flex-column justify-around lh-copy">
    <LoadingScreen :load="loading" :message="error"/>
    <div class="flex ds-flex-column justify-around ds-mlt3">
      <InformationBoard
          v-bind:detail-object="restaurantDetail"
          title="Customer Details"
      />

      <div class="pa4 tl br3 ds-center">
        <span class="courier tc f4 fw9">Order No.</span>
        <p class="f3 ma0 tc">#{{ orderNo }}</p>
      </div>

      <InformationBoard
          v-bind:detail-object="customerDetails"
          title="Restaurant Details"
      />
    </div>

    <Table
        v-bind:table-data="items"
        type="detail"
        @callback="loadingScreen"
    />
  </div>
</template>

<script>
import Table from "@/components/Table";
import InformationBoard from "@/components/common/InformationBoard";
import LoadingScreen from "@/components/LoadingScreen";

export default {
  name: 'UpdateOrder',
  components: {
    Table,
    InformationBoard,
    LoadingScreen
  },
  data: function () {
    const commonStructure = {
      address: {
        street: '',
        zipCode: '',
        city: '',
        state: '',
        country: '',
      },
      name: '',
      phone_number: ''
    }
    return {
      loading: false,
      error: '',
      items: {},
      orderNo: '',
      restaurantDetail: {...commonStructure},
      customerDetails: {...commonStructure}
    }
  },
  watch: {
    $route: 'getOrderDetail'
  },
  created() {
    this.getOrderDetail()
  },
  methods: {
    async getOrderDetail() {
      const requestOptions = {
        method: 'GET',
        credentials: 'include'
      };

      const id = this.$route.params.id

      const res = await fetch(`${process.env.URL}/getOrder?id=${id}`, requestOptions);

      switch (res.status) {
        case 401:
          await this.$router.push('/')
          break
        case 200:
          this.items = await res.json()
          this.customerDetails = this.items.customer_info
          this.restaurantDetail = this.items.restaurant_info
          this.orderNo = this.items.order_no
          break
      }
    },
    loadingScreen(result) {
      if (result === 'start') {
        this.loading = true
      } else if (result === 'success') {
        this.error = 'Yay, order update successfully.'
        this.loading = false
      } else if (result === 'deleted') {

        this.error = "DELETED!! We're sorry to see you go!"
        const timer = setTimeout(async () => {
          this.loading = false
          this.error = ''
          await this.$router.push('/dashboard')
          clearTimeout(timer)
        }, 4000)

      } else {
        this.error = 'Something went wrong. Please try again'
        const timer = setTimeout(() => {
          this.loading = false
          this.error = ''
          clearTimeout(timer)
        }, 5000)
      }
    }
  }
}
</script>

<style>

</style>
