<template>
  <div class="detai" v-if="falseBussinessInfo">
    <div class="detail-top">
    	<div class="clearfix">
    		<div class="detail-logo"></div>
    		<div class="detail-des">
    			<h2>{{business_info.shop_name}}</h2>
    			<p><span v-if="business_info.fengniao">蜂鸟配送/</span><span>{{business_info.estimate_time}}分钟送达/配送费￥</span><span>{{business_info.send_cost}}</span><br><span v-if="business_info.notice">公告：新店开张，优惠大酬宾</span></p>
    		</div>
    	</div>
    	<p class="detail-new">{{business_info.discount}}</p>
    </div>
    <div class="detail-wrap">
    	<dl class="detail-tab clearfix">
    		<dd @click = "showFood">商品</dd>
    		<dd @click = "showRating">评价</dd>
    	</dl>
    	<!-- 商家的详情部分食物部分 -->
    	<div class="detail-goods clearfix" v-if="isShowFood">
    		    <!-- 商家的详情部分食物左边 -->
    			<ul class="detail-left">
    				<li v-for = "(item,index) in business_info.commodity" @click="leftControlRightScroll(index)">
    					<h2>{{item.name}}</h2>
    				</li>
    			</ul>
    			<!-- 商家的详情部分食物右边 -->
    			<ul class="detail-right">
    				<li v-for = "(item,index) in business_info.commodity">
    					<h2>{{item.name}}</h2>
    					<div class="detail-singles">
    						<div v-for = "food in item.foods" class="detail-single clearfix">
    							<div class="food-pic">
    								<img src="../assets/images/yd_03.jpg" alt="">
    							</div>
    							<div class="food-txt">
    								<h3>{{food.name}}</h3>
    								<h4>{{food.tips}}</h4>
    								<h5>月售{{food.month_sales}},好评率{{food.satisfy_rate}}%</h5>
                                    <div class="add-remove clearfix">
	                                    <p class="single-pri">￥{{food.unit_price}}</p>
	                                    <div class="single-btns">
	                                    	<span class="single-btn red-btn">-</span>
	                                    	<span class="single-num">1</span>
	                                    	<span class="single-btn add-btn">+</span>
	                                    </div>
                                    </div>
    							</div>
    						</div>
    					</div>
    				</li>
    			</ul>
    	</div>
    	<!-- 商家的详情部分食物部分 -->
    	<div class="detail-rating" v-if="isShowRating">
    		<div class="rating-top clearfix">
    			<div class="rating-total">
    				<h2>4.5</h2>
    				<p>综合评价<br>高于周边商家30%</p>
    			</div>
    			<div class="rating-detail">
    				<p>服务态度{{business_info.service_code}}</p>
                    <p>菜品评价{{business_info.foods_code}}</p>
                    <p>送达时间{{business_info.estimate_time}}</p>
    			</div>
    		</div>
    		<ul class="rating-list">
    			<li class="rating-li clearfix" v-for="item in business_info.evaluate">
    				<div class="rating-pic">
    				  <img src="../assets/images/yd_03.jpg" alt=""></div>
    				<div class="rating-txt">
    					<p>{{item.username}}</p>
    					<p>{{item.send_time}}分钟送达</p>
    					<p>{{item.evaluate_details}}</p>
    				</div>
    				<p class="rating-date">{{item.time}}</p>
    			</li>
    		</ul>
    	</div>
    </div>
    <!-- 购物车 -->
    <div class="shopping_car" v-if="isShowFood">
        <span class="gouwuche-box">
        	<i class="iconfont icon-gouwuche"></i>
        </span>
    	<h2>￥0<br><span>配送费￥{{business_info.send_cost}}</span></h2>
    	<p>去结算</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters,mapActions } from 'vuex'
export default {
  name: 'detai',
  data () {
    return {
      msg: 'Welcome to Your detai',
      business_info:'',
      isShowFood:false,
      isShowRating:true
    }
  },
  created(){
  	let id=this.$route.params.id;
  	//对应id的店铺信息赋值给 business_info 方便取里面的值
  	this.business_info = this.falseBussinessInfo[id]
  	console.log(this.business_info)
  },
  computed:{
  	...mapState([
  		'falseBussinessInfo'
  		])
  },
  methods:{
  	showFood(){
  		this.isShowFood = true
  		this.isShowRating = false
  	},
  	showRating(){
  		this.isShowFood = false
  		this.isShowRating = true
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.detail-top{
	width:100%;
	height:2.0rem;
	background:url(../assets/images/shop-logo.png) no-repeat center;
	background-size:cover;
	padding:0.2rem;
	.detail-logo{
		width:1.2rem;
		height:1.2rem;
		background:url(../assets/images/shop-logo.png) no-repeat center;
		background-size:contain;
		float:left;
	}
	.detail-des{
		float:left;
		color:#fff;
		margin:0.08rem 0 0 0.2rem;
		h2{
			font-size:0.36rem;
			font-weight:bold;
		}
		p{
			font-size:0.26rem;
		}
	}
	.detail-new{
		font-size:0.22rem;
		color: #fff;
	}
}
.detail-tab dd{
	width:3.2rem;
	float:left;
	line-height:0.6rem;
	font-size:0.3rem;
	color:#000;
	text-align:center;
}
.detail-goods{
		.detail-left{
			width:1.6rem;
			height:auto;
			background: #f1f1f1;
			float:left;
			li{
				line-height:0.8rem;
				padding-left:0.1rem;
				    border-bottom: 1px solid #ccc;
				h2{
					font-size:0.28rem;
					color:#000;
				}	
			}

		}
		.detail-right{
			width:4.8rem;
			height:auto;
			float:right;
			h2{
				font-size:0.3rem;
				color: #000;
				font-weight:bold;
				background: #f1f1f1;
				line-height:0.6rem;
				padding-left:0.1rem;
			}
			.detail-singles{
				.detail-single{
					padding:0.2rem 0;
					.food-pic{
						width:1.2rem;
						height:1.2rem;
						float:left;
						img{
							display: block;
							width:100%;
						}
					}
					.food-txt{
						width:3.6rem;
						font-size:0.22rem;
						float:left;
						padding-right:0.2rem;
						h3{
							font-size:0.3rem;
							font-weight:bold;
						}
						.add-remove{ 
							.single-pri{
								font-size:0.36rem;
								display:block;
								float:left;
								width:2.2rem;

							}
							.single-btns{
								display:block;
								float:right;
								width:1rem;
								.single-num{
									font-size:0.3rem;
									color:#000;
									font-weight:bold;
								}
								.single-btn{
									display:inline-block;
									width:0.3rem;
									line-height:0.3rem;
									font-size:0.36rem;
									border:1px solid red;
									border-radius:50%;
									text-align:center;
								}
							}
						}
					}
				}
			}
		}
}
.detail-rating{
	.rating-top{
		font-size:0.2rem;
		color:#000;
		.rating-total{
			width:2.0rem;
			float:left;
			border-right:1px solid #ccc;
			text-align:center;
			h2{
				font-size:0.3rem;
			}
		}
		.rating-detail{
			width:4.4rem;
			float:left;
			padding-left:0.2rem;
		}
	}
	.rating-list{
		.rating-li{
			padding:0.2rem 0;
			border-bottom:1px solid #f7f7f7;
			.rating-pic{
				width:1.0rem;
				height:1.0rem;
				float:left;
				img{
					display:block;
					width:100%;
				}
			}
			.rating-txt{
				width:4.0rem;
				float:left;
				p{
					font-size:0.2rem;
					color:#000;
				}
			}
			.rating-date{
				width:1.4rem;
				float:right;
				font-size:0.2rem;
				color:#000;
			}
		}
	}
}
.shopping_car{
	width:6.4rem;
	height:0.8rem;
	background:#3d3d3f;
	position: fixed;
	left:0;
	bottom:0;
	.gouwuche-box{
		display:block;
		width:1.0rem;
		height:1.0rem;
		background:#3190e8;
		border-radius:50%;
		position: absolute;
		left:0.1rem;
		top:-0.2rem;
		.icon-gouwuche{
			display:block;
			width:1.0rem;
			height:1.0rem;
			font-size:0.5rem;
			color:#ffffff;
			text-align: center;
			line-height: 1rem;
			position: absolute;
			left:0;
			top:0;
		}
	}
	h2{
		width:4.8rem;
		float:left;
		padding-left:1.25rem;
		font-size:0.28rem;
		color:#fff;
		span{
			font-size:0.2rem;
		}
	}
	p{
		width:1.6rem;
		float:left;
		font-size:0.28rem;
		color:#fff;
		line-height:0.8rem;
		background:#535356;
		text-align:center;
	}
}
</style>
