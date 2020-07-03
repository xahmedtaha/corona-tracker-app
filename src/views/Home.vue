<template>
  <div>
      <div class="primary white--text px-6 py-5 pb-15">
          <p class="medium-text mb-0 font-weight-medium">Covid-19 Tracker</p>
          <v-autocomplete light hide-details :disabled="$wait.waiting('countries')" class="font-weight-bold title" dark v-model="countryId" item-text="name" item-value="id" :items="countries" placeholder="Choose a country to track"></v-autocomplete>
          <p v-if="country" class="details-text grey--text text--lighten-3 font-weight-medium mt-2">Last updated <timeago :auto-update="60" :datetime="country.updated_at"></timeago></p>
      </div>
      <v-container class="mt-n16">
          <v-row>
              <v-col cols="12">
                  <transition name="fade-transition" mode="out-in">
                      <v-card key="confirmed" v-if="!loading" ripple class="soft-shadow" style="position: relative">
                          <div class="d-flex flex-row justify-space-between align-center">
                              <v-card-subtitle class="grey--text pb-0" style="font-size: 12.5px;">CONFIRMED</v-card-subtitle>
                              <div v-if="country.new_confirmed" class="mt-3 mr-4 blue details-text white--text rounded px-2 text-center d-flex flex-row justify-space-between align-center" style="">
                                  <span class="mr-1">{{country.new_confirmed}}</span>
                                  <v-icon color="white" small>mdi-arrow-up</v-icon>
                              </div>
                          </div>
                          <v-card-title class="pt-0 blue--text font-weight-bold number counter">
                              <ICountUp :delay="delay" :endVal="country.confirmed" :options="options"></ICountUp>
                          </v-card-title>
                          <!--                      <v-sparkline :padding="0" fill :smooth="10" auto-draw :value="[country.old_confirmed, country.new_confirmed]" color="primary"></v-sparkline>-->
                      </v-card>
                      <v-card key="confirmed_loading" class="soft-shadow pa-5" v-else>
                          <v-skeleton-loader :boilerplate="boilerplate" type="paragraph"></v-skeleton-loader>
                      </v-card>
                  </transition>
              </v-col>
<!--              <v-col cols="6">-->
<!--                  <v-card v-if="!loading" ripple class="soft-shadow" style="position: relative">-->
<!--                      <div class="details-text red white&#45;&#45;text elevation-5 rounded px-2 text-center d-flex flex-row justify-space-between align-center" style="position: absolute; top: -11px; right: 8px;z-index: 5">-->
<!--                          <span class="mr-1">{{Math.abs((country.confirmed - (country.recovered + country.deaths)) - ((country.confirmed - country.new_confirmed) - ((country.recovered - country.new_recovered) + (country.deaths - country.new_deaths))))}}</span>-->
<!--                          <v-icon color="white" small>{{ (country.confirmed - (country.recovered + country.deaths)) > ((country.confirmed - country.new_confirmed) - ((country.recovered - country.new_recovered) + (country.deaths - country.new_deaths))) ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>-->
<!--                      </div>-->
<!--                      <v-card-subtitle class="grey&#45;&#45;text pb-0" style="font-size: 12.5px;">ACTIVE</v-card-subtitle>-->
<!--                      <v-card-title class="pt-0 red&#45;&#45;text font-weight-bold number">{{country.confirmed - (country.recovered + country.deaths)}}</v-card-title>-->
<!--&lt;!&ndash;                      <v-sparkline :padding="0" fill :smooth="10" auto-draw :value="[(country.confirmed - country.new_confirmed) - (country.recovered + country.deaths), country.confirmed - (country.recovered + country.deaths)]" color="red"></v-sparkline>&ndash;&gt;-->
<!--                  </v-card>-->
<!--                  <v-card class="soft-shadow pa-5" v-else>-->
<!--                      <v-skeleton-loader :boilerplate="boilerplate" type="paragraph"></v-skeleton-loader>-->
<!--                  </v-card>-->
<!--              </v-col>-->
          </v-row>

          <v-row>
              <v-col cols="12">
                  <transition name="fade-transition" mode="out-in">
                      <v-card key="deaths" v-if="!loading" ripple class="soft-shadow" style="position: relative">
                          <div class="d-flex flex-row justify-space-between align-center">
                              <v-card-subtitle class="grey--text pb-0" style="font-size: 12.5px;">DEATHS</v-card-subtitle>
                              <div v-if="country.new_deaths" class="mt-3 mr-4 red details-text white--text rounded px-2 text-center d-flex flex-row justify-space-between align-center" style="">
                                  <span class="mr-1">{{country.new_deaths}}</span>
                                  <v-icon color="white" small>mdi-arrow-up</v-icon>
                              </div>
                          </div>
                          <v-card-title class="pt-0 red--text font-weight-bold number counter">
                              <ICountUp :delay="delay" :endVal="country.deaths" :options="options"></ICountUp>
                          </v-card-title>
                          <!--                      <v-sparkline :padding="0" fill :smooth="10" auto-draw :value="[country.old_confirmed, country.new_confirmed]" color="primary"></v-sparkline>-->
                      </v-card>
                      <v-card key="deaths_loading" class="soft-shadow pa-5" v-else>
                          <v-skeleton-loader :boilerplate="boilerplate" type="paragraph"></v-skeleton-loader>
                      </v-card>
                  </transition>
              </v-col>
          </v-row>

          <v-row>
              <v-col cols="12">
                  <transition name="fade-transition" mode="out-in">
                      <v-card key="recovered" v-if="!loading" ripple class="soft-shadow" style="position: relative">
                          <div class="d-flex flex-row justify-space-between align-center">
                              <v-card-subtitle class="grey--text pb-0" style="font-size: 12.5px;">RECOVERED</v-card-subtitle>
                          </div>
                          <v-card-title class="pt-0 green--text font-weight-bold number counter">
                              <ICountUp :delay="delay" :endVal="country.recovered" :options="options"></ICountUp>
                          </v-card-title>
                          <!--                      <v-sparkline :padding="0" fill :smooth="10" auto-draw :value="[country.old_confirmed, country.new_confirmed]" color="primary"></v-sparkline>-->
                      </v-card>
                      <v-card key="recovered_loading" class="soft-shadow pa-5" v-else>
                          <v-skeleton-loader :boilerplate="boilerplate" type="paragraph"></v-skeleton-loader>
                      </v-card>
                  </transition>
              </v-col>
          </v-row>

      </v-container>
  </div>
</template>

<script>
    import ICountUp from 'vue-countup-v2';
    import Country from '../database/models/country'

    export default {
      name: 'Home',
      components: {
          ICountUp
      },
      data(){
          return {
              loading: true,
              delay: 0,
              options: {
                  useEasing: true,
                  useGrouping: true,
                  separator: ',',
                  decimal: '.',
                  prefix: '',
                  suffix: ''
              },
			  boilerplate: false,
          }
      },
      mounted(){

      },
      methods: {

      },
        watch: {
          countryId(id){
              if(id){
				  this.loading = true
				  Country.api().get('https://xahmedtaha.alwaysdata.net/countries/'+id).then(() => {
					  this.loading = false
				  }).catch(() => {
					  this.loading = false
					  this.$store.commit('showSnackbar', {msg: 'Error. Couldn\'t Load Data', color: 'pink'})
				  })
			  }else{
				this.loading = true
				this.boilerplate = true
			  }
          }
        },
      computed: {
        countries(){
            return Country.query().orderBy('order').get()
        },
          country(){
            return Country.find(this.countryId)
          },
          countryId: {
            get(){
                return this.$store.state.countryId
              },
              set(value){
                this.$store.commit('setCountryId', value)
              }
          }
      }
    }
</script>
<style>
    .v-progress-linear__background{
        background-color: white !important;
    }
</style>