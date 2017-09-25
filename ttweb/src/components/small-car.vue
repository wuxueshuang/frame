<template>
  <div>
    <a href="javascript:;">购物车</a>
      <!--根据class改变颜色-->
      <span class="cart-empty-num cart-num">
        <i>0</i>
      </span>
      <div class="nav-cart-wrapper">
        <div class="nav-cart-list">
          <div class="empty" v-show="!smallCarList.length">
            <h3>购物车为空</h3>
            <p>您还没有选购任何商品，现在前往商城选购吧!</p>
          </div>
          <div class="full" v-show="smallCarList.length">
            <div class="nav-cart-items">
              <ul>
                <li class="clear" v-for="item,index in smallCarList">
                  <div class="cart-item js-cart-item cart-item-sell">
                    <div class="cart-item-inner">
                      <div class="item-thumb">
                        <img :src="item.ali_image">
                      </div>
                      <div class="item-desc">
                        <div class="cart-cell">
                          <h4>
                            <a href="#/item/100027401">{{item.title}}</a>
                          </h4>
                          <p class="attrs">
                            <span>透明</span>
                          </p>
                          <h6>
                            <span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num">x {{item.sku_num}}</span>
                          </h6>
                        </div>
                      </div>
                      <div class="del-btn" @click = "delShop(item.sku_id)">删除</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="nav-cart-total">
              <p>共 <strong class="ng-binding">{{totalNum}}</strong> 件商品</p>
              <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{totalPrice}}</span></h5>
              <h6>
                <a ng-href="http://www.smartisan.com/shop/#/cart" class="nav-cart-btn" href="http://www.smartisan.com/shop/#/cart">去购物车</a>
              </h6>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
  import Axios from 'axios'
  export default {
    data(){
      return {}
    },
    computed:{
      smallCarList(){
        return this.$store.state.smallCarList
      },
      totalNum(){
        let n = 0;
        this.smallCarList.forEach(function(item){
          n += item.sku_num
        })
        return n
      },
      totalPrice(){
        let money = 0
        this.smallCarList.forEach(function(item){
          money += item.price * item.sku_num
        })
        return money
      }
    },
    mounted(){
      //获取小购物车的商品
      Axios.get('http://localhost:3100/api/getShopCarList')
      .then((data)=>{
        console.log(data.data)
        this.$store.commit('changeSmallCarList',data.data) 
      })
    },
    methods:{
      delShop(id){
        Axios.post("http://localhost:3100/api/removeCarShopById",
        {
          removeId: id
        })
        .then((data)=>{
          this.$store.commit('changeSmallCarList',data.data)
        })
      }
    }
  }
</script>