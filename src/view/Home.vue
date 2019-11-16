<style lang="scss">
.indexPage {
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div class="indexPage">
    <NavBar :height="'70px'"/>
    <MenuBar/>
    <ChartContent/>
  </div>
</template>
<script>
import NavBar from '../components/NavBar'
import MenuBar from '../components/MenuBar'
import ChartContent from '../components/ChartContent/page'
export default {
  components: {
    NavBar,
    MenuBar,
    ChartContent
  }
}
</script>