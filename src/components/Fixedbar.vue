<template>
  <div class="fixed">
  	<ul class="fixed-ul clearfix">
  		<li class="fixed-li">
  			<router-link :to="{name:'home'}">外卖</router-link>
  		</li>
  		<li class="fixed-li">
  		    <router-link :to="{name:'order'}">订单</router-link>
  		</li>
  		<li class="fixed-li">
  			<router-link :to="{name:'mine'}">我的</router-link>
  		</li>
  	</ul>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'fixed',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.fixed{
	width:6.4rem;
	padding:0 0.2rem;
	background:#fff;
	position: fixed;
	left:50%;
	margin-left:-3.2rem;
	bottom:0;
	z-index:100;
	.fixed-li{
		width:2.0rem;
		float:left;
		a{  display:block;
			font-size:0.24rem;
			font-weight:bold;
			color: #000;
			text-align:center;
			line-height:0.9rem;
		}
	}
}
</style>
