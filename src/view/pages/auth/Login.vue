<template lang="pug">
  div.q-mx-md.q-mx-auto(style="max-width:1439px")
    .row.bg-login(style="min-height:85vh")
      .col-5
        h5.text-secondary Oncología Pediátrica
        h4.text-primary “La detección temprana del cáncer puede salvar vidas”
      .col-6.self-center
        q-card.login-card.q-mx-auto.q-pt-md.q-pb-xl.shadow-12(style="max-width: 656px")
          q-card-section.q-mx-auto(style="max-width: 460px")
            h5.q-my-md.text-center Inicio de sesión
            h6.text-subtitle1.q-my-md.text-center Consulta el estatus del tratamiento oncológico que lleva tu hija o hijo en el IMSS.
            div(v-bind:class='{ show: errors.length }')
              p.text-negative.text-center.text-weight-bold(v-for='(error, i) in errors', :key='i')
                | {{ error }}
            q-form.q-mt-lg(
              @submit.prevent='autenticacion(form)'
            )
              label CURP ó matrícula
              q-input.q-mt-none(
                dense=''
                outlined=''
                v-model='form.username'
                placeholder="18 dígitos ó carnet"
                :rules="[val => !!val || 'Este campo es obligatorio']"
              )
              label Contraseña
              q-input.q-mt-none(
                dense=''
                v-model='form.password'
                outlined=''
                placeholder="Mínimo 8 caracteres"
                :type="form.isPwd ? 'password' : 'text'"
                :rules="[val => !!val || 'Este campo es obligatorio']"
              )
                template(v-slot:append='')
                  q-icon.cursor-pointer(:name="form.isPwd ? 'visibility_off' : 'visibility'" @click='form.isPwd = !form.isPwd')
              span.text-blue-10 ¿Olvidaste tu contraseña?
              vue-recaptcha.q-mt-md(
                ref="recaptcha"
                sitekey='6LfRkssZAAAAAKCmzP4ncb7zoprDvQgLg_8XbNI2'
                :loadrecaptchascript='true'
                @verify="onVerify"
                @expired="onExpired"
              )
              div.q-mt-lg
                q-btn.text-capitalize(
                  :loading='authenting'
                  type='submit'
                  color='accent'
                  outline=''
                  style='min-width: 170px'
                )
                  | Acceder
                  template(v-slot:loading='')
                    q-spinner.on-left
                    | Verificando...
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
      console.log(process.env.AUTHENDPOINT)
      console.log(process.env.MONGOENDPOINT)
      console.log(process.env.DEBUGG)
      this.form.username = '00110011'
      this.form.password = '00110011'
    } else console.log('PRODUCTION')
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
            this.$router.push({ name: 'carnet' })
          })
      } else {
        this.$store
          .dispatch('login', `username=${form.username}|ECE&password=${form.password}|${form.password}&grant_type=password&scope=read`)
          .then((data) => {
            this.$router.push({ name: 'carnet' })
          })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.login-card
  max-width: 600px
.bg-login
  background-image: url(~assets/img/auth/login/login.jpg);
  background-position: left;
  background-size: contain;
  background-repeat: no-repeat;
</style>
