<template>
  <div>
    <LoadingScreen :load="loading" :message="error"/>
    <div class="flex ds-flex-column items-center ma4 mb5 ds-flex-column">
      <h1 class="courier tl f1 tc-m tc-s">Dashboard</h1>
      <input type="text" class="ml5 w-20 pa2 ds-w-100 ds-ml" v-model="search" @keyup="find"
             placeholder="Search by order number" :disabled="loading"/>
    </div>
    <div class="flex flex-wrap justify-around">
      <Statistics label="Total Users"
                  icon="shopping-basket"
                  v-bind:count="statistics.users"/>
      <Statistics label="Total Orders"
                  icon="utensils"
                  v-bind:count="statistics.orders"/>
      <Statistics label="Revenue"
                  icon="dollar-sign"
                  v-bind:count="statistics.revenue"/>
    </div>
    <Table v-bind:table-data="orders"/>
  </div>
</template>

<script>
import debounce from 'debounce';
import Table from "@/components/Table";
import Statistics from "@/components/common/Statistics";
import LoadingScreen from "@/components/LoadingScreen";

export default {
  name: 'Dashboard',
  components: {
    Table,
    Statistics,
    LoadingScreen
  },
  created() {
    this.getOrders();
    this.getStatistics()
  },
  data: function () {
    return {
      orders: [],
      search: '',
      statistics: {},
      loading: false,
      timer: '',
      error: ''
    }
  },
  methods: {
    debounceCallback: debounce(function (value) {
      this.findOrder(value)
    }, 750),
    async find() {
      const value = Number(this.search)
      this.debounceCallback(value)
    },
    async findOrder(value) {
      if (this.timer !== '') clearTimeout(this.timer)
      const requestOptions = {
        method: 'GET',
        credentials: 'include'
      };
      this.loading = true
      if (!value) {
        await this.getOrders()
      } else {
        const res = await fetch(`${process.env.URL}/search?id=${value}`, requestOptions);

        switch (res.status) {
          case 401:
            await this.$router.push('/')
            break
          case 200:
            this.orders = await res.json()
            break
        }
        const displayError = setTimeout(()=>{
          this.error = `Not able to find order no. ${this.search}. Please check your order number`
          this.timer = setTimeout(() => {
            this.loading = false
            this.getOrders()
            this.search = ''
            clearTimeout(displayError)
          }, 5000)
        }, 2000)

      }
    },
    async getOrders() {
      const requestOptions = {
        method: 'GET',
        credentials: 'include'
      };

      const res = await fetch(`${process.env.URL}/getOrders`, requestOptions);

      switch (res.status) {
        case 401:
          await this.$router.push('/')
          break
        case 200:
          this.orders = await res.json()
          break
      }
    },
    async getStatistics() {
      const requestOptions = {
        method: 'GET',
        credentials: 'include'
      };

      const res = await fetch(`${process.env.URL}/statistics`, requestOptions);

      switch (res.status) {
        case 401:
          await this.$router.push('/')
          break
        case 200:
          this.statistics = await res.json()
          break
      }
    },
  }
}
</script>
