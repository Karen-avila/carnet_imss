import Vue from 'vue'
import moment from 'moment'

Vue.filter('DateTime', function (value) {
  moment.locale('es')
  return moment(value).format('l')
})
