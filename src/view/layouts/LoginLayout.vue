<template lang="pug">
  q-layout(view='hHh lpR fff')
    NavBar
    q-page-container
      router-view
    Footer
</template>

<script>
import NavBar from '@/view/components/layout/NavBar.vue'
import Footer from '@/view/components/layout/Footer.vue'
export default {
  components: {
    NavBar,
    Footer
  },
  data () {
    return {
    }
  }
}
</script>
