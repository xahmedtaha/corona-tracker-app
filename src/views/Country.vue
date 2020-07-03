<template>
    <div>
        <div class="primary py-10">
            <div class="mb-3 d-flex flex-column justify-center align-center">
                <v-skeleton-loader type="list-item-avatar" transition="fade-transition" :loading="$wait.waiting('country')">
                    <v-list-item dark>
                        <v-list-item-avatar tile>
                            <v-icon v-if="country.name === 'World'" size="40">mdi-earth</v-icon>
                            <v-img :src="countryFlag(country.name)" v-else></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title><h2>{{country.name}}</h2></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-skeleton-loader>
            </div>
        </div>
        <div class="px-5 transparent">
            <v-row>
                <v-col cols="12">
                    <v-skeleton-loader
                            class="mt-n12 soft-shadow"
                            :loading="$wait.waiting('country')"
                            transition="fade-transition"
                            type="list-item-avatar-three-line"
                    >
                        <v-card v-ripple style="border-radius: .5rem !important;" class="soft-shadow d-flex flex-column mt-n12 overflow-hidden">
                            <div class="d-flex flex-row align-center justify-space-between py-5 px-5">
                                <div class="d-flex flex-column justify-center">
                                    <v-card-title class="font-weight-bold pt-0 d-flex flex-row-reverse number" style="font-size: 28px !important">{{country.confirmed}}</v-card-title>
                                    <v-card-subtitle class="medium-text pb-0 grey--text text--darken-1">Total Cases</v-card-subtitle>
                                </div>
                                <v-avatar color="primary" size="55" class="rounded-circle">
                                    <v-icon color="white">mdi-account-group</v-icon>
                                </v-avatar>
                            </div>
                        </v-card>
                    </v-skeleton-loader>

                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-skeleton-loader
                            class="soft-shadow"
                            :loading="$wait.waiting('country')"
                            transition="fade-transition"
                            type="list-item-avatar-three-line"
                    >
                        <v-card v-ripple style="border-radius: .5rem !important;" class="soft-shadow d-flex flex-column overflow-hidden">
                            <div class="d-flex flex-row align-center justify-space-between py-5 px-5">
                                <div class="d-flex flex-column justify-center">
                                    <v-card-title class="display-1 font-weight-bold pt-0 d-flex flex-row-reverse number" style="font-size: 28px !important">{{country.recovered}}</v-card-title>
                                    <v-card-subtitle class="medium-text pb-0 grey--text text--darken-1">Total Recovers</v-card-subtitle>
                                </div>
                                <v-avatar color="green-gradient" size="55" class="rounded-circle">
                                    <v-icon color="white">mdi-account-check</v-icon>
                                </v-avatar>
                            </div>
                        </v-card>
                    </v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-skeleton-loader
                            class="soft-shadow"
                            :loading="$wait.waiting('country')"
                            transition="fade-transition"
                            type="list-item-avatar-three-line"
                    >
                        <v-card v-ripple style="border-radius: .5rem !important;" class="soft-shadow d-flex flex-column overflow-hidden">
                            <div class="d-flex flex-row align-center justify-space-between py-5 px-5">
                                <div class="d-flex flex-column justify-center">
                                    <v-card-title class="display-1 font-weight-bold pt-0 d-flex flex-row-reverse number"  style="font-size: 28px !important">{{country.deaths}}</v-card-title>
                                    <v-card-subtitle class="medium-text pb-0 grey--text text--darken-1">Total Deaths</v-card-subtitle>
                                </div>
                                <v-avatar color="red-gradient" size="55" class="rounded-circle">
                                    <v-icon color="white">mdi-account-remove</v-icon>
                                </v-avatar>
                            </div>
                        </v-card>
                    </v-skeleton-loader>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import countrynames from "../plugins/countries";

    export default {
        name: 'Country',
        components: {

        },
        data: () => ({
            country: {},
        }),
        methods: {
            countryFlag(name){
                return "https://www.countryflags.io/"+countrynames.getCountryCode(name)+"/shiny/64.png";
            }
        },
        mounted(){
            this.$wait.start('country');
            const id = this.$route.params.id
            axios.get('http://localhost:8000/countries/'+id).then(response => {
                this.country = response.data
                this.$wait.end('country')
            }).catch(error => {
                this.$store.commit('showSnackbar', {msg: "Error. Couldn't Load Data", color: 'pink'})
                this.$wait.end('country')
            })
        },
        computed: {

        }
    }
</script>
