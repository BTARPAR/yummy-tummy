<template>
  <div>
    <div class="flex items-center ma4 mb5">
      <h1 class="courier tl f1 tc-m tc-s">Dashboard</h1>
      <input type="text" class="ml5 w-20 pa2" v-model="search" @keyup="find" placeholder="Search by order number"/>
    </div>
    <div class="flex flex-wrap justify-around">
      <div class="br3 pa2 mr2-l ml2-l mb4 w-60-m w-30-ns bg-white grow">
        <div class="flex items-center tc">
          <div class="w4 w3-s ml4 ml-s pa4 bg-lightest-blue br-100 pa-3-s">
            <font-awesome-icon icon="shopping-basket" size="3x" class="tc white icon-s"/>
          </div>

          <div class="flex flex-column justify-center w-50-m w-60">
            <h4 class="f3">8,282</h4>
            <div class="f3">New Users</div>
          </div>
        </div>
      </div>

      <div class="br3 pa2 mr2-l ml2-l mb4 w-60-m w-30-ns bg-white grow">
        <div class="flex items-center tc">
          <div class="w4 w3-s pa-3-s ml4 ml-s pa4 bg-lightest-blue br-100">
            <font-awesome-icon icon="utensils" size="3x" class="tc white icon-s"/>
          </div>

          <div class="flex flex-column justify-center w-50-m w-60">
            <h4 class="f3">200,521</h4>
            <div class="f3">Total Orders</div>
          </div>
        </div>
      </div>

      <div class="br3 pa2 mr2-l ml2-l mb4 w-60-m w-30-ns bg-white grow">
        <div class="flex items-center tc">
          <div class="w4 w3-s pa-3-s ml4 ml-s pa4 bg-lightest-blue br-100">
            <font-awesome-icon icon="dollar-sign" size="3x" class="tc white icon-s"/>
          </div>
          <div class="flex flex-column justify-center w-50-m w-60">
            <h4 class="f3">215,542</h4>
            <div class="f3">Available Products</div>
          </div>
        </div>
      </div>
    </div>
    <Table v-bind:table-data="users"/>
  </div>
</template>

<script>
import debounce from 'debounce';
import Table from "@/components/Table";

export default {
  name: 'Dashboard',
  components: {
    Table
  },
  created() {
    console.log('got executed')
    this.getOrders();
  },
  data: function () {
    return {
      users: [],
      search: ''
    }
  },
  methods: {
    debouceCallback: debounce(function (value) {
      this.findOrder(value)
    }, 2000),
    async find() {
      const value = Number(this.search)
      this.debouceCallback(value)
    },
    async findOrder(value) {
      const requestOptions = {
        method: 'GET',
        credentials: 'include'
      };

      const res = await fetch(`http://localhost:4000/search?id=${value}`, requestOptions);

      switch (res.status) {
        case 401:
          await this.$router.push('/')
          break
        case 200:
          this.users = await res.json()
          break
      }
    },
    async getOrders() {
      const requestOptions = {
        method: 'GET',
        credentials: 'include'
      };

      const res = await fetch('http://localhost:4000/getOrders', requestOptions);

      switch (res.status) {
        case 401:
          await this.$router.push('/')
          break
        case 200:
          this.users = await res.json()
          break
      }
    },
  }
}
</script>
