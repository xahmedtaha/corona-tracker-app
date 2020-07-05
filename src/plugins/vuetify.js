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
                primary: '#fd5a51',
                text: '#263136',
                accent: '#ed7d73',
                muted: '#a2a7a6',
                background: '#f9f8f9',
                error: '#b71c1c',
            },
        },
    },
});
