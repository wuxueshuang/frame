<template>
  <div>
		<header-nav></header-nav>
		<div id="main">
			<div class="sku-box store-content">
					<div class="sort-option">
							<ul class="line clear">
								<li><a href="javascript:;" class="active">综合排序</a></li>
								<li><a href="javascript:;" class="">销量排序</a></li>
								<li><a href="javascript:;" class="">价格低到高</a></li>
								<li><a href="javascript:;" class="">价格高到低</a></li>
							</ul>
					</div>
					<div class="gray-box">
						<div class="item-box">
							<shop-item 
								v-for="item,index in shopList"
								key="index"
								:item-data='item'
							></shop-item>
						</div>
					</div>
			</div>
  </div>
	</div>
</template>
<script>
	import ShopItem from '@/views/shop-list/shop-item'
	import HeaderNav from '@/components/header-nav'
	import Axios from 'axios'
	export default{
		data(){
			return {
				shopList:[]
			}
		},
		components:{
			HeaderNav,
			ShopItem
		},
		mounted(){//生命周期
			Axios.get(
				'http://localhost:3100/api/list'
			)
			.then((data)=>{
				this.shopList = data.data.list
				console.log(this.shopList)
			})
				
			}
	}
</script>
