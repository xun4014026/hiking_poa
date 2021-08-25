<template>
  <v-app>
    <!-- dark -->
    <!-- color="#42865F" -->
    <v-app-bar
      app
      color="transparent"
      clipped-left
      class="elevation-0"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Cathay Logo"
          class="shrink mr-0"
          contain
          src="./assets/cathay-financial-logo.svg"
          transition="scale-transition"
          width="100"
        />

        <h1
          alt="Cathay Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          width="100"
          color="#42865F"
        > Cathay | Public Opinion Map </h1>
      </div>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      right
      app
      temporary
      color="rgb(234,234,234)"
    >
      <v-list
        nav
      >
        <v-list-item-group
          v-model="group"
        >
          <v-list-item :to="'/'">
            <v-icon>mdi-account-group</v-icon>
            <v-list-item-title>討論趨勢</v-list-item-title>
          </v-list-item>

          <v-list-item :to="'/Monitor'">
            <v-icon>mdi-access-point</v-icon>
            <v-list-item-title >議題監控</v-list-item-title>
          </v-list-item>


        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="ma-0 pa-0">
      <!-- <v-content class="ma-0 pa-0"> -->
      <router-view/>
      <!-- </v-content> -->
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group () {
      this.drawer = false
    },
  },

};
</script>

<style lang="scss">

html, body {
  margin: 0;
  padding: 0;
  // overflow: visible !important;
  background: #3d404e !important;
}
// .app_content{
//   height:70%
// }
/* width */
::-webkit-scrollbar {
  width: 0px;
  background-color: transparent;
}

</style>
