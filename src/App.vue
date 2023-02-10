<template>
  <Header></Header>
  <router-view></router-view>
  <Footer v-if="route.path !== '/mymusic'"></Footer>
  <Budio></Budio>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';
import Budio from './components/audio.vue';
import { useStore } from 'vuex';


import { defineComponent,reactive } from 'vue';


export default defineComponent({

  name: 'App',
  components:{Header,Footer,Budio},
  setup(){
    const route = useRoute()
    const store = useStore()

    // watch(route,(newValue,oldValue)=>{
    //   // console.log(newValue);
    // })


    return{
      route,
      store
    }
  },
  mounted(){
    //获取用户信息
    this.store.dispatch('getUserInfo')
  }

});
</script>
<style lang="less">

</style>
