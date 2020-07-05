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
                              <v-card-subtitle class="muted--text pb-0" style="font-size: 12.5px;">CONFIRMED</v-card-subtitle>
                              <div v-if="country.new_confirmed" class="mt-3 mr-4 blue white--text rounded px-2 text-center d-flex flex-row justify-space-between align-center" style="">
                                  <span class="mr-1 number" style="font-size: 11.5px !important;">{{country.new_confirmed}}</span>
                                  <v-icon color="white" size="12">mdi-arrow-up</v-icon>
                              </div>
                          </div>
                          <v-card-title class="pt-0 blue--text font-weight-bold number counter">
                              <ICountUp v-if="country.confirmed !== null" :delay="delay" :endVal="country.confirmed" :options="options"></ICountUp>
                              <span v-else>N/A</span>
                          </v-card-title>
                      </v-card>
                      <v-card key="confirmed_loading" class="soft-shadow pa-5" v-else>
                          <v-skeleton-loader :boilerplate="boilerplate" type="paragraph"></v-skeleton-loader>
                      </v-card>
                  </transition>
              </v-col>
          </v-row>

          <v-row>
              <v-col>
                  <transition name="fade-transition" mode="out-in">
                      <v-card key="deaths" v-if="!loading" ripple class="soft-shadow" style="position: relative">
                          <div class="d-flex flex-row justify-space-between align-center">
                              <v-card-subtitle class="muted--text pb-0" style="font-size: 12.5px;">DEATHS</v-card-subtitle>
                              <div v-if="country.new_deaths" class="mt-3 mr-4 primary white--text rounded px-2 text-center d-flex flex-row justify-space-between align-center" style="">
                                  <span class="mr-1 number" style="font-size: 11.5px !important;">{{country.new_deaths}}</span>
                                  <v-icon color="white" size="12">mdi-arrow-up</v-icon>
                              </div>
                          </div>
                          <v-card-title class="pt-0 primary--text font-weight-bold number counter">
                              <ICountUp v-if="country.deaths !== null" :delay="delay" :endVal="country.deaths" :options="options"></ICountUp>
                              <span v-else>N/A</span>
                          </v-card-title>
                      </v-card>
                      <v-card key="deaths_loading" class="soft-shadow pa-5" v-else>
                          <v-skeleton-loader :boilerplate="boilerplate" type="paragraph"></v-skeleton-loader>
                      </v-card>
                  </transition>
              </v-col>
              <v-col>
                  <transition name="fade-transition" mode="out-in">
                      <v-card key="recovered" v-if="!loading" ripple class="soft-shadow" style="position: relative">
                          <div class="d-flex flex-row justify-space-between align-center">
                              <v-card-subtitle class="muted--text pb-0" style="font-size: 12.5px;">RECOVERED</v-card-subtitle>
                          </div>
                          <v-card-title class="pt-0 green--text font-weight-bold number counter">
                              <ICountUp v-if="country.recovered !== null" :delay="delay" :endVal="country.recovered" :options="options"></ICountUp>
                              <span v-else>N/A</span>
                          </v-card-title>
                      </v-card>
                      <v-card key="recovered_loading" class="soft-shadow pa-5" v-else>
                          <v-skeleton-loader :boilerplate="boilerplate" type="paragraph"></v-skeleton-loader>
                      </v-card>
                  </transition>
              </v-col>
          </v-row>

          <v-row>
              <v-col cols="12" v-if="$store.state.isCordova">
                  <transition name="fade-transition" mode="out-in">
                      <v-alert v-if="!loading"
                               v-ripple
                               class="soft-shadow"
                               color="primary"
                               text
                      >
                          <div class="d-flex flex-row justify-space-between align-center">
                              <div class="medium-text mr-5">Receive Notifications About Cases Updates</div>
                              <div>
                                  <v-switch color="primary" :disabled="notifyLoading" :input-value="country.notify" @change="notify" inset :loading="notifyLoading"></v-switch>
                              </div>
                          </div>
                      </v-alert>
                      <v-card v-else class="soft-shadow pa-5">
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
    import axios from 'axios'

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
              notifyLoading: false,
          }
      },
      mounted(){
        if(this.countryId){
            this.loading = false
            this.boilerplate = false
        }
      },
      methods: {
          notify(notify){
              this.notifyLoading = true
              axios.post(process.env.VUE_APP_API_URL + '/subscribe/' + this.country.id, {
                  device_token: this.$store.state.fcm_token,
                  device: device.platform,
              }).then(response => {
                  this.notifyLoading = false
                  Country.update({
                      where: this.country.id,
                      data: {
                          notify: response.data.subscribed
                      }
                  })
              }).catch(error => {
                  console.log(error)
                  this.$store.commit('showSnackbar', {msg: 'Error. Couldn\'t Subscribe To Notifications', color: 'pink'})
                  this.notifyLoading = false
              });
          }
      },
        watch: {
          countryId(id){
              if(id){
                  this.boilerplate = false
				  this.loading = true
				  Country.api().get(process.env.VUE_APP_API_URL+'/countries/'+id, {params: {'device_token': this.$store.state.fcm_token}}).then(() => {
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
      },

    }
</script>
<style>
    .v-progress-linear__background{
        background-color: white !important;
    }
</style>