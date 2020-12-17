import TableInfo from '../TableInfo'
import MedForm from '../MedForm'
export default {
  data () {
    return {
      date_prescription: '2019/02/01',
      objectStyle: {
        bordered: true
      },
      isOpenDialog: false,
      medico: ''
    }
  },
  components: {
    TableInfo,
    MedForm
  },
  props: ['data']
}
