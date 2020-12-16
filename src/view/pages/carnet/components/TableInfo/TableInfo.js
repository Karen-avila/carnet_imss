export default {
  data () {
    return {
      obj: {
        days: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
        daysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
      },
      separator: 'cell',
      columns: [
        {
          name: 'generico',
          required: true,
          label: 'Genérico',
          align: 'center',
          field: row => row.generico,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'fecha_test',
          required: true,
          label: 'fecha test',
          align: 'center',
          field: row => row.fecha_test,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'consumo',
          required: false,
          label: 'Consumo',
          align: 'center',
          field: row => row.consumo,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'cantidad',
          required: false,
          label: 'Cantidad',
          align: 'center',
          field: row => row.cantidad_bolos,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'tipo',
          required: false,
          label: 'Tipo',
          align: 'center',
          field: row => row.tipo,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'entregado',
          required: false,
          label: 'Entregado',
          align: 'center',
          field: row => row.entregado ? row.entregado : '',
          format: val => `${val}`,
          sortable: true
        }
      ]
    }
  },
  props: ['data']
}
