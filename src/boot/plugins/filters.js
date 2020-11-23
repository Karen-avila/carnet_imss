import Vue from 'vue'
import moment from 'moment'
import { format } from 'quasar'

Vue.filter('DateTime', function (value) {
  moment.locale('es')
  return moment(value, 'YYYY-MM-DD hh:mm').format('DD/MM/YYYY')
})

Vue.filter('Capitalize', (value) => {
  return format.capitalize(value.toLowerCase())
})
