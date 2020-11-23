<template lang="pug">
q-layout(view='hHh lpR fff')
  NavBar
  template(v-if="currentUser.pacientes")
    q-toolbar.q-header-toolbar.q-mx-auto.bg-grey-2.text-black(
      style='margin-top:60px'
    )
      q-toolbar-title.text-subtitle2.text-right
        | {{currentUser.nombrePersonal}}
        span.text-caption.text-grey.q-ml-sm(v-if='currentUser.pacientes.length')
          | Familiar
        span.text-caption.text-grey.q-ml-sm(v-else='')
          | Personal de la salud
      q-btn(flat='', outline='', label='Cerrar sesion', color='secondary', @click='onLogout')
    q-page-container(style='padding-top: 20px;')
      router-view
  template(v-if="!currentUser.pacientes")
    .layout.q-mb-xl.q-mx-auto(style='max-width: 1400px; margin-top:10rem;')
      q-spinner.q-mr-lg(color='primary', size='md')
      span.text-h6 Cargando información...
  Footer
</template>

<script>
import NavBar from '@/view/components/layout/NavBar.vue'
import Footer from '@/view/components/layout/Footer.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    NavBar,
    Footer
  },
  data () {
    return {
    }
  },
  methods: {
    onLogout () {
      this.$store
        .dispatch('logout')
        .then(() => this.$router.push({ name: 'login' }))
    }
  },
  mounted () {
    if (!this.isAuthenticated) {
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'currentUser'
    ])
  }
}
</script>

<style lang="scss">
  .q-header-toolbar {
    max-width: 1439px;
    height: 60px;
  }
</style>
