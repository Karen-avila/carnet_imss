<template lang="pug">
  q-card.card.q-py-sm.shadow-8.full-height
    q-card-section.row
      div.q-mx-xs.col-4.text-center
        q-date(v-model='date_prescription', minimal, :style='objectStyle')
      div.col-7.self-center
        .flex.justify-between.q-my-md
          label.text-uppercase.text-weight-bold {{'Información'}}
          q-btn.btn-fixed-width(
            align='left',
            style='color: #9d2449',
            flat, rounded,
            @click='isOpenDialog = true'
            label='Añadir Registro',
            icon-right='note_add')
        q-separator(
          color='grey-6'
          size='1px'
        )
        q-separator(
          color='secondary'
          size='.5rem'
          style='max-width:2.5rem'
        )
        .row.q-my-lg
          .col-4.q-pr-md
            label.text-weight-bold(
            ) Médico (a):
            q-select(
              outlined=''
              dense=''
              v-model='medico'
              placeholder='Selecciona la delegación'
              use-input=''
              hide-selected=''
              fill-input=''
              input-debounce='0'
            )
          .col-4.q-pr-md
            label.text-weight-bold {{'Unidad de atención :'}}
            div
              label.text-weight-medium {{'HG CMMN La Raza - Dr Gaudencio Gonzalez Garza'}}
          .col-4.q-pl-md
            label.text-weight-bold {{'Cama: '}}
            div
              label.text-weight-medium {{'HG CMMN La Raza - Dr Gaudencio Gonzalez Garza'}}
    .q-mx-md
      TableInfo(:data='data')
    MedForm(:dialogopens='isOpenDialog', @close-modal='isOpenDialog = false')
</template>
<script src="./CardDate.js"></script>
