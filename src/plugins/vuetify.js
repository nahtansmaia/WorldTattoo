import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);


export default new Vuetify({
    theme: {
        themes: {
          dark: {
            primary: '#d68100',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#D64B0B',
          },
        },
    },
});
