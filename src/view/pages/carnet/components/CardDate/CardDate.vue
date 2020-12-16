<template lang="pug">
  q-card.card.q-py-sm.shadow-8.full-height
    q-card-section.row
      q-card-section.q-mx-md.col-5.text-center
        q-date(v-model='date_prescription', minimal, :style='objectStyle')
      q-card-section.col-6
        .flex.justify-between
          .q-mx-md Hola
          q-btn.btn-fixed-width(
            align='left',
            style='color: #9d2449',
            flat, rounded,
            label='Añadir Registro',
            icon-right='note_add')
    .q-mx-md
      TableInfo(:data='data')
</template>

<script src="./CardDate.js"></script>
