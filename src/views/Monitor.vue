<template>
  <v-container class="pa-0" fluid >
  <v-layout class="ma-0 pa-0" style="height: 89vh">
    
    <v-flex xs6 sm6 md6 >
      <v-card class="mr-5 ml-10 pa-10"> 
        <v-card-title class="mt-10 mb-5 ml-5 pa-0">
        登山意願監測
        </v-card-title>
        <line-chart :Grade="'pandemic'" :Tab="3"/>
      </v-card>
    </v-flex>

    <v-flex xs6 sm6 md6>
      <v-card class="ml-5 mr-10 pa-10">
        <v-card-title class="mt-10 mb-5 ml-5 pa-0">
        山域事故監測
        </v-card-title>
        <line-chart :Grade="'accident'" :Tab="4"/>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import LineChart from '../components/LineChart.vue'

  export default {
      name: 'Monitor',

      components: {
        LineChart  
      },
      data () {
        return {

        }}

  }
</script>
