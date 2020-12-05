<template lang="pug">
q-layout(
  view='hHh lpR fff'
)
  NavBar
  template(
    v-if='currentUser.pacientes'
  )
    q-toolbar.q-header-toolbar.q-mx-auto.bg-grey-2.text-black(
      style='margin-top:60px'
    )
      q-toolbar-title.text-subtitle2(
        :class='{"text-left": $q.screen.lt.md, "text-right": $q.screen.gt.sm}'
      )
        span.q-mr-md {{currentUser.nombrePersonal}}
        br(v-if='$q.screen.lt.md')
        span.text-weight-bold.text-caption.text-grey(
          v-if='currentUser.pacientes.length'
        ) Familiar
        span.text-weight-bold.text-caption.text-grey(
          v-else=''
        ) Personal de la salud
      q-btn.text-weight-bold(
        flat=''
        outline=''
        label='Cerrar sesion'
        color=''
        @click='onLogout'
      )
    q-page-container(
      :style='$q.screen.lt.md ? "padding-top: 0px;" : "padding-top: 20px;"'
      :class='$q.screen.gt.sm ? "q-pa-md" : ""'
    )
      transition(
        name='fade'
      )
        router-view
  Footer
</template>

<script>
import NavBar from '@/view/components/layout/NavBar.vue'
import Footer from '@/view/components/layout/Footer.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    NavBar,
    Footer
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'currentUser'
    ]),
    ...mapState({
      authenting: state => state.auth.authenting
    })
  },
  watch: {
    authenting: function (val) {
      // if (val) this.$q.loading.show({ message: 'Actualizando usuario' })
      // else this.$q.loading.hide()
    }
  },
  mounted () {
    if (!this.isAuthenticated) {
      this.$router.push({ name: 'login' })
    }
    // if (this.authenting && !this.currentUser.pacientes) {
    //   this.$q.loading.show({ message: 'Actualizando usuario' })
    // }
  },
  methods: {
    onLogout () {
      this.$store
        .dispatch('logout')
        .then(() => this.$router.push({ name: 'login' }))
    }
  },
}
</script>

<style lang="scss">
  .q-header-toolbar {
    max-width: 1439px;
    height: 60px;
  }
</style>
