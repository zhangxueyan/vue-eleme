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
    	<div class="detail-goods clearfix" v-if="isShowFood" v-bind:style="{ height: computedContentHeight + 'px' }">
    		    <!-- 商家的详情部分菜单分类 -->
    			<ul class="detail-left" ref="businessLeft">
    				<li v-for = "(item,index) in business_info.commodity" @click="leftControlRightScroll(index)" :class='{active_ia:index == 0}'>
    					<h2>{{item.name}}<span class="left_red" v-if="reNub[item.type_accumulation]">{{ reNub[item.type_accumulation] }}</span></h2>
    				</li>
    			</ul>
    			<!-- 商家的详情部分单个菜品 -->
    			<ul class="detail-right" ref="ullist">
    				<li v-for = "(item,index) in business_info.commodity">
    					<h2 class="type_title">{{item.name}}</h2>
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
	                                    	<span class="single-btn red-btn" @click="reduce_food(food.one_food_id)" v-if="shoppingCarList[food.one_food_id]">-</span>
	                                    	<span class="single-num" v-if="shoppingCarList[food.one_food_id]">{{ shoppingCarList[food.one_food_id].count }}</span>
	                                    	<span class="single-btn add-btn" @click="add_food(item,food)">+</span>
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
    <!-- 底部固定购物车 结算处 -->
    <div class="shopping_car" v-if="isShowFood">
        <span class="gouwuche-box" @click="shoppingCarShow = !shoppingCarShow">
        	<i class="iconfont icon-gouwuche"></i>
        	<i v-if="allNub !== 0" class="gouwuche-num">{{ allNub }}</i>
        </span>
    	<h2>￥{{ totalPrice }}<br><span>配送费￥{{business_info.send_cost}}</span></h2>
    	<p @click="checkOut();shoppingCarShow = false">去结算</p>
    </div>
    <!-- 点击购物车图标  展示的购物列表 -->
    <div class="sp_lists" v-if="shoppingCarShow">
     <p><span class="sp-car">购物车</span><span class="sp-clear" @click = "shoppingCarList={};spChangeComputeAll();shoppingCarShow = false">清空</span></p>
     <ul>
     	<li v-for="(item,index) in shoppingCarList" :key="index" class="clearfix">
     		<p class="sp-list-l">{{item.name}}</p>
     		<div class="sp-list-r">
     			<span class="sp-price">￥{{ item.unit_price * item.count }}</span>
     			<span @click="reduce_food(item.one_food_id)" class="sp-red">-</span>
     			<span>{{item.count}}</span>
     			<span class="sp-add" @click="add_shopping_car(item.type_accumulation, item.type_name, item.name, item.one_food_id, item.unit_price)">+</span>
     		</div>
     	</li>
     </ul>
    </div>
    <!-- 透明遮罩 展示的购物列表显示||或者结算时候-->
    <div class="mask" v-if="shoppingCarShow||alertBoxShow"></div>
    <!-- 弹出层结算时候的 -->
    <div class="alert_box" v-if="alertBoxShow">
    	<p>支付确认</p>
    	<p class="con_info">需支付￥{{ allTotalPrice }}</p>
    	<div class="clearfix">
    		<p class="alert-cancel" @click = "alertBoxShow=false">取消</p>
    		<p class="alert-confirm" @click = "paySuccess()">支付</p>
    	</div>
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
      isShowFood:true,
      isShowRating:false,
      // 计算商品区域高度
      computedContentHeight: window.innerHeight - (window.innerWidth / 10 * 4.2),
      shoppingCarList:{},
      // 大类数量
      reNub: {},
      // 购物车总数
      allNub: 0,
      // 大类数量
      reNub: {},
      // 购物车总数
      allNub: 0,
      // 商品总价格
      totalPrice: 0,
      // 最终价格（加运费）
      allTotalPrice: 0,
      // 是否弹出支付窗口
      alertBoxShow: false,
      // 是否弹出购物车列表
      shoppingCarShow: false,
      // 是否弹出支付窗口
      alertBoxShow: false
    }
  },
  created(){
  	let id=this.$route.params.id;
  	//对应id的店铺信息赋值给 business_info 方便取里面的值
  	this.business_info = this.falseBussinessInfo[id];
  	// 窗口大小改变，改变商品列高度
    window.addEventListener('resize', this.watchHei, false);
    var _this = this;
    setTimeout(function(){
    	_this.init()
    },5000)
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
  	},
  	init(){
     this.rightControlLeftClass();
  	},
  	// 右列表控制左列表样式
	rightControlLeftClass(){
      // 左目录列表
      var leftUl = this.$refs.businessLeft;
      // 左目录的所有li
      var leftLI = leftUl.querySelectorAll("li");
      // 右商品列表
      var rightUl = this.$refs.ullist;
      var ti = rightUl.querySelectorAll('.type_title');
      // 定义当前滚动到的index值
      var asIndex = 0;
      // ↓ BUG（魅族自带浏览器 + UC无效果scroll不执行，安卓端chrome火狐正常 IOS 10.2正常)
      // 原因 某些浏览器不支持 forEach (UC,魅族自带,微信等) 改用 for 循环
      rightUl.addEventListener('scroll', () => {
        // 当前scrollTop
        var thisST = rightUl.scrollTop;
        console.log('scrolltop',thisST)
        // console.log('滚动条上去高度', this.scrollTop)
        // 算每个标题offsetTop来决定当前asIndex
        /* ti.forEach(function (e, i) {
          // console.log(e.offsetTop)
          if (thisST >= e.offsetTop) {
            // console.log(i)
            asIndex = i;
          }
        }); */
        // i 1 2 3 4 5 6 
        for (var i = 0; i < ti.length; i++) {
          if (thisST >= ti[i].offsetTop) {
            // console.log(i)
            asIndex = i;
          }
        };
        // 给左目录列表所有的li去掉激活样式
        for (var j = 0, x = leftLI.length; j < x; j++) {
          leftLI[j].classList.remove('active_ia');
        }
        // 当前滚动到的li加激活样式
        leftLI[asIndex].classList.add('active_ia');

      }, false);
	},
    // 左列表点击控制右列表滚动
    leftControlRightScroll (index) {
      /**
       * [scrollMove 右侧Ul滚动，以当前scrollTop与目标的差值/10为滚动距离，滚动过远的话会有点生硬]
       * @param  {[DOM]} ele    [目标元素ul]
       * @param  {[Number]} target [滚动到的位置]
       * @return {[void]}        [description]
       */
      var scrollMove = (ele, target) => {
        // 根据当前scrollTop与目标点距离算出单次改变量
        var vector = Math.round((target - ele.scrollTop) / 10);
        console.log('vector', vector);
        var scrollTimer = setInterval(() => {
          ele.scrollTop += vector;
          // 超出目标点后 或者 已经滚动到底清空定时器
          // 上滑(scrollTop>=目标点 且 vector为正) 或 下滑(scrollTop <= 目标点 且 vector为负)或 滑到最底
          if (((ele.scrollTop >= target) && vector > 0) || ((ele.scrollTop <= target) && vector < 0) || ((ele.scrollTop + ele.clientHeight + 1) >= ele.scrollHeight)) {
            // +1 正确激活当前左栏状态
            ele.scrollTop = target + 1;
            clearInterval(scrollTimer);
          }
        }, 1000 / 100);
      };
      var rightUl_ = this.$refs.ullist;
      // 右列表应该滚动到的标题的offsetTop
      var rightTo_ = rightUl_.querySelectorAll('.type_title')[index].offsetTop;
      scrollMove(rightUl_, rightTo_);
    },
    // 监控网页的resize来改变商品列表的高度
    watchHei () {
      clearTimeout(heightTimer); // 节流
      var heightTimer = setTimeout(() => {
        this.computedContentHeight = window.innerHeight - (window.innerWidth / 10 * 4.2);
      }, 100);
    },
    // 菜品列表中的添加按钮
    add_food(n,x){
      this.add_shopping_car(n.type_accumulation, n.name, x.name, x.one_food_id, x.unit_price);
    },
    //购物车列表中的添加按钮
    add_shopping_car(type,typename,foodname,foodid,foodprice){
      if (!this.shoppingCarList[foodid]) {
        this.shoppingCarList[foodid] = {
          'type_accumulation': type,
          'type_name': typename,
          'name': foodname,
          'one_food_id': foodid,
          'unit_price': foodprice,
          'count': 1
        };
      } else {
        this.shoppingCarList[foodid].count++;
      }
     // 购物车改变 相关计算
     this.spChangeComputeAll();
    },
    // 减去单个食物--
    reduce_food (foodid) {
      // console.log(this.shoppingCarList[foodid].count);
      if (this.shoppingCarList && this.shoppingCarList[foodid].count > 0) {
        this.shoppingCarList[foodid].count--;
        this.shoppingCarList[foodid].count <= 0 && delete this.shoppingCarList[foodid];
      }
      // 购物车改变 相关计算
      this.spChangeComputeAll();
    },
    // 购物车改变 相关计算
    spChangeComputeAll () {
      // console.log('dasd', this.shoppingCarList);
      // 清空左列表数字 再次计算
      this.reNub = {};
      for (var x in this.shoppingCarList) {
        if (!this.reNub[this.shoppingCarList[x].type_accumulation]) {
          this.reNub[this.shoppingCarList[x].type_accumulation] = this.shoppingCarList[x].count;
        } else {
          this.reNub[this.shoppingCarList[x].type_accumulation] += this.shoppingCarList[x].count;
        }
      }
      // 计算总件数
      var key = 0;
      for (var j in this.reNub) {
        key += this.reNub[j];
      }
      this.allNub = key;
      // 计算总价格
      var allPrice = 0;
      for (var z in this.shoppingCarList) {
        // +=数量乘单价
        allPrice += this.shoppingCarList[z].count * this.shoppingCarList[z].unit_price;
      }
      this.totalPrice = allPrice;
      // 加运费
      this.allTotalPrice = allPrice + this.business_info.send_cost;
    },
    checkOut(){
      // 不够起送金额
      if (this.totalPrice < this.business_info.start_send) return;
      // 够起送金额弹出支付
      this.alertBoxShow = true;
    },
    // 支付成功
    paySuccess (){
    	alert("暂不支持支付功能")
    }
  }     
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
.detail{
	width:100%;
	height:100%;
}
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
	    position: relative;
	    padding-bottom:0.8rem;
		.detail-left{
			width:1.6rem;
			overflow-y: auto;
			height:100%;
			background: #f1f1f1;
			float:left;
			li{
				line-height:0.8rem;
				padding-left:0.1rem;
				    border-bottom: 1px solid #ccc;
				h2{
					font-size:0.28rem;
					color:#000;
					position: relative;
					.left_red{
						display:inline-block;
						width:0.4rem;
						height:0.4rem;
						background:red;
						border-radius:50%;
						line-height:0.4rem;
						text-align:center;
						color:#fff;
						position: absolute;
						right:0;
						top:0;
					}
				}	
			}
			.active_ia{
				border-left: 0.1rem solid #3190e8;
			}

		}
		.detail-right{
			width:4.8rem;
            margin-left: 1.6rem;
		    overflow-y: auto;
		    height: 100%;
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
		font-size:0.18rem;
		color:#333;
		border-bottom:0.2rem solid #f3f4f4;
		padding:0.2rem 0;
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
			border-bottom:1px solid #e6e6e6;
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
	z-index:1000;
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
		.gouwuche-num{
			display:block;
			width:0.4rem;
			height:0.4rem;
			background:red;
			border-radius:50%;
			font-size:0.2rem;
			color:#ffffff;
			text-align: center;
			line-height: 0.4rem;
			position:absolute;
			right:0;
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
// 购物车展示列表
.sp_lists{
	width:100%;
	border:1px solid red;
	background:#fff;
	position:fixed;
	left:0;
	bottom:0.8rem;
	font-size:0.3rem;
	color:#000;
	line-height:0.6rem;
	z-index:900;
	padding: 0.2rem;
	p{
		.sp-clear{
			float:right;
		}
	}
	ul{
		li{
			.sp-list-l{
				float:left;
			}
			.sp-list-r{
				float:right;
				.sp-price{
					margin-right:0.4rem;
				}
				.sp-red,.sp-add{
					display:inline-block;
					width:0.4rem;
					height:0.4rem;
					border-radius:50%;
					background: #3190e8;
					color:#fff;
					text-align:center;
					line-height:0.4rem;
				}
			}
		}
	}
}
// 透明遮罩
.mask{
	width:100%;
	height:100%;
	background:rgba(0,0,0,0.5);
	position: fixed;
	left:0;
	top:0;
	z-index:800;
}
// 弹出层样式结算
.alert_box{
  width:4.8rem;
  height:4rem;
  background:#fff;
  position: fixed;
  left:50%;
  margin-left:-2.4rem;
  top:50%;
  margin-top:-3rem;
  z-index:1000;
  padding-top:1rem;
  p{
  	font-size:0.3rem;
  	color:#000;
  	text-align:center;
  }
  div{
  	padding:0 0.4rem;
  	margin-top:0.3rem;
  	p{
  		width:1.4rem;
  		float:left;
  		line-height:0.6rem;
        background: #3190e8;
  		border-radius:0.2rem;
  		color:#fff;
  	}
  	.alert-confirm{
  		margin-left:1rem;
  	}
  }
}
</style>
