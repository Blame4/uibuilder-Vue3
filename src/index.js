// @ts-nocheck

import '../uibuilder/uibuilder.esm.min.js'  // Adds `uibuilder` and `$` to globals

// For Vue v3
import * as Vue from '../uibuilder/vendor/vue/dist/vue.esm-browser.prod.js' // Dev ver local install. Chg to .prod.js for prod
// import { createApp } from 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.esm-browser.js' // As above but loaded remotely
import { loadModule } from '../uibuilder/vendor/vue3-sfc-loader/dist/vue3-sfc-loader.esm.js'
// Import the custom component directly (Note that it is a .js file, not a .vue file)

// Using the Vue options API style for beginner simplicity
// No need to pre-define Quasar's $q when working with the options API

const options = {
    moduleCache: {
        vue: Vue
    },
    async getFile(url) {

        const res = await fetch(url);
        if (!res.ok)
            throw Object.assign(new Error(res.statusText + ' ' + url), { res });
        return {
            getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
        }
    },
    addStyle(textContent) {

        const style = Object.assign(document.createElement('style'), { textContent });
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
    },
}


const app = Vue.createApp({
    // Define Vue reactive variables
    data() {
        return {

            message: 'Hello Vue!',
            count: 0,
            input1: '',

        }
    },

    components: {
        mycomponent: Vue.defineAsyncComponent(() => loadModule('App.vue', options))
    },

    // Dynamic data
    computed: {},

    // Supporting functions
    methods: {

        // Use the uib helper function to send something to NR
        doEvent(event) { uibuilder.eventSend(event) },

    },

    // Lifecycle hooks
    mounted() {
        // If msg changes - msg is updated when a standard msg is received from Node-RED
        uibuilder.onChange('msg', (msg) => {
            console.log('>> msg recvd >>', msg, this)

            // If the msg.payload is a string, show in on the page
            if (typeof msg.payload === 'string') this.message = msg.payload
        })
    },
})

app.mount('#app')
