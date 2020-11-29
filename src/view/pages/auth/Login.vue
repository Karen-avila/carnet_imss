<template lang="pug">
  div
    // FORM MIXIN
    mixin form
      h5.text-primary.text-weight-medium.text-center.q-my-md(
      ) Inicio de sesión
      h6.text-weight-bold.text-subtitle1.q-my-md.text-center(
      ) Consulta el estatus del tratamiento oncológico que lleva tu hija o hijo en el IMSS.
      div(
        v-bind:class='{ show: errors.length }'
      )
        p.text-negative.text-center.text-weight-bold(
          v-for='(error, i) in errors'
          :key='i'
        ) {{ error }}
      q-form.q-mt-lg(
        @submit.prevent='autenticacion(form)'
      )
        label.text-weight-bold CURP ó matrícula
        q-input.q-mt-none(
          v-model='form.username'
          dense=''
          outlined=''
          placeholder='18 dígitos ó matrícula'
          :rules='[val => !!val || "Este campo es obligatorio"]'
        )
        label.text-weight-bold Contraseña
        q-input.q-mt-none(
          v-model='form.password'
          dense=''
          outlined=''
          placeholder='Mínimo 8 caracteres'
          :type='form.isPwd ? "password" : "text"'
          :rules="[val => !!val || 'Este campo es obligatorio']"
        )
          template(
            v-slot:append=''
          )
            q-icon.cursor-pointer(
              :name="form.isPwd ? 'visibility_off' : 'visibility'"
              @click='form.isPwd = !form.isPwd'
            )
        vue-recaptcha.q-mt-md(
          ref="recaptcha"
          sitekey='6LfRkssZAAAAAKCmzP4ncb7zoprDvQgLg_8XbNI2'
          :loadrecaptchascript='true'
          @verify="onVerify"
          @expired="onExpired"
        )
        div.q-mt-lg.full-width.text-center
          q-btn.text-weight-bold.text-capitalize.q-py-sm(
            type='submit'
            color='accent'
            outline=''
            style='min-width: 170px'
            :loading='authenting'
          ) Acceder
            template(
              v-slot:loading=''
            )
              q-spinner.on-left(
              )
              | Verificando...
    /////////////
    // TEMPLATE DESKTOP
    /////////////
    div.bg-page(v-if='$q.screen.gt.sm')
      div.q-mx-md.q-mx-auto.q-px-min-width(
        style="max-width:1300px"
      )
        .row.bg-login(
            style="min-height:85vh"
          )
          .col-5
            h5.text-secondary.text-weight-bold.q-mb-sm.q-mt-xl(
            ) Oncología Pediátrica
            h4.text-primary.text-weight-medium.q-my-sm(
            ) “La detección temprana del cáncer puede salvar vidas”
          .col-7.self-center
            q-card.card.login-card.q-mx-auto.q-pt-md.q-pb-md.shadow-12(
              style="max-width: 656px"
            )
              q-card-section.q-mx-auto(
                style="max-width: 460px"
              )
                +form
    /////////////
    // TEMPLATE MOBILE
    /////////////
    .bg-page(v-if='$q.screen.lt.md')
      .row.q-mx-auto(
        style='max-width:300px'
      )
        .col.text-center
          .text-h5.text-secondary.text-weight-bold.q-mt-lg(
          ) Oncología Pediátrica
          .text-h5.text-primary.text-weight-bold.q-mt-md(
          ) “La detección temprana del cáncer puede salvar vidas”
      .row.q-mx-auto.bg-login-mobile(
        style='min-height:25vh;'
      )
      .row
        .col
          q-card.card
            q-card-section.q-mx-auto
              +form
      .row.q-mx-auto(
        style='min-height:5vh;'
      )
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import VueRecaptcha from 'vue-recaptcha'
export default {
  components: { VueRecaptcha },
  data () {
    return {
      form: {
        username: '',
        password: '',
        isPwd: true,
        recaptcha: false
      }
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    }),
    ...mapGetters([
      'authenting'
    ])
  },
  beforeMount () {
    this.$store.dispatch('logout')
  },
  mounted () {
    if (process.env.DEBUGG) {
      this.form.username = '00110011'
      // this.form.username = 'AABB010101HDFBMNA0'
      this.form.password = '00110011'
      // this.form.password = 'APELLIAvTv'
    }
  },
  methods: {
    onVerify (response) {
      this.form.recaptcha = response
    },
    onExpired () {
      this.form.recaptcha = false
    },
    autenticacion (form) {
      this.$store.dispatch('logout')
      if (!this.form.recaptcha) {
        this.$store
          .dispatch('sendError', 'Valida el reCaptcha')
        return 0
      }
      if (this.form.username.length > 17) {
        this.$store
          .dispatch('login', `username=${form.username}|APO&password=${form.password}|APO&grant_type=password&scope=read`)
          .then((data) => {
            this.$router.push({ name: 'patients', params: { form: btoa(JSON.stringify({ form: null })) } })
          })
      } else {
        this.$store
          .dispatch('login', `username=${form.username}|ECE&password=${form.password}|${form.username}&grant_type=password&scope=read`)
          .then((data) => {
            this.$router.push({ name: 'search' })
          })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.bg-page
  background-image: linear-gradient(0deg, rgba(249,247,234,1) 0%, rgba(249,247,234,1) 30%, rgba(255,255,255,1) 30%, rgba(255,255,255,1) 100%)
.bg-page-mobile
  background-image: linear-gradient(0deg, rgba(249,247,234,1) 0%, rgba(249,247,234,1) 60%, rgba(255,255,255,1) 60%, rgba(255,255,255,1) 100%)
.bg-login
  background-image: url(~assets/img/auth/login/login.png);
  background-position: 0% 50%;
  background-size: contain;
  background-repeat: no-repeat;
.bg-login-mobile
  background-image: url(~assets/img/auth/login/login-mobile.png);
  background-position: 0% 0%;
  background-size: cover;
  background-repeat: no-repeat;
.login-card
  max-width: 600px
</style>
