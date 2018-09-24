/**
 * api config
 */

import Vue from 'vue'
import axios from 'axios'

Vue.prototype.qs = require('qs')
Vue.prototype.axios = axios

const apiUrl = 'http://localhost:9527'

// the url prefix of static resource
Vue.prototype.staticUrl = 'http://localhost:9527/static'

// the development enviroment have to set a cookie for get api data
// please comment the follow code in the product environment
document.cookie = 'WZ_TOKEN=3atuo6QfGBG6RCcO1rqi2e64qVT8XSoR+wjvuyIy8eg=;'

/* ------------------------------ base url config ------------------------------ */
const baseURL = `${apiUrl}/mobile-server`
Vue.prototype.host = apiUrl
axios.defaults.baseURL = baseURL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
