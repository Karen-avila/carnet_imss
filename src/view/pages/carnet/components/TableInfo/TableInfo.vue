<template lang="pug">
    q-table.my-sticky-header-table(:data='data', :columns='columns', row-key='name', binary-state-sort='', :separator='separator')
      template(v-slot:body='props')
        q-tr(:props='props')
          q-td.text-left.text-weight-medium(key='generico', :props='props')
            | {{ props.row.generico }}
          q-td.text-left.text-weight-medium(key='fecha_test', :props='props')
            .row.justify-evenly
              | {{ props.row.fecha_test }}
              .q-ml-xs
                q-icon(name='far fa-calendar-alt' size='xs')
            q-popup-proxy(ref='qDateProxy', transition-show='scale', transition-hide='scale')
              q-date(v-model='props.row.fecha_test', :locale="obj", first-day-of-week='1', mask='DD-MM-YYYY')
                .row.items-center.justify-end
                  q-btn(v-close-popup='', label='Cerrar', color='primary', flat='')
          q-td.text-left.text-weight-medium(key='consumo', :props='props')
            | {{ `${props.row.consumo} ${props.row.unidad_medida}`}}
          q-td.text-center.text-weight-medium(key='cantidad', :props='props')
            | {{ props.row.cantidad_bolos }}
          q-td.text-left.text-weight-medium(key='tipo', :props='props')
            | {{ props.row.tipo }}
          q-td.text-center.text-weight-medium(v-if='!props.row.motivo', :class='{"bg-red-1 text-negative": props.row.entregado === "NO ENTREGADO", "bg-green-11 text-green-8": props.row.entregado === "ENTREGADO"}')
            span {{props.row.entregado ? props.row.entregado : &apos;-&apos; | Capitalize}}
          q-td.text-center.text-weight-medium.bg-red-1.text-negative(v-else='v-else', @click='props.row.expand = !propw.row.expand')
            span {{props.row.entregado ? props.row.entregado : &apos;-&apos; | Capitalize}}
        q-tr(:props='props', v-show='props.row.expand')
          q-td.bg-white(colspan='100%', style='border-top: 2px solid red')
            q-icon.text-negative(name='error_outline')
            span.q-ml-md {{props.row.motivo ? props.row.motivo : &apos;-&apos; | Capitalize}}
</template>

<script src="./TableInfo.js"></script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: auto

  .q-table__top,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: $yellow-2

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0
  .q-table__bottom
    display: none
  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    display: 0px
</style>
