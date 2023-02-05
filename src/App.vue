<template>
  <Header></Header>
  <router-view></router-view>
  <Footer></Footer>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import { defineComponent } from 'vue';

export default defineComponent({

  name: 'App',
  components:{Header,Footer}

});
</script>
<style lang="less">

</style>
