<template>
  <div class="flex-column justify-around lh-copy">
    <div class="flex justify-around">
      <div class="ba pa4 tl br3">
        <span class="courier f4 fw9">Restaurant Details</span>
        <div class="flex flex-column tl mt2">
          <span>{{ restaurantDetail.name }}</span>
          <div>
            <span>{{ restaurantDetail.address.street }}, </span>
            <span>{{ restaurantDetail.address.city }}</span>
          </div>
          <div>
            <span>{{ restaurantDetail.address.state }} - </span>
            <span>{{ restaurantDetail.address.zipCode }}</span>
          </div>

          <span>{{ restaurantDetail.phone_number }}</span>
          <span></span>
        </div>
      </div>
      <div class="ba pa4 tl br3">
        <span class="courier f4 fw9">Customer Details</span>
        <div class="flex flex-column tl mt2">
          <span>{{ customerDetails.name }}</span>
          <div>
            <span>{{ customerDetails.address.street }}, </span>
            <span>{{ customerDetails.address.city }}</span>
          </div>
          <div>
            <span>{{ customerDetails.address.state }} - </span>
            <span>{{ customerDetails.address.zipCode }}</span>
          </div>

          <span>{{ restaurantDetail.phone_number }}</span>
          <span></span>
        </div>
      </div>
    </div>

    <Table
        v-bind:table-data="users"
        type="detail"
        v-bind:header-data="headers"
    />
  </div>
</template>

<script>
import Table from "@/components/Table";
import '../styles/updateOrder.scss'

export default {
  name: 'UpdateOrder',
  components: {
    Table
  },
  data: function () {
    return {
      users: {},
      headers: ['quantity', 'item', 'price', 'foodType', 'total'],
      restaurantDetail: {
        address: {
          street: '3186 S Barrington Ave',
          zipCode: '90066',
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA',
        },
        name: 'Panda Express',
        contactInfo: {
          phone_number: 'xxx-xxx-xxxx'
        }
      },
      customerDetails: {
        address: {
          street: '3186 S Barrington Ave',
          apartment: '#D',
          zipCode: '90066',
          state: 'CA',
          country: 'USA',
        },
        name: 'Sunil Panchal',
        contactInfo: {
          phone_number: 'xxx-xxx-xxxx'
        }
      }
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
          break
      }
    }
  }
}
</script>

<style>

</style>
