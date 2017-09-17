<template>
  <div class="home" v-if="falseBussinessbrief">
    <div class="home-top">
       <div class="home-txt clearfix">
    		<p class="home-pos"><i class="iconfont icon-dingwei"></i>北京市朝阳区</p>
    		<p class="home-log">登录</p>
       </div>
       <div class="home-sea">
       	<input type="text" placeholder="搜索商家、商品">
       </div>
       <p class="home-key">
        <span>辣鸭脖</span><span>辣鸭脖</span><span>辣鸭脖</span><span>辣鸭脖</span><span>辣鸭脖</span><span>辣鸭脖</span><span>辣鸭脖</span>
       </p>
    </div>
    <div class="banner">
    	<swiper :options="swiperOption" ref="mySwiper">
    		<!-- slides -->
    		<swiper-slide><img src="../assets/images/yd_01.jpg" alt=""></swiper-slide>
    		<swiper-slide><img src="../assets/images/yd_02.jpg" alt=""></swiper-slide>
    		<!-- Optional controls -->
    		<div class="swiper-pagination"  slot="pagination"></div>
    	</swiper>
    </div>
    <div class="sell-list">
    	<h2>推荐商家</h2>
    	<ul class="sell-ul">
    		<li class="sell-li clearfix" v-for="item in falseBussinessbrief">
    		    <router-link :to="{name:'detail',params:{id:item.id}}">
	    			<div class="sell-pic"><img src="../assets/images/yd_03.jpg" alt=""></div>
	    			<div class="sell-txt fl">
	    				<p>{{item.shop_name}}</p>
	    				<p>{{item.shop_rating}}分</p>
	    				<p>{{item.start_send}}元起送</p>
	    			</div>
	    			<div class="sell-txt fr">
	    				<p><span v-if="item.bao">保</span><span v-if="item.piao">票</span><span v-if="item.zhun">准</span></p>
	    				<p><span v-if='item.on_time'>准时达</span><span v-if="item.fengniao">蜂鸟专送</span></p>
	    				<p>{{item.distance}}米/{{item.estimate_time}}分钟</p>
	    			</div>
    		    </router-link>
    		</li>
    	</ul>
    </div>
    <Fixedbar></Fixedbar>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapState, mapGetters,mapActions } from 'vuex'
import Fixedbar from '../components/Fixedbar'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your home',
      swiperOption: {
          autoplay: 3000,
          pagination : '.swiper-pagination',
          paginationClickable :true
      }
    }
  },
  created(){
  	console.log(this.falseBussinessbrief)
  },
  components: {
    swiper,
    swiperSlide,
    Fixedbar
  },
  computed:{
  	...mapState([
  		'falseBussinessbrief'
  		])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
@import "../assets/css/swiper-3.4.2.min.css";
.fl{
	float: left;
}
.fr{
	float: right;
}
.home-top {
	background:#0097ff;
	padding:0.2rem 0.2rem 0;
	.home-txt{
		height: 0.36rem;
		.home-pos{
			width: 5.0rem;
			font-size:0.2rem;
			color: #fff;
			line-height:0.36rem;
			float:left;
			.icon-dingwei{
				color: #fff;
			}
		}
		.home-log{
			width: 1.0rem;
			font-size:0.2rem;
			color: #fff;
			text-align:right;
			line-height:0.36rem;
			float:left;	
		}
	}
	.home-sea{
		input{
			width:100%;
			height:0.6rem;
			border-radius:0.3rem;
			font-size:0.22rem;
			color: #666;
			text-align:center;
		}
	}
	.home-key {
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		span{
			font-size: 0.24rem;
			color: #fff;
			padding:0 0.05rem;
		}
	}
}
.banner img{
	display: block;
	width:100%;
}
.sell-list{
	padding:0 0.2rem;
	h2{
		font-size:0.3rem;
		color: #000;
		line-height:0.6rem;
	}
	.sell-li{
		margin-top:0.2rem;
		.sell-pic{
			float:left;
			width: 1.3rem;
			height: 1.1rem;
			img{
				display: block;
				width:100%;
			}
		}
		.sell-txt{
			font-size:0.22rem;
			color: #000;
		}
		.fr{
			text-align:right;
		}
	}
}
</style>
