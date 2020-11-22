<template lang="pug">
  q-header(
    elevated=''
    style="border-color:#282a2b; background-color:#0C231E;"
  )
    q-toolbar.q-header-toolbar.q-mx-auto
      a(href='https://www.gob.mx')
        img(
          src='https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg'
          style='height: 29px;'
        )
      q-space
      a(href='https://www.gob.mx/tramites')
        q-btn.text-capitalize.text-subtitle1(to="" stretch='' flat='' label='Trámites')
      a(href='https://www.gob.mx/gobierno')
        q-btn.text-capitalize.text-subtitle1.q-mr-sm(to="" stretch='' flat='' label='Gobierno')
      a(href='https://www.gob.mx/busqueda')
        q-btn(to="" flat='' round='' dense='' icon='search')
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss">
  .q-header-toolbar {
    max-width: 1170px;
    height: 60px;
  }
</style>
