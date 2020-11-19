import Vue from 'vue'
import moment from 'moment'

Vue.filter('DateTime', function (value) {
  moment.locale('es')
  return moment(value, 'YYYY-MM-DD hh:mm').format('DD/MM/YYYY')
})
