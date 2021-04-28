<template>
  <div class="flex-column justify-around lh-copy">
    <div class="flex justify-around">
      <InformationBoard
          v-bind:detail-object="restaurantDetail"
          title="Customer Details"
      />

      <div class="pa4 tl br3">
        <span class="courier tc f4 fw9">Order No.</span>
        <p class="f3 ma0 tc">#{{ orderNo }}</p>
      </div>

      <InformationBoard
          v-bind:detail-object="customerDetails"
          title="Customer Details"
      />
    </div>

    <Table
        v-bind:table-data="users"
        type="detail"
    />
  </div>
</template>

<script>
import Table from "@/components/Table";
import InformationBoard from "@/components/common/InformationBoard";

export default {
  name: 'UpdateOrder',
  components: {
    Table,
    InformationBoard
  },
  data: function () {
    return {
      users: {},
      orderNo: '',
      restaurantDetail: {},
      customerDetails: {}
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

      const res = await fetch(`http://localhost:4000/getOrder?id=${id}`, requestOptions);

      switch (res.status) {
        case 401:
          await this.$router.push('/')
          break
        case 200:
          this.users = await res.json()
          this.customerDetails = this.users.customer_info
          this.restaurantDetail = this.users.restaurant_info
          this.orderNo = this.users.order_no
          break
      }
    }
  }
}
</script>

<style>

</style>
