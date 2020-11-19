<template lang="pug">
  div.q-py-sm.q-px-xl
    template(v-if="currentUser.pacientes")
      span.text-h4 Carnet
      q-separator(color='grey-4' size='2px')
      q-separator.q-mb-md.q-mb-xl(color='secondary' size='.5rem' style='max-width:2.5rem')
      q-form.q-col-gutter-y-sm(v-if="currentUser.pacientes.length === 0")
        p INGRESA LOS DATOS DEL PACIENTE
          .row.q-col-gutter-xs
            .col-12.col-md
              q-input(
                outlined=''
                dense=''
                v-model='form.curp'
                label='CURP'
                lazy-rules=''
                style="width:100%"
              )
            .col-12.col-md
              q-input(
                outlined=''
                dense=''
                v-model='form.nss'
                label='Número de seguridad social'
                lazy-rules=''
                style="width:100%"
              )
            .col-12.col-md
              q-select(
                outlined=''
                dense=''
                v-model='form.diagnostico_cie10'
                label='Diagnóstico'
                use-input=''
                hide-selected=''
                fill-input=''
                input-debounce='0'
                :options='options.diagnostico_cie10'
                @filter='filterFndiagnostico_cie10'
              )
                template(v-slot:no-option='')
                  q-item
                    q-item-section.text-grey
                      | No hay coincidencias
          .row.q-col-gutter-xs
            .col-12.col-md
              q-input(
                  outlined=''
                  dense=''
                  v-model='form.nombre_paciente'
                  label='Nombre del paciente'
                  lazy-rules=''
                )
            .col-12.col-md
              q-input(
                  outlined=''
                  dense=''
                  v-model='form.ap_paterno_paciente'
                  label='Apellido paterno'
                  lazy-rules=''
                )
            .col-12.col-md
              q-input(
                  outlined=''
                  dense=''
                  v-model='form.ap_materno_paciente'
                  label='Apellido materno'
                  lazy-rules=''
                )
          .row.q-col-gutter-xs
            .col-12.col-md
              q-select(
                outlined=''
                dense=''
                v-model='form.denominacion_unidad_atencion'
                label='Unidad Médica'
                use-input=''
                hide-selected=''
                fill-input=''
                input-debounce='0'
                :options='options.denominacion_unidad_atencion'
                @filter='filterFndenominacion_unidad_atencion'
                style="width:100%"
              )
                template(v-slot:no-option='')
                  q-item
                    q-item-section.text-grey
                      | No hay coincidencias
            .col-12.col-md
              q-select(
                outlined=''
                dense=''
                v-model='form.delegacion'
                label='Delegación'
                use-input=''
                hide-selected=''
                fill-input=''
                input-debounce='0'
                :options='options.delegacion'
                @filter='filterFndelegacion'
              )
                template(v-slot:no-option='')
                  q-item
                    q-item-section.text-grey
                      | No hay coincidencias
            .col-12.col-md
              div.text-right
                q-btn(
                  :loading='searching'
                  color='accent'
                  outline=''
                  ref='searchPatient'
                  @click='search'
                  style='min-width: 160px'
                )
                  | {{pacientes.length === 0 ? "Buscar" : "Buscar"}}
                  template(v-slot:loading='')
                    q-spinner-hourglass.on-left
                    | Buscando...
                q-btn.q-ml-sm(
                  label='Limpiar'
                  color='grey-6'
                  flat=''
                  @click='reset'
                )
    template
      q-banner.bg-warning.text-center.alert-banner.q-mb-md(
        inline-actions=''
        rounded=''
        dense=''
        v-if='!paciente && !noResults'
      )
        span.text-weight-bold {{pacientes.length ? `${pacientes.length} Paciente(s) encontrados` : 'Busca un paciente para ver los resultados'}}
        template(v-if="pacientes.length")
          br
          span.text-caption Selecciona un registro para ver detalles
      q-banner.bg-negative.text-center.alert-negative.q-mb-md.text-white(
        inline-actions=''
        rounded=''
        dense=''
        v-if='noResults'
      )
        span.text-weight-bold No se encontraron pacientes relacionados
      q-table(
        v-if='pacientes.length'
        :data='pacientes'
        :columns='columns'
        row-key='name'
        flat=''
        bordered=true
        :dense='$q.screen.lt.md'
        :rows-per-page-options='[10, 25, 50]'
        :pagination-label="paginationLabel"
        rows-per-page-label='Pacientes por página'
        separator='cell'
      )
        template(v-slot:body-cell='props')
          q-td.cursor-pointer(:props='props' @click='setPatient(props.row)')
            span(v-if="props.col.field === 'nombre_paciente'") {{props.value}} {{props.row.ap_paterno_paciente}} {{props.row.ap_materno_paciente}}
            span(v-else-if="props.col.field === 'edad'") {{props.value}} años
            span(v-else-if="props.col.field === 'actions'")
              q-icon(name='person_search' size='md', color='accent')
            span(v-else) {{props.value}}
      template(v-if="paciente")
        q-banner.text-center.alert-banner.alert-img-carnet.q-mb-md.q-py-lg.q-px-xl(
          inline-actions=''
          rounded=''
          dense=''
        )
          .row.q-col-gutter-xs
            .col-12.col-md.text-left
              span.text-weight-bold Nombre:
              br
              span {{paciente.nombre_paciente}} {{paciente.ap_paterno_paciente}} {{paciente.ap_materno_paciente}}
            .col-12.col-md.text-left
              span.text-weight-bold CURP:
              br
              span {{paciente.curp}}
            .col-12.col-md.text-left
              span.text-weight-bold NSS:
              br
              span {{paciente.nss}}
          .row.q-col-gutter-xs
            .col-12.col-md.text-left
              span.text-weight-bold Fecha de nacimiento:
              br
              span {{paciente.fecha_nacimiento | DateTime}}
            .col-12.col-md.text-left
              span.text-weight-bold Edad:
              br
              span {{paciente.edad}} años
            .col-12.col-md.text-left
              span.text-weight-bold Peso:
              br
              span {{paciente.peso}} Kg
          .row.q-col-gutter-xs
            .col-12.col-md.text-left
              span.text-weight-bold Agregado médico:
              br
              span {{paciente.agregado_medico}}
            .col-12.col-md.text-left
            .col-12.col-md.text-left
        q-banner.text-center.no-padding.q-mb-md(
          inline-actions=''
          rounded=''
          dense=''
        )
          .row.bg-grey-2.q-py-sm
            .col
              span.text-weight-bold.text-center DIAGNÓSTICO
            .col
              span.text-weight-bold.text-center INFORMACIÓN
          .row.bg-grey-4.q-py-sm
            .col
              span.text-center {{paciente.diagnostico_cie10}}
            .col
              span.text-center Tipo mezcla: {{paciente.tipo_mezcla}}
        q-list.q-mb-md(
          bordered=''
          v-for='(carnet, i) in carnets'
          :key='i'
        )
          q-expansion-item.bg-grey-2(
            group='somegroup'
            icon='explore'
          )
            template(v-slot:header='')
              .col
                q-item-section
                  p.no-margin Unidad de atención
                  p.no-margin.text-weight-bold {{carnet.unidad_medica_atencion ? carnet.unidad_medica_atencion : '-'}}
              .col
                q-item-section
                  p.no-margin Médico
                  p.no-margin.text-weight-bold {{carnet.medico ? carnet.medico : '-'}}
              .col
                q-item-section
                  p.no-margin Cama
                  p.no-margin.text-weight-bold {{carnet.cama && carnet.cama != 0 ? carnet.cama : '-'}}
              .col
                q-item-section
                  p.no-margin Fecha
                  p.no-margin.text-weight-bold {{`${carnet.fecha_prescripcion ? carnet.fecha_prescripcion : '-'}` | DateTime}}
            q-markup-table(
              flat=''
              bordered=true
              separator='cell'
            )
              thead.bg-warning
                tr
                  th.text-center Genérico
                  th.text-center Consumo
                  th.text-center Cantidad
                  th.text-center Tipo
                  th.text-center Estatus
              tbody
                tr(
                  v-for='(prescription, p) in carnet.carnet', :key='p'
                  v-if='prescription.tipo !== "Instrumental Médico"'
                )
                  td.text-center {{prescription.generico}}
                  td.text-center {{prescription.consumo}} {{prescription.unidad_medida}}
                  td.text-center {{prescription.cantidad_bolos}}
                  td.text-center {{prescription.tipo}}
                  td.text-center
                    span(
                      v-if='prescription.entregado === "ENTREGADO"'
                    ) {{prescription.entregado}}
                    q-expansion-item(
                      v-if='prescription.entregado !== "ENTREGADO"'
                      dense=''
                      dense-toggle=''
                      label='NO ENTREGADO'
                      header-class="text-negative"
                    )
                      q-card
                        q-card-section
                          | {{prescription.motivo ? prescription.motivo : "No hay motivo capturado"}}
</template>

<script>
import ApiMongoService from '@/boot/services/api.mongo.service'
// eslint-disable-next-line no-unused-vars
import { GETPATIENTS, CARNET, GETUNIDADMEDICA, GETDIAGNOSTICO, GETDELEGACION, GETOPTIONS } from '@/boot/endpoints/carnet'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
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
      columns: [
        { label: 'NSS', field: 'nss', align: 'left' },
        { label: 'CURP', field: 'curp', align: 'left' },
        { label: 'Nombre', field: 'nombre_paciente', align: 'left' },
        { label: 'Edad', field: 'edad', align: 'left' },
        { label: 'Unidad Médica', field: 'denominacion_unidad_atencion', align: 'left' },
        { label: 'Diagnóstico', field: 'diagnostico_cie10', align: 'left' },
        { label: '', field: 'actions', align: 'left' }
      ],
      pacientes: [],
      paciente: null,
      noResults: false,
      carnets: [],
      options: {
        diagnostico_cie10: [],
        denominacion_unidad_atencion: [],
        delegacion: []
      }
    }
  },
  mounted () {
    if (this.currentUser.pacientes.length > 0) {
      this.multipleSearch(this.currentUser.pacientes)
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
    search () {
      this.paciente = null
      this.searching = true
      ApiMongoService.get(GETPATIENTS, this.form)
        .then(response => response.json())
        .then(data => {
          this.pacientes = data
          if (this.pacientes.length < 1) this.noResults = true
        })
        .finally(() => { this.searching = false })
    },
    multipleSearch (pacientes) {
      pacientes.map((paciente) => {
        ApiMongoService.get(GETPATIENTS, { cve_idee: paciente.cveIdee })
          .then(response => response.json())
          .then(data => {
            if (data.length) {
              this.pacientes.unshift(data[0])
            }
          })
      })
    },
    setPatient (patient) {
      if (this.currentUser.pacientes.length === 0) this.pacientes = {}
      ApiMongoService.get(CARNET, patient)
        .then(response => response.json())
        .then((data) => {
          this.paciente = data[0]
          this.carnets = data
          this.carnets.sort((a, b) => {
            a = moment(a.fecha_prescripcion, 'DD-MM-YYYY hh:mm')
            b = moment(b.fecha_prescripcion, 'DD-MM-YYYY hh:mm')
            if (a > b) return -1
            if (a < b) return 1
            else return 0
          })
        })
    },
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
      if (this.currentUser.pacientes.length === 0) {
        this.pacientes = {}
        this.form = {
          curp: '',
          nss: '',
          unidad_medica_atencion: '',
          nombre_paciente: '',
          ap_paterno_paciente: '',
          ap_materno_paciente: '',
          diagnostico_cie10: '',
          delegacion: '',
          cve_idee: ''
        }
      }
      this.paciente = null
      this.carnets = []
      this.noResults = false
    },
    paginationLabel (firstRowIndex, endRowIndex, totalRowsNumber) {
      return `${firstRowIndex} a ${endRowIndex} de ${totalRowsNumber} pacientes`
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  }
}
</script>

<style lang="sass" scoped>
.alert-banner
  background-color: #fcf2ce!important
  border-color: $warning!important
.alert-img-carnet
  background-image: url(~assets/img/carnet/carnet.png);
  background-position: top right 10%;
  background-size: contain;
  background-repeat: no-repeat;
</style>
