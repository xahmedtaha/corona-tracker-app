import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ar from 'vuetify/es5/locale/ar'

Vue.use(Vuetify);

export default new Vuetify({
    // rtl: true,
    // lang: {
    //     currentLang: 'ar',
    //     langs: {ar},
    // },
    theme: {
        themes: {
            light: {
                primary: '#667db6',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
    },
});
