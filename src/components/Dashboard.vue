<template>
  <div>
    <div class="flex items-center ma4 mb5">
      <h1 class="courier tl f1 tc-m tc-s">Dashboard</h1>
      <input type="text" class="ml5 w-20 pa2" v-model="search" @keyup="find" placeholder="Search by order number"/>
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
    <Table v-bind:table-data="users"/>
  </div>
</template>

<script>
import debounce from 'debounce';
import Table from "@/components/Table";
import Statistics from "@/components/common/Statistics";

export default {
  name: 'Dashboard',
  components: {
    Table,
    Statistics
  },
  created() {
    this.getOrders();
    this.getStatistics()
  },
  data: function () {
    return {
      users: [],
      search: '',
      statistics: {}
    }
  },
  methods: {
    debouceCallback: debounce(function (value) {
      this.findOrder(value)
    }, 1000),
    async find() {
      const value = Number(this.search)
      this.debouceCallback(value)
    },
    async findOrder(value) {
      const requestOptions = {
        method: 'GET',
        credentials: 'include'
      };

      if (!value) {
        await this.getOrders()
      } else {
        const res = await fetch(`${process.env.URL}/search?id=${value}`, requestOptions);

        switch (res.status) {
          case 401:
            await this.$router.push('/')
            break
          case 200:
            this.users = await res.json()
            break
        }
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
          this.users = await res.json()
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
