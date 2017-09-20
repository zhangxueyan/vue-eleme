<template>
  <div class="order">
    <Backbar></Backbar>
    <p class="s-titl">订单</p>
    <ul class="order-list">
    	<li v-for="item in falseOrder" class="clearfix">
    		<div class="order-pic">
    			<img src="../assets/images/shop-logo.png" alt="">
    		</div>
    		<div  class="order-txt">
    		    <div class="order-txt-top clearfix">
    				<p class="fl">{{item.store_name}}<br>{{item.order_birth_time}}</p>
    				<p class="fr">{{item.order_state}}</p>
    			</div>
                <div class="order-txt-bot clearfix">
                	<p class="fl">{{item.order_brief_info}}</p>
                	<p class="fr">RMB{{item.order_price}}</p>
                </div>
    		</div>
    	</li>
    </ul>
    <Fixedbar></Fixedbar>
  </div>
</template>

<script>
import Backbar from '../components/Backbar'
import Fixedbar from '../components/Fixedbar'
import { mapState, mapGetters,mapActions } from 'vuex'
export default {
  name: 'order',
  data () {
    return {
      msg: 'Welcome to Your order'
    }
  },
  components:{
  	Backbar,
  	Fixedbar
  },
  computed:{
  	...mapState([
  		'falseOrder'
  		])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.fl{
	float:left;
}
.fr{
	float:right;
}
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
.order{
	padding-top:0.8rem;
	.order-list{
		li{
			padding:0.2rem 0.2rem;
			margin-top:0.3rem;
			border-bottom:0.2rem solid #F4F4F4;
		  .order-pic{
			width:1.0rem;
			height:1.0rem;
			float:left;
			img{
				display:block;
				width:100%;
			}
		  }
		  .order-txt{
			float:right;
			width:4.8rem;
			font-size:0.2rem;
			color:#000;
			.order-txt-top{
				border-bottom:1px solid #ccc;
				padding-bottom:0.2rem;
			}
			.order-txt-bot{
				line-height:0.6rem;
			}
		  }
		}
	}
}
</style>
