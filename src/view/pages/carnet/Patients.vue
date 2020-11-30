<template lang="pug">
mixin GoBackButton
  .row.q-mb-sm
    .col
      q-btn.btn-fixed-width.text-capitalize(
        bordered=false
        flat=true
        align='between'
        color='blue'
        text-color='blue'
        label='Atrás'
        icon='keyboard_arrow_left'
        @click='goBack'
      )

mixin Pagination
  template(v-slot:pagination='scope')
    q-btn(v-if='scope.pagesNumber > 2', icon='first_page', color='grey-8', round='', dense='', flat='', :disable='scope.isFirstPage', @click='scope.firstPage')
    q-btn(icon='chevron_left', color='grey-8', round='', dense='', flat='', :disable='scope.isFirstPage', @click='scope.prevPage')
    q-btn(icon='chevron_right', color='grey-8', round='', dense='', flat='', :disable='scope.isLastPage', @click='scope.nextPage')
    q-btn(v-if='pagesNumber > 2', icon='last_page', color='grey-8', round='', dense='', flat='', :disable='scope.isLastPage', @click='scope.lastPage')

mixin Table
  q-table(
    v-if='pacientes.length'
    row-key='name'
    flat=''
    bordered=true
    rows-per-page-label='Pacientes por página'
    separator='cell'
    class='carnet-header-table'
    table-header-class='bg-yellow-2'
    :data='pacientes'
    :columns='columns'
    :rows-per-page-options='[10, 25, 50]'
    :pagination-label='paginationLabel'
  )
    template(
      v-slot:body-cell='props'
    )
      q-td.cursor-pointer(
        :props='props'
        @click='goCarnet(props.row)'
      )
        span(
          v-if="props.col.field === 'nombre_paciente'"
        ) {{props.value}} {{props.row.ap_paterno_paciente}} {{props.row.ap_materno_paciente}}
        span(
          v-else-if="props.col.field === 'edad'"
        ) {{props.value}} años
        span(
          v-else
        ) {{props.value}}
    template(
      v-slot:pagination='scope'
    )
      q-btn(
        v-if='scope.pagesNumber > 2'
        icon='first_page'
        color='grey-8'
        round=''
        dense=''
        flat=''
        size='lg'
        :disable='scope.isFirstPage'
        @click='scope.firstPage'
      )
      q-btn(
        icon='chevron_left'
        color='grey-8'
        round=''
        dense=''
        flat=''
        size='lg'
        :disable='scope.isFirstPage'
        @click='scope.prevPage'
      )
      q-btn(
        icon='chevron_right'
        color='grey-8'
        round=''
        dense=''
        flat=''
        size='lg'
        :disable='scope.isLastPage'
        @click='scope.nextPage'
      )
      q-btn(
        v-if='scope.pagesNumber > 2'
        icon='last_page'
        color='grey-8'
        round=''
        dense=''
        flat=''
        size='lg'
        :disable='scope.isLastPage'
        @click='scope.lastPage'
      )
div
  /////////////
  // TEMPLATE DESKTOP
  /////////////
  .layout.q-mx-auto.q-mb-xl(
    v-if='$q.screen.gt.sm'
  )
    Header
    +GoBackButton
    q-card.card.shadow-6.q-mt-sm
      q-toolbar.bg-amber-2
        span.text-weight-bold.q-ml-lg(
        ) {{pacientes.length}}
        span.text-weight-medium.q-ml-sm(
        ) Paciente(s) encontrados
        q-space
        span.text-weight-medium.q-mr-lg(
        ) Selecciona un registro para ver detalles
      q-card-section.q-pa-lg
        +Table
  /////////////
  // TEMPLATE MOBILE
  /////////////
  div(
    v-if='$q.screen.lt.md'
  )
    Header.q-mx-md
    +GoBackButton
    q-card.card.shadow-6.q-mb-lg
      q-toolbar.bg-amber-2.q-pt-sm(
        style='min-height: .5rem;'
      )
        .q-mx-auto
          span.text-weight-bold(
          ) {{pacientes.length}}
          span.text-weight-medium.q-ml-sm(
          ) Paciente(s) encontrados
      q-toolbar.bg-amber-2.q-pb-sm(
        style='min-height: .5rem;'
      )
        span.text-weight-medium.q-mx-auto(
        ) Selecciona un registro para ver detalles
      q-card-section.q-px-xs.q-py-lg
        +Table
</template>

<script>
import ApiMongoService from '@/boot/services/api.mongo.service'
import Header from './components/Header.vue'
import { GETPATIENTS } from '@/boot/endpoints/carnet'
import { mapGetters } from 'vuex'
export default {
  components: {
    Header
  },
  data () {
    return {
      searching: true,
      form: JSON.parse(atob(this.$route.params.form)),
      pacientes: [],
      columns: [
        { label: 'NSS', field: 'nss', align: 'left' },
        { label: 'CURP', field: 'curp', align: 'left' },
        { label: 'Nombre', field: 'nombre_paciente', align: 'left' },
        { label: 'Edad', field: 'edad', align: 'left' },
        { label: 'Unidad médica', field: 'denominacion_unidad_atencion', align: 'left' },
        { label: 'Diagnóstico', field: 'diagnostico_cie10', align: 'left' }
      ]
    }
  },
  mounted () {
    if (this.currentUser.pacientes.length > 0) {
      this.multipleSearch(this.currentUser.pacientes)
    } else {
      this.search()
    }
  },
  methods: {
    search () {
      this.$q.loading.show({
        message: 'Buscando pacientes'
      })
      ApiMongoService.get(GETPATIENTS, this.form)
        .then(response => response.json())
        .then(data => {
          this.pacientes = data
        })
        .finally(() => {
          this.$q.loading.hide()
        })
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
    paginationLabel (firstRowIndex, endRowIndex, totalRowsNumber) {
      return `${firstRowIndex} a ${endRowIndex} de ${totalRowsNumber} pacientes`
    },
    goCarnet (patient) {
      this.$router.push({ name: 'carnet', params: { patient: btoa(JSON.stringify(patient)) } })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  }
}
</script>

<style lang="sass">
.layout
  max-width: 1400px;
</style>
