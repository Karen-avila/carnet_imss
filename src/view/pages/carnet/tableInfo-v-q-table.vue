<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td class="text-center text-weight-medium" v-if="!props.row.motivo"
          :class="{&quot;bg-red-1 text-negative&quot;: prescription.entregado === &quot;NO ENTREGADO&quot;, &quot;bg-green-11 text-green-8&quot;: prescription.entregado === &quot;ENTREGADO&quot;}">
          <span>{{props.row.entregado ? props.row.entregado : &apos;-&apos; | Capitalize}}</span>
        </q-td>
        <q-td class="text-center text-weight-medium bg-red-1 text-negative" v-else="v-else"
          @click="props.row.expand = !propw.row.expand">
          <span>{{props.row.entregado ? props.row.entregado : &apos;-&apos; | Capitalize}}</span>
        </q-td>

        </q-tr>
      </template>
    </q-table>
  </div>
</template>

columns: [
        {
          name: 'Genérico',
          required: false,
          label: 'Genérico',
          align: 'center',
          field: row => row.generico,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'Consumo',
          required: false,
          label: 'Consumo',
          align: 'center',
          field: row => `${row.consumo} ${row.unidad_medida}`,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'Cantidad',
          required: false,
          label: 'Cantidad',
          align: 'center',
          field: row => row.cantidad_bolos,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'Tipo',
          required: false,
          label: 'Tipo',
          align: 'center',
          field: row => row.tipo,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'Entregado',
          required: false,
          label: 'Entregado',
          align: 'center',
          field: row => row.entregado? row.entregado : '',
          format: val => `${val}`,
          sortable: true
        },

      ],
