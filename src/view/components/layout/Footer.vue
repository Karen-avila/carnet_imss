<template lang="pug">
  q-footer(
    style='border-color:#13322B; background-color:#13322B'
  )
    q-toolbar.q-footer-toolbar.q-mx-auto.q-pt-lg.q-pb-lg
      .row
        .col-md-3.col-12
          img(
            src='https://framework-gb.cdn.gob.mx/landing/img/logoheader.svg'
            style='width:100%; max-width:240px'
          )
        .col-md-3.col-12
          p.text-subtitle2 Enlaces
          a(href='https://participa.gob.mx/')
            p.no-margin Participa
          a(href='https://www.gob.mx/publicaciones')
            p.no-margin Publicaciones Oficiales
          a(href='http://www.ordenjuridico.gob.mx/')
            p.no-margin Marco Juridico
          a(href='https://consultapublicamx.inai.org.mx/vut-web/')
            p.no-margin Plataforma Nacional de Transferencia
        .col-md-3.col-12
          p.text-subtitle2 ¿Qué es gob.mx?
          p.no-margin Es el portal único de trámites, información y participación ciudadana.
            a(href='https://www.gob.mx/que-es-gobmx') Leer más
          a(href='https://datos.gob.mx/')
            p.no-margin Portal de datos abiertos
          a(href='https://www.gob.mx/accesibilidad')
            p.no-margin Declaración de accesibilidad
          a(href='https://www.gob.mx/privacidadintegral')
            p.no-margin Aviso de privacidad integral
          a(href='https://www.gob.mx/privacidadsimplificado')
            p.no-margin Aviso de privacidad simplificado
          a(href='https://www.gob.mx/terminos')
            p.no-margin Términos y Condiciones
          a(href='https://www.gob.mx/terminos#medidas-seguridad-informacion')
            p.no-margin Política de seguridad
          a(href='https://www.gob.mx/sitemap')
            p.no-margin Mapa de sitio
        .col-md-3.col-12
          a(href='https://www.gob.mx/tramites/ficha/presentacion-de-quejas-y-denuncias-en-la-sfp/SFP54')
            p.text-subtitle2 Denuncia contra servidores públicos
          p Síguenos en
          a(href='https://www.facebook.com/gobmexico')
            q-icon.q-mr-sm(name='fab fa-facebook-f' size='xs')
          a(href='https://twitter.com/GobiernoMX')
            q-icon(name='fab fa-twitter' size='xs')
    q-toolbar.q-footer-pleca
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss">
  .q-footer-toolbar {
    max-width: 1170px;
    min-height: 320px;
  }
  .q-footer-pleca {
    background-color: #12322B;
    background-image: url(https://framework-gb.cdn.gob.mx/landing/img/pleca.svg);
    background-repeat: repeat-x;
  }
</style>
