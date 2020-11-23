<template lang="pug">
  .layout.q-mx-auto.q-mb-xl.q-pa-sm
    template(v-if="currentUser.pacientes")
      span.text-h4 Carnet
      q-separator(color='grey-4' size='2px')
      q-separator.q-mb-lg(
        color='secondary'
        size='.5rem'
        style='max-width:2.5rem'
      )
      q-form.q-col-gutter-y-md(v-if="currentUser.pacientes.length === 0")
        p.q-mt-md INGRESA LOS DATOS DEL PACIENTE
          .row.q-col-gutter-xl
            .col-lg-6.col-12.self-end
              label Nombre (s):
              q-input(
                outlined=''
                dense=''
                v-model='form.nombre_paciente'
                placeholder='Ingresa el nombre'
                lazy-rules=''
              )
            .col-lg-3.col-12.self-end
              label Primer apellido:
              q-input(
                  outlined=''
                  dense=''
                  v-model='form.ap_paterno_paciente'
                  placeholder='Ingresa el apellido'
                  lazy-rules=''
                )
            .col-lg-3.col-12.self-end
              label Segundo apellido:
              q-input(
                  outlined=''
                  dense=''
                  v-model='form.ap_materno_paciente'
                  label='Ingresa el apellido'
                  lazy-rules=''
                )
          .row.q-col-gutter-xl
            .col-lg-3.col-12.self-end
              label Clave única de registro de población (CURP):
              q-input(
                outlined=''
                dense=''
                v-model='form.curp'
                label='Ingresa la CURP'
                lazy-rules=''
                style="width:100%"
              )
            .col-lg-3.col-12.self-end
              label Delegación:
              q-select(
                outlined=''
                dense=''
                v-model='form.delegacion'
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
                    q-item-section.text-grey
                      | No hay coincidencias
            .col-lg-6.col-12.self-end
              label Unidad médica:
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
                template(v-slot:no-option='')
                  q-item
                    q-item-section.text-grey
                      | No hay coincidencias
          .row.q-col-gutter-xl
            .col-lg-4.col-12.self-end
              label Número de seguro social (NSS):
              q-input(
                outlined=''
                dense=''
                v-model='form.nss'
                placeholder='Ingresar NSS'
                lazy-rules=''
                style="width:100%"
              )
            .col-lg-8.col-12.self-end
              label Diagnóstico:
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
                template(v-slot:no-option='')
                  q-item
                    q-item-section.text-grey
                      | No hay coincidencias
          .row.q-col-gutter-xl
            .col-12
              div.q-mt-md.text-right
                q-btn(
                  label='Limpiar'
                  color='grey-6'
                  outline=''
                  style='min-width: 160px'
                  @click='reset'
                )
                q-btn.q-ml-lg(
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
    template
      q-banner.bg-amber-2.text-center.q-mb-md.shadow-4(
        inline-actions=''
        rounded=''
        dense=''
        v-if='!paciente && !noResults'
      )
        span.text-weight-bold {{pacientes.length ? `${pacientes.length} Paciente(s) encontrados` : 'Busca un paciente para ver los resultados'}}
        template(v-if="pacientes.length")
          br
          span.text-caption Selecciona un registro para ver detalles
      q-banner.bg-negative.text-center.alert-negative.q-mb-md.shadow-4.text-white(
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
        class="carnet-header-table"
      )
        template(v-slot:body-cell='props')
          q-td.cursor-pointer(:props='props' @click='setPatient(props.row)')
            span(v-if="props.col.field === 'nombre_paciente'") {{props.value}} {{props.row.ap_paterno_paciente}} {{props.row.ap_materno_paciente}}
            span(v-else-if="props.col.field === 'edad'") {{props.value}} años
            span(v-else-if="props.col.field === 'actions'")
              q-icon(name='person_search' size='md', color='accent')
            span(v-else) {{props.value}}
      template(v-if="paciente")
        .row.q-mb-xl.q-mt-xl.q-col-gutter-x-xl.bg-carnet
          .col-lg-10.col-12.q-col-gutter-y-lg
            .row.q-col-gutter-x-lg
              .col-lg-6.col-12
                q-card.q-py-sm.shadow-4.b-ra-12
                  q-item
                    q-item-section(avatar='')
                      q-avatar(color='blue-1')
                        img.q-mt-xs(src='@/assets/img/carnet/Vector0.png')
                    q-item-section
                      q-item-label(caption='') Nombre
                      q-item-label {{paciente.nombre_paciente}} {{paciente.ap_paterno_paciente}} {{paciente.ap_materno_paciente}}
                      q-item-label(caption='') Fecha de nacimiento
                      q-item-label {{paciente.fecha_nacimiento | DateTime}}
              .col-lg-6.col-12
                q-card.q-py-sm.shadow-4.b-ra-12
                  q-item
                    q-item-section(avatar='')
                      q-avatar(color='blue-1', text-color='white')
                        img.q-mt-xs(src='@/assets/img/carnet/Vector1.png')
                    q-item-section
                      q-item-label(caption='') NNS
                      q-item-label {{paciente.nss}}
                      q-item-label(caption='') Agregado Médico
                      q-item-label {{paciente.agregado_medico}}
            .row.q-col-gutter-x-lg
              .col-lg-4.col-12
                q-card.q-py-sm.shadow-4.b-ra-12
                  q-item
                    q-item-section(avatar='')
                      q-avatar(color='cyan-1', text-color='white')
                        img.q-mt-xs(src='@/assets/img/carnet/Vector2.png')
                    q-item-section
                      q-item-label(caption='') CURP
                      q-item-label {{paciente.curp}}
              .col-lg-4.col-12
                q-card.q-py-sm.shadow-4.b-ra-12
                  q-item
                    q-item-section(avatar='')
                      q-avatar(color='yellow-1', text-color='white')
                        img.q-mt-xs(src='@/assets/img/carnet/Vector3.png')
                    q-item-section
                      q-item-label(caption='') Edad
                      q-item-label {{paciente.edad}} años
              .col-lg-4.col-12
                q-card.q-py-sm.shadow-4.b-ra-12
                  q-item
                    q-item-section(avatar='')
                      q-avatar(color='green-1', text-color='white')
                        img.q-mt-xs(src='@/assets/img/carnet/Vector4.png')
                    q-item-section
                      q-item-label(caption='') Peso
                      q-item-label {{paciente.peso}} Kg
            .row.q-col-gutter-x-lg
              .col-lg-8.col-12
                q-card.q-py-sm.shadow-4.b-ra-12
                  q-item
                    q-item-section
                      q-item-label(caption='') Diagnóstico
                      q-item-label {{paciente.diagnostico_cie10}}
                      q-item-label(caption='') Información
                      q-item-label Tipo de mezcla: {{paciente.tipo_mezcla}}
              .col-lg-4.col-12
                q-card.q-py-sm.bg-green-11.b-ra-12.shadow-18
                  q-item
                    q-item-section
                      q-item-label La información de los medicamentos proviene de centros de mezcla subrogados
          .col-lg-2.col-12
            q-card.b-ra-12.shadow-20.shadow-20-blue
              img.q-mx-auto(
                src='@/assets/img/carnet/kid.png'
                style="max-width:275px; max-heigth:275px;"
              )
        q-list.q-mb-md.b-ra-12.shadow-4(
          bordered=''
          v-for='(carnet, i) in carnets'
          :key='i'
        )
          q-expansion-item.b-ra-12.bg-grey-2(
            group='somegroup'
            icon='explore'
          )
            template(v-slot:header='')
              .col
                q-item-section
                  p.no-margin Unidad de atención
                  p.no-margin.text-weight-bold {{carnet.denominacion_unidad_atencion ? carnet.denominacion_unidad_atencion : '-'}}
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
              thead.bg-yellow-2
                tr
                  th.text-center ID Preescripción
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
                  td.text-center {{prescription.id_prescripcion}}
                  td.text-center {{prescription.generico}}
                  td.text-center {{prescription.consumo}} {{prescription.unidad_medida}}
                  td.text-center {{prescription.cantidad_bolos}}
                  td.text-center {{prescription.tipo}}
                  td.text-center(
                    :class='{"bg-red-1": prescription.entregado !== "ENTREGADO","bg-green-11": prescription.entregado === "ENTREGADO"}'
                  )
                    span(
                      :class='{ "text-negative": prescription.entregado !== "ENTREGADO", "text-green-8": prescription.entregado === "ENTREGADO" }'
                      v-if='!prescription.motivo'
                    ) {{prescription.entregado | Capitalize}}
                    q-expansion-item(
                      v-else
                      dense=''
                      dense-toggle=''
                      :label='prescription.entregado | Capitalize'
                      header-class="text-negative"
                    )
                      q-card.bg-red-1
                        q-card-section.text-negative
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
      this.noResults = false
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
            a = moment(a.fecha_prescripcion, 'YYYY-MM-DD hh:mm')
            b = moment(b.fecha_prescripcion, 'YYYY-MM-DD hh:mm')
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

<style lang="scss" scoped>
.layout{
  max-width: 1400px;
}
.bg-carnet{
  background-image: url(~assets/img/carnet/bg.png);
  background-position: left;
  background-size: cover;
  background-repeat: no-repeat;
}
.b-ra-12{
  border-radius: 12px;
}
.q-avatar__content, .q-avatar img:not(.q-icon) {
    border-radius: 0px;
    height: 20px;
    width: 20px;
}
.q-expansion-item.q-item-type.b-ra-12.bg-grey-2.q-expansion-item--expanded.q-expansion-item--standard{
  background: $amber-2!important;
}
.shadow-20-blue {
  box-shadow: 0 10px 13px -6px rgba(2, 215, 253, 1), 0 20px 31px 3pxrgba(2, 215, 253, 1), 0 8px 38px 7px rgba(2, 215, 253, 1)!important;
}
</style>

<style lang="sass">
.carnet-header-table
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: $yellow-2
</style>
