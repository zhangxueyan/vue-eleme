<template>
  <div class="mine">
   <Backbar></Backbar>
   <p class="s-titl">我的</p>
   <p>{{msg}}</p>
   <Fixedbar></Fixedbar>
  </div>
</template>

<script>
import Backbar from '../components/Backbar'
import Fixedbar from '../components/Fixedbar'
export default {
  name: 'mine',
  data () {
    return {
      msg: 'Welcome to Your mine'
    }
  },
  components:{
  	Backbar,
  	Fixedbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.s-titl{
	width:3.2rem;
	line-height:0.8rem;
	font-size:0.3rem;
	text-align:center;
	color:#fff;
	position: fixed;
	left:50%;
	margin-left:-1.6rem;
	top:0;
}
.mine{
	padding-top:0.8rem;
	font-size:0.3rem;
	text-align:center;
	line-height:0.6rem;
}
</style>
