import Vue from 'vue'
import unixTimeToDate from './unixTimeToDate'
import unixTimeToTime from './unixTimeToTime'
import unixTimeToDatetime from './unixTimeToDatetime'
import liToYuan from './liToYuan'
import liToYuanD3 from './liToYuanD3'

Vue.filter('unixTimeToDate', unixTimeToDate)
Vue.filter('unixTimeToTime', unixTimeToTime)
Vue.filter('unixTimeToDatetime', unixTimeToDatetime)
Vue.filter('liToYuan', liToYuan)
Vue.filter('liToYuanD3', liToYuanD3)
