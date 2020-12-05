<template lang="pug">
/////////////
// MIXINS
/////////////
mixin Nombre
  label.text-weight-bold(
  ) Nombre (s):
  q-input(
    v-model='form.nombre_paciente'
    dense=''
    outlined=''
    placeholder='Ingresa el nombre'
  )
mixin PrimerApellido
  label.text-weight-bold(
  ) Primer apellido:
  q-input(
      outlined=''
      dense=''
      v-model='form.ap_paterno_paciente'
      placeholder='Ingresa el apellido'
      lazy-rules=''
    )
mixin SegundoApellido
  label.text-weight-bold(
  ) Segundo apellido:
  q-input(
      outlined=''
      dense=''
      v-model='form.ap_materno_paciente'
      label='Ingresa el apellido'
      lazy-rules=''
    )
mixin Curp
  label.text-weight-bold(
  ) Clave única de registro de población (CURP):
  q-input(
    v-model='form.curp'
    outlined=''
    dense=''
    label='Ingresa la CURP'
    lazy-rules=''
    style="width:100%"
  )
mixin NSS
  label.text-weight-bold(
  ) Número de seguro social (NSS):
  q-input(
    v-model='form.nss'
    outlined=''
    dense=''
    placeholder='Ingresar NSS'
    lazy-rules=''
    style="width:100%"
  )
mixin Delegacion
  label.text-weight-bold(
  ) Delegación:
  q-select(
    v-model='form.delegacion'
    outlined=''
    dense=''
    placeholder='Selecciona la delegación'
    use-input=''
    hide-selected=''
    fill-input=''
    input-debounce='0'
    :options='options.delegacion'
    @filter='filterFndelegacion'
  )
    template(v-slot:no-option='')
      q-item
        q-item-section.text-grey(
        ) No hay coincidencias
mixin UnidadMedica
  label.text-weight-bold(
  ) Unidad médica:
  q-select(
    outlined=''
    dense=''
    v-model='form.denominacion_unidad_atencion'
    placeholder='Selecciona la unidad'
    use-input=''
    hide-selected=''
    fill-input=''
    input-debounce='0'
    :options='options.denominacion_unidad_atencion'
    @filter='filterFndenominacion_unidad_atencion'
    style="width:100%"
  )
    template(
      v-slot:no-option=''
    )
      q-item
        q-item-section.text-grey(
        ) No hay coincidencias
mixin Diagnostico
  label.text-weight-bold(
  ) Diagnóstico:
  q-select(
    outlined=''
    dense=''
    v-model='form.diagnostico_cie10'
    placeholder='Selecciona el diagnóstico'
    use-input=''
    hide-selected=''
    fill-input=''
    input-debounce='0'
    :options='options.diagnostico_cie10'
    @filter='filterFndiagnostico_cie10'
  )
    template(
      v-slot:no-option=''
    )
      q-item
        q-item-section.text-grey(
        ) No hay coincidencias
mixin Reset
  q-btn.q-py-xs.text-capitalize(
    label='Limpiar'
    color='grey-6'
    outline=''
    style='min-width: 150px'
    @click='reset'
  )
mixin Search
  q-btn.q-py-xs.q-ml-lg.text-capitalize(
    style='min-width: 150px'
    color='accent'
    outline=''
    ref='searchPatient'
    @click='goPatients'
  ) Buscar
/////////////
/////////////
/////////////
div
  /////////////
  // TEMPLATE DESKTOP
  /////////////
  .layout.q-mx-auto.q-mb-xl(v-if='$q.screen.gt.sm && currentUser')
    Header
    q-form.q-col-gutter-y-md
      p.q-my-md.text-weight-bold(
      ) Ingresa los datos del paciente
        .row.q-col-gutter-xl
          .col-6.self-end
            +Nombre
          .col.self-end
            +PrimerApellido
          .col.self-end
            +SegundoApellido
        .row.q-col-gutter-xl
          .col.self-end
            +Curp
          .col.self-end
            +NSS
          .col.self-end
            +Delegacion
          .col.self-end
            +UnidadMedica
        .row.q-col-gutter-xl
          .col-9.self-end
            +Diagnostico
        .row.q-col-gutter-xl
          .col-12
            div.q-mt-md.text-right
              +Reset
              +Search
  /////////////
  // TEMPLATE MOBILE
  /////////////
  div(v-if='$q.screen.lt.md && currentUser')
    Header.q-pa-sm
    q-form.q-pa-md
      .row.q-gutter-y-md
        .col-12
          +Nombre
        .col-12
          +PrimerApellido
        .col-12
          +SegundoApellido
        .col-12
          +Curp
        .col-12
          +NSS
        .col-12
          +Delegacion
        .col-12
          +UnidadMedica
        .col-12
          +Diagnostico
      .col-12
        div.q-my-lg.text-center
          +Reset
          +Search
</template>

<script>
import ApiMongoService from '@/boot/services/api.mongo.service'
import Header from './components/Header.vue'
import { GETOPTIONS } from '@/boot/endpoints/carnet'
import { mapGetters } from 'vuex'
export default {
  components: {
    Header
  },
  data () {
    return {
      searching: false,
      form: {
        curp: '',
        nss: '',
        denominacion_unidad_atencion: '',
        nombre_paciente: '',
        ap_paterno_paciente: '',
        ap_materno_paciente: '',
        diagnostico_cie10: '',
        delegacion: '',
        cve_idee: ''
      },
      options: {
        diagnostico_cie10: [],
        denominacion_unidad_atencion: [],
        delegacion: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  },
  mounted () {
    if (this.currentUser.pacientes.length > 0) {
      this.$router.push({ name: 'patients', params: { form: btoa(JSON.stringify(this.form)) } })
    }
    this.getOptions('diagnostico_cie10', '').then(data => {
      this.options.diagnostico_cie10 = data
    })
    this.getOptions('denominacion_unidad_atencion', '').then(data => {
      this.options.denominacion_unidad_atencion = data
    })
    this.getOptions('delegacion', '').then(data => {
      this.options.delegacion = data
    })
  },
  methods: {
    getOptions (key, value) {
      return ApiMongoService.get(GETOPTIONS, { key: key, value: value })
        .then(response => response.json())
        .then((data) => {
          data = data.map(item => item._id[key])
          return data
        })
    },
    filterFndiagnostico_cie10 (val, update, abort) {
      update(() => {
        this.getOptions('diagnostico_cie10', val.toLowerCase()).then(data => {
          this.options.diagnostico_cie10 = data
        })
      })
    },
    filterFndenominacion_unidad_atencion (val, update, abort) {
      update(() => {
        this.getOptions('denominacion_unidad_atencion', val.toLowerCase()).then(data => {
          this.options.denominacion_unidad_atencion = data
        })
      })
    },
    filterFndelegacion (val, update, abort) {
      update(() => {
        this.getOptions('delegacion', val.toLowerCase()).then(data => {
          this.options.delegacion = data
        })
      })
    },
    reset () {
      this.pacientes = {}
      this.form = {
        curp: '',
        nss: '',
        denominacion_unidad_atencion: '',
        nombre_paciente: '',
        ap_paterno_paciente: '',
        ap_materno_paciente: '',
        diagnostico_cie10: '',
        delegacion: '',
        cve_idee: ''
      }
    },
    goPatients () {
      this.$router.push({ name: 'patients', params: { form: btoa(JSON.stringify(this.form)) } })
    }
  }
}
</script>

<style lang="sass">
.layout
  max-width: 1400px;
</style>
