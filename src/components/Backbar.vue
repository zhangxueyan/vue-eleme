<template>
  <div class="back-bar">
   <span @click = "goBack()">返回</span>
  </div>
</template>

<script>
import router from '../router'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
  	goBack(){
  		router.go(-1)
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.back-bar{
	width:100%;
	height:0.8rem;
    background: #0096ff;
    position: fixed;
    left:0;
    top:0;
    span{
    	font-size:0.3rem;
    	color:#fff;
    	line-height:0.8rem;
    	position:absolute;
    	left:0.2rem;
    	top:0;
    }
}
</style>
