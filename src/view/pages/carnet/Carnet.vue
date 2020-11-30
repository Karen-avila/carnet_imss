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

mixin Card1
  q-card.card.q-py-sm.shadow-8
    q-item
      q-item-section(avatar='')
        img.q-mt-xs(
          src='@/assets/img/carnet/icon1.png'
          style="height: 50px; width: 50px;"
        )
      q-item-section
        q-item-label(
          caption=''
        ) Nombre
        q-item-label.text-weight-medium(
        ) {{paciente.nombre_paciente}} {{paciente.ap_paterno_paciente}} {{paciente.ap_materno_paciente}}
        q-item-label(
          caption=''
        ) Fecha de nacimiento
        q-item-label.text-weight-medium(
        ) {{paciente.fecha_nacimiento | DateTime}}

mixin Card2
  q-card.card.q-py-sm.shadow-8
    q-item
      q-item-section(
        avatar=''
      )
        img.q-mt-xs(
          src='@/assets/img/carnet/icon2.png'
          style="height: 50px; width: 50px;"
        )
      q-item-section
        .row
          .col
            q-item-label(
              caption=''
            ) NSS
            q-item-label.text-weight-medium(
            ) {{paciente.nss}}
          .col
            q-item-label(
              caption=''
            ) Agregado Médico
            q-item-label.text-weight-medium(
            ) {{paciente.agregado_medico}}
        q-item-label(
          caption=''
        ) CURP
        q-item-label.text-weight-medium(
        ) {{paciente.curp}}

mixin Card3
  q-card.card.q-py-sm.shadow-8
    q-item
      q-item-section(
        avatar=''
      )
        img.q-mt-xs(
          src='@/assets/img/carnet/icon3.png'
          style="height: 50px; width: 50px;"
        )
      q-item-section
        q-item-label(
          caption=''
        ) Edad
        q-item-label.text-weight-medium(
        ) {{paciente.edad}} años
        q-item-label(
          caption=''
        ) Peso
        q-item-label.text-weight-medium(
        ) {{paciente.peso}} Kg

mixin Card4
  q-card.card.q-py-sm.shadow-8
    q-item
      q-item-section
        q-item-label(caption='') Diagnóstico
        q-item-label.text-weight-medium {{paciente.diagnostico_cie10}}

mixin Card5
  q-card.card.q-py-sm.shadow-8
    q-item
      q-item-section
        q-item-label(caption='') Información
        q-item-label.text-weight-medium Tipo de mezcla: {{paciente.tipo_mezcla}}

mixin Card6
  q-card.card.q-py-sm.shadow-8
    q-item
      q-item-section
        q-item-label(caption='') Diagnóstico
        q-item-label.text-weight-medium {{paciente.diagnostico_cie10}}
        q-item-label(caption='') Información
        q-item-label.text-weight-medium Tipo de mezcla: {{paciente.tipo_mezcla}}
mixin CardKid
  q-card.q-mx-auto.transparent(
    flat=''
    bordered=false
    style="max-width:200px"
  )
    img.q-mx-auto(
      src='@/assets/img/carnet/kid.png'
      style="max-width:275px; max-heigth:275px;"
    )
mixin CardKidMobile
  q-card.q-mx-auto.transparent(
    flat=''
    bordered=false
    style="max-width:200px"
  )
    img.q-mx-auto(
      src='@/assets/img/carnet/kid-mobile.png'
      style="max-width:275px; max-heigth:275px;"
    )

mixin CardInfo
  div.full-width.text-center
    | *La información de los medicamentos proviene de centros de mezcla subrogados

mixin TableInfo
  q-markup-table.card(
    separator='cell'
  )
    thead.bg-yellow-2
      tr
        th.text-center(
        ) Genérico
        th.text-center(
        ) Consumo
        th.text-center(
        ) Cantidad
        th.text-center(
        ) Tipo
        th.text-center(
        ) Estatus
    tbody
      template(
        v-for='prescription in carnet.carnet'
        v-if='prescription.tipo !== "Instrumental Médico"'
      )
        tr
          // td.text-center {{prescription.id_prescripcion}}
          td.text-left.text-weight-medium(
          ) {{prescription.generico}}
          td.text-left.text-weight-medium(
          ) {{prescription.consumo}} {{prescription.unidad_medida}}
          td.text-center.text-weight-medium(
          ) {{prescription.cantidad_bolos}}
          td.text-left.text-weight-medium(
          ) {{prescription.tipo}}
          td.text-center.text-weight-medium(
            v-if='!prescription.motivo'
            :class='{"bg-red-1 text-negative": prescription.entregado === "NO ENTREGADO", "bg-green-11 text-green-8": prescription.entregado === "ENTREGADO"}'
          )
            span(
            ) {{prescription.entregado ? prescription.entregado : '-' | Capitalize}}
          td.text-center.text-weight-medium.bg-red-1.text-negative(
            v-else
            @click='prescription.expand = !prescription.expand'
          )
            span(
            ) {{prescription.entregado ? prescription.entregado : '-' | Capitalize}}
        tr(
          v-show='prescription.expand'
        )
          td.bg-white(
            colspan='100%'
            style='border-top: 2px solid red'
          )
            q-icon.text-negative(
              name='error_outline'
            )
            span.q-ml-md(
            ) {{prescription.motivo ? prescription.motivo : '-' | Capitalize}}

div
  /////////////
  // TEMPLATE DESKTOP
  /////////////
  .layout.q-mx-auto.q-mb-xl(
    v-if='$q.screen.gt.sm'
  )
    Header
    div.bg-carnet
      +GoBackButton
      .row.q-col-gutter-x-xl.q-col-gutter-y-md
        .col-10.q-col-gutter-y-lg
          .row.q-col-gutter-x-lg.q-col-gutter-y-md
            .col-5
              +Card1
            .col-5
              +Card2
            .col-2
              +Card3
          .row.q-col-gutter-x-lg.q-col-gutter-y-md
            .col-7
              +Card4
            .col-5
              +Card5
        .col-2
          +CardKid
      .q-mt-xs.q-pb-lg
        +CardInfo
    q-list.q-mb-lg.card.shadow-8(
      v-for='(carnet, i) in carnets'
      :key='i'
      bordered=''
    )
      q-expansion-item.card.bg-grey-2(
        group='carnets'
        icon='explore'
      )
        template(
          v-slot:header=''
        )
          .col
            q-item-section
              p.no-margin Unidad de atención
              p.no-margin.text-grey-7.text-weight-bold(
              ) {{carnet.denominacion_unidad_atencion ? carnet.denominacion_unidad_atencion : '-'}}
                br
                | {{carnet.unidad_medica_atencion ? carnet.unidad_medica_atencion : '-'}}
          .col
            q-item-section
              p.no-margin(
              ) Médico(a)
              p.no-margin.text-grey-7.text-weight-bold(
              ) {{carnet.medico ? carnet.medico : '-'}}
          .col
            q-item-section
              p.no-margin(
              ) Cama
              p.no-margin.text-grey-7.text-weight-bold(
              ) {{carnet.cama && carnet.cama != 0 ? carnet.cama : '-'}}
          .col
            q-item-section
              p.no-margin(
              ) Fecha
              p.no-margin.text-grey-7.text-weight-bold(
              ) {{`${carnet.fecha_prescripcion ? carnet.fecha_prescripcion : '-'}` | DateTime}}
        +TableInfo
  /////////////
  // TEMPLATE MOBILE
  /////////////
  div(
    v-if='$q.screen.lt.md'
  )
    Header.q-mx-md
    div.bg-carnet-mobile
      .row
        .col-12
          +GoBackButton
        .col-12
          +CardKidMobile
    div.bg-mobile.q-px-md
      .row(
        style='min-height: 10hv'
      )
        .col-12.text-center.q-mt-lg(
        ) Datos de paciente
        .col-12.text-center.q-mb-md
          div(
            v-show='card'
          )
            img.q-mx-xs(
              src="@/assets/img/carnet/rectangle1.png"
              @click='card = true'
            )
            img.q-mx-xs(
              src="@/assets/img/carnet/rectangle2.png"
              @click='card = false'
            )
          div(
            v-show='!card'
          )
            img.q-mx-xs(
              src="@/assets/img/carnet/rectangle2.png"
              @click='card = true'
            )
            img.q-mx-xs(
              src="@/assets/img/carnet/rectangle1.png"
              @click='card = false'
            )
    div.bg-mobile.q-px-md
      .row.q-gutter-y-md
        .col-12(
          v-show='card'
        )
          +Card1
        .col-12(
          v-show='card'
        )
          +Card2
        .col-12(
          v-show='!card'
        )
          +Card3
        .col-12
          +Card6
      .q-py-lg
        +CardInfo
    div.bg-mobile
      q-list.q-mb-lg.card.shadow-8(
        v-for='(carnet, i) in carnets'
        :key='i'
        bordered=''
      )
        q-expansion-item.card.bg-grey-2(
          group='carnets'
          icon='explore'
        )
          template(
            v-slot:header=''
          )
            .col-8
              q-item-section
                p.no-margin(
                ) {{carnet.denominacion_unidad_atencion ? carnet.denominacion_unidad_atencion : '-'}}
                  br
                  | {{carnet.unidad_medica_atencion ? carnet.unidad_medica_atencion : '-'}}
            .col-3
              q-item-section
                p.no-margin(
                ) {{`${carnet.fecha_prescripcion ? carnet.fecha_prescripcion : '-'}` | DateTime}}
          q-card.q-px-sm
            .row.q-pb-md.q-pt-sm
              .col-8
                q-item-section
                  p.no-margin(
                  ) Medico(a)
                    br
                    | {{carnet.medico ? carnet.medico : '-'}}
              .col-4
                q-item-section
                  p.no-margin.text-right(
                  ) Cama
                    br
                    | {{carnet.cama && carnet.cama != 0 ? carnet.cama : '-'}}
            +TableInfo.q-ma-lg
</template>

<script>
import ApiMongoService from '@/boot/services/api.mongo.service'
import Header from './components/Header.vue'
import { CARNET } from '@/boot/endpoints/carnet'
import moment from 'moment'
export default {
  components: {
    Header
  },
  data () {
    return {
      paciente: JSON.parse(atob(this.$route.params.patient)),
      carnets: [],
      card: true
    }
  },
  mounted () {
    this.setPatient(this.paciente)
  },
  methods: {
    setPatient (patient) {
      this.$q.loading.show({
        message: 'Cargando carnet de paciente'
      })
      ApiMongoService.get(CARNET, patient)
        .then(response => response.json())
        .then((data) => {
          this.carnets = data.map(carnet => {
            carnet.carnet.sort(function (a, b) {
              if (a.id_prescripcion === b.id_prescripcion) return (a.tipo < b.tipo) ? 1 : (a.tipo > b.tipo) ? -1 : 0
              else return (a.id_prescripcion < b.id_prescripcion) ? -1 : 1
            })
            carnet.carnet = carnet.carnet.map((c) => {
              c.expand = false
              return c
            })
            return carnet
          })
          this.carnets.sort((a, b) => {
            a = moment(a.fecha_prescripcion, 'YYYY-MM-DD hh:mm')
            b = moment(b.fecha_prescripcion, 'YYYY-MM-DD hh:mm')
            if (a > b) return -1
            if (a < b) return 1
            else return 0
          })
          this.paciente = data[0]
        })
        .finally(() => {
          this.$q.loading.hide()
        })
    },
    goBack () {
      this.$router.go(-1)
    },
    handleSwipe ({ evt, ...info }) {
      console.log(evt)
      console.log(info)
      this.swipe = info
    }
  }
}
</script>

<style lang="scss" scoped>
.layout{
  max-width: 1400px;
}
.bg-carnet{
  background-image: url(~assets/img/carnet/bg.png);
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
}
.bg-mobile{
  background-color: #FEF8EF
}
.bg-carnet-mobile{
  background-image: url(~assets/img/carnet/bg.png);
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
}
.q-expansion-item.q-item-type.bg-grey-2.q-expansion-item--expanded.q-expansion-item--standard{
  background: $amber-2!important;
}
</style>

<style lang="sass">
.carnet-header-table
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: $yellow-2
</style>
