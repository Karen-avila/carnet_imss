import TableInfo from '../TableInfo'
export default {
  data () {
    return {
      date_prescription: '2019/02/01',
      objectStyle: {
        bordered: true
      }
    }
  },
  components: {
    TableInfo
  },
  props: ['data']
}
