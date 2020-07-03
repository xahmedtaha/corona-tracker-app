<template>
  <v-app>
    <div v-if="error" style="width: 100vw; height: 100vh; z-index: 1000;position: absolute" class="white d-flex flex-column justify-center align-center">
      <h1>Error!</h1>
    </div>
    <v-main>
      <router-view />
    </v-main>
    <v-bottom-navigation grow color="primary" app>
      <v-btn active-class="border-top" class="transition" :to="{name: 'Home'}" height="100%">
        <v-icon>mdi-earth</v-icon>
      </v-btn>

      <v-btn active-class="border-top" class="transition" height="100%">
        <v-icon>mdi-virus</v-icon>
      </v-btn>

      <v-btn height="100%">
        <v-icon>mdi-newspaper-variant-multiple</v-icon>
      </v-btn>

      <v-btn height="100%">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-snackbar v-model="snackbar">
      {{snackbarMsg}}
      <template v-slot:action="{ attrs }">
        <v-btn
                :color="snackbarColor"
                text
                v-bind="attrs"
                @click="snackbar = false"
        >
          close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import Country from "./database/models/country";
import axios from "axios";

export default {
  name: 'App',
  components: {

  },

  mounted() {
    // Load Basic Required Data (Countries Index, Current Geolocation Country)
    this.loading = true
    Country.api().get('https://xahmedtaha.alwaysdata.net/countries', {
      dataTransformer: (response, index) => {
        return response.data.map((country) => {
          return {...country, order: index}
        })
      }
    }).then(response => {
      this.$store.commit('setCountryId', Country.query().first().id)
      this.loading = false
    }).catch(() => {
      this.$store.commit('showSnackbar', {msg: "Error. Couldn't Load Data", color: 'pink'})
      this.error = true;
      this.loading = false
    });

  },

  data: () => ({
    error: false,
    loading: false,
  }),
  computed: {
    snackbarMsg(){
      return this.$store.state.snackbarMsg
    },
    snackbar: {
      get(){
        return this.$store.state.snackbar
      },
      set(value){ // Close Snackbar
        this.$store.commit('hideSnackbar');
      }
    },
    snackbarColor(){
      return this.$store.state.snackbarColor
    },
  },
};
</script>

<style lang="scss">
  @import "scss/app";

  .transition:before{
    transition: opacity 0s !important;
  }
  .border-top:before{
    display: block;
    content: '';
    max-width: 50px;
    margin-right: auto;
    margin-left: auto;
    background: #667db6;
    height: 2px;
    border-bottom-left-radius: 5rem !important;
    border-bottom-right-radius: 5rem !important;
    overflow: hidden !important;
    margin-top: 0px;
    opacity: 1 !important;
  }
</style>