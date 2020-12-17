<template lang="pug">
mixin unidad_atencion
  label.text-weight-bold Unidad de atención:
  q-select(
    outlined=''
    dense=''
    v-model='form.unidad_atencion'
    placeholder='Unidad de atención'
    use-input=''
    hide-selected=''
    fill-input=''
    input-debounce='0'
    :options='options.unidades_atencion'
    @filter='filterFndUnidadMedica'
  )
    template(
      v-slot:no-option=''
    )
      q-item
        q-item-section.text-grey(
        ) No hay coincidencias

mixin medico
  label.text-weight-bold Médico (a)*:
  q-select(
    outlined=''
    dense=''
    v-model='form.medico'
    placeholder='Médico'
    use-input=''
    hide-selected=''
    fill-input=''
    input-debounce='0'
    :options='options.medicos'
    @filter='filterFndMedico'
  )
    template(
      v-slot:no-option=''
    )
      q-item
        q-item-section.text-grey(
        ) No hay coincidencias

mixin cama
  label.text-weight-bold Cama:
  q-input(
    v-model="form.cama",
    dense="",
    outlined="",
    placeholder="Cama"
  )

mixin fecha_prescripcion
  label.text-weight-bold Fecha de prescripción*:
  q-input(filled='', v-model='form.fecha_prescripcion', mask='date', :rules="['date']")
    template(v-slot:append='')
      q-icon.cursor-pointer(name='event')
        q-popup-proxy(ref='qDateProxy', transition-show='scale', transition-hide='scale')
          q-date(v-model='form.fecha_prescripcion')
            .row.items-center.justify-end
              q-btn(v-close-popup='', label='Cerrar', color='primary', flat='')
mixin generico
  label.text-weight-bold Genérico*:
  q-input(
    v-model="form.generico",
    dense="",
    outlined="",
    placeholder="Genérico"
  )
mixin consumo
  label.text-weight-bold Consumo*:
      q-input(
        v-model="form.numerico",
        dense="",
        outlined="",
        placeholder="Numérico"
      )
mixin unidad_medida
  label.text-weight-bold Unidad de medida*:
      q-input(
        v-model="form.unidad_medida",
        dense="",
        outlined="",
        placeholder="Unidad de medida"
      )
mixin cantidad
  label.text-weight-bold Cantidad*:
  q-input(
    v-model="form.cantidad",
    dense="",
    outlined="",
    placeholder="Cantidad"
  )
mixin tipo
  label.text-weight-bold Tipo*:
  q-input(
    v-model="form.tipo",
    dense="",
    outlined="",
    placeholder="Tipo"
  )
mixin estatus_aplicacion
  label.text-weight-bold Estatus de aplicación :
  q-input(
    v-model="form.estatus_aplicacion",
    dense="",
    outlined="",
    placeholder="Estatus de aplicación"
  )
mixin fecha_aplicacion
  label.text-weight-bold Fecha de aplicación :
  q-input(
    v-model="form.fecha_aplicacion",
    dense="",
    outlined="",
    placeholder="Fecha de aplicación"
  )

//Aqui comienza la vista del formulario

q-dialog(v-model='alert')
  q-card.q-px-lg(style='max-height: 100vh')
    .layout.q-mx-auto.q-mb-xl
      q-form.q-col-gutter-y-sm(@submit="onSubmit", @reset="onReset")
        h6.q-my-md.text-light-green-10.text-weight-bold() &nbsp; &nbsp; &nbsp;Nuevo Registro {{computedDialog}}
        .row.q-col-gutter-x-md.q-col-gutter-y-md.q-px-sm
          .col-12.self-end
            +unidad_atencion
          .col-6.self-end
            +medico
          .col-6.self-end
            +cama
          .col-6.self-end
            +fecha_prescripcion
          .col-6.self-end
          .col-12.self-end
            q-separator(
              color='grey-5'
            )
          .col-4.self-end
            +generico
          .col-4.self-end
            +consumo
          .col-4.self-end
            +unidad_medida
          .col-6.self-end
            +cantidad
          .col-6.self-end
            +tipo
          .col-6.self-end
            +estatus_aplicacion
          .col-6.self-end
            +fecha_aplicacion
    q-footer.q-pa-sm(style='position: relative')
      q-toolbar
        .q-gutter-xl
            q-btn(
              outline='',
              align='right',
              style='color: #E0BC81',
              label='Cancelar')
            q-btn(
              outline='',
              align='right',
              style='color: #9d2449',
              label='Agregar Registro')
</template>

<script src="./MedForm.js"></script>
<style lang="sass">
.q-layout__section--marginal
    background-color: #F1F1F1
</style>
