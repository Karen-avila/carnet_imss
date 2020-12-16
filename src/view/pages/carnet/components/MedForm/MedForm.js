import ApiMongoService from '@/boot/services/api.mongo.service'
import { GETOPTIONS } from '@/boot/endpoints/carnet'

export default {
  data () {
    return {
      registro: this.dialogopens,
      form: {
        unidad_atencion: '',
        medico: '',
        cama: '',
        fecha_prescripcion: '',
        generico: '',
        numerico: '',
        unidad_medida: '',
        cantidad: '',
        tipo: '',
        estatus_aplicacion: '',
        fecha_aplicacion: ''
      },
      options: {
        unidades_atencion: [],
        medicos: []
      }
    }
  },
  props: ['dialogopens'],
  async mounted () {
    this.options.unidades_atencion = await this.getOptions('denominacion_unidad_atencion', '')
    this.options.medicos = await this.getOptions('medico', '')
  },
  update () {
    console.log('hola', this.dialogopens)
  },
  methods: {
    openPayment() {
      this.$root.$refs["dialog"].open()
    },
    getOptions (key, value) {
      return ApiMongoService.get(GETOPTIONS, { key: key, value: value })
        .then(response => response.json())
        .then((data) => {
          data = data.map(item => item._id[key])
          return data
        })
    },
    filterFndUnidadMedica (val, update, abort) {
      update(async () => {
        this.options.unidades_atencion = await this.getOptions('denominacion_unidad_atencion', val.toLowerCase())
      })
    },
    filterFndMedico (val, update, abort) {
      update(async () => {
        this.options.medicos = await this.getOptions('medico', val.toLowerCase())
      })
    },
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },
    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
