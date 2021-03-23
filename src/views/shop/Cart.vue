<template>
  <div class="mask" @click="handleCartShow" v-if="showCart && cartCalculation.total>0" />
  <div class="cart">
    <div class="product" v-if="showCart && cartCalculation.total>0">
      <div class="product__header">
        <div class="product__header__all" @click="()=>setCheckAll(shopId)">
          <span
            class="product__header__icon iconfont"
            v-html="cartCalculation.allcheck ?'&#xe63a;' : '&#xe667;'"
          ></span> 全部選択
        </div>
        <div class="product__header__clear" @click="()=>cleanCartProduct(shopId)">
          <span class="product__header__clear__btn" @click="()=>cleanCartProduct(shopId)">全部削除</span>
        </div>
      </div>
      <div class="product__item" v-for="item in productList" :key="item._id">
        <div
          class="product__item__checked iconfont"
          v-html="item.check ? '&#xe63a;' : '&#xe667;'"
          @click="()=>changCartItemCheck(shopId,item._id)"
        ></div>
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;{{item.price}}</span>
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            @click="()=>{changeCartItemInfo(shopId,item._id,item,-1)}"
            class="product__number__minus iconfont"
          >&#xe66d;</span>
          {{item.count||0}}
          <span
            class="product__number__plus iconfont"
            @click="()=>{changeCartItemInfo(shopId,item._id,item,1)}"
          >&#xe786;</span>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          class="check__icon__img"
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          @click="handleCartShow"
        />
        <div class="check__icon__tag">{{cartCalculation.total}}</div>
      </div>
      <div class="check__info">
        合計:
        <span class="check__info__price">&yen; {{cartCalculation.price}}</span>
      </div>
      <div class="check__btn" v-show="cartCalculation.total>0">
        <router-link :to="{path:`/orderConfirmation/${shopId}`}">支払い</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useStoreEffect } from '../../effects/cartEffects'

// cartの処理
const useCartEffect = () => {
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const { changeCartItemInfo, productList, cartCalculation } = useStoreEffect(shopId)

  const changCartItemCheck = (shopId, productId) => {
    store.commit('changCartItemCheck', { shopId, productId })
  }

  const cleanCartProduct = (shopId) => {
    store.commit('cleanCartProduct', { shopId })
  }
  const setCheckAll = (shopId) => {
    store.commit('setCheckAll', { shopId })
  }
  return { productList, shopId, changeCartItemInfo, changCartItemCheck, cleanCartProduct, setCheckAll, cartCalculation }
}

const showCartEffect = () => {
  const showCart = ref(false)
  const handleCartShow = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShow }
}

export default {
  name: 'Cart',
  setup () {
    const { productList, shopId, changeCartItemInfo, changCartItemCheck, cleanCartProduct, setCheckAll, cartCalculation } = useCartEffect()
    const { showCart, handleCartShow } = showCartEffect()
    return { cartCalculation, productList, changeCartItemInfo, shopId, changCartItemCheck, cleanCartProduct, setCheckAll, showCart, handleCartShow }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriable.scss';
@import '../../style/mixins.scss';
.mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.cart {
  position: absolute;
  // display: flex;
  left: 0;
  right: 0;
  bottom: 0;
  background: $bgColor;
  z-index: 2;
}
.product {
  flex: 1;
  overflow-y: scroll;
  background: $bgColor;
  &__header {
    display: flex;
    height: 0.52rem;
    border-bottom: 0.01rem solid $content-bgColor;
    text-align: center;
    line-height: 0.52rem;
    font-size: 0.14rem;
    color: $content-fontcolor;

    &__all {
      margin-left: 0.16rem;
      span {
        font-size: 0.2rem;
        line-height: 0.5rem;
        margin-right: 0.2rem;
        color: $btn-bgColor;
      }
    }
    &__clear {
      flex: 1;
      text-align: right;
      margin-right: 0.16rem;
      &__btn {
        display: inline-block;
      }
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &__checked {
      font-size: 0.2rem;
      line-height: 0.5rem;
      margin-right: 0.2rem;
      color: $btn-bgColor;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: $content-fontcolor;
      margin: 0;
      @include ellipsis;
    }
    &__detail {
      overflow: hidden;
    }
    &__price {
      margin: 0.06rem 0 0 0;
      font-size: 0.14rem;
      color: $hightlight-fontColor;
      line-height: 0.2rem;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.25rem;
      line-height: 0.18rem;
      &__minus {
        position: relative;
        top: 0.02rem;
        color: $medium-fontColor;
        margin-right: 0.05rem;
      }
      &__plus {
        position: relative;
        top: 0.02rem;
        color: $btn-bgColor;
        margin-left: 0.05rem;
      }
    }
  }
}
.check {
  display: flex;
  flex: 1;
  height: 0.49rem;
  border: 0.01rem solid $content-bgColor;
  line-height: 0.49rem;
  &__icon {
    width: 0.84rem;
    position: relative;
    &__img {
      display: block;
      width: 0.28rem;
      height: 0.26rem;
      margin: 0.12rem auto;
    }
    &__tag {
      position: absolute;
      width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      border-radius: 50%;
      background: $hightlight-fontColor;
      font-size: 0.12rem;
      color: $bgColor;
      text-align: center;
      right: 0.2rem;
      top: 0.04rem;
      color: $bgColor;
      transform: scale(0.5);
    }
  }

  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: 0.12rem;
    &__price {
      color: $hightlight-fontColor;
      font-size: 0.18rem;
    }
  }
  &__btn {
    width: 0.98rem;
    background-color: #4fb0f9;
    font-size: 0.14rem;
    text-align: center;
    a {
      text-decoration: none;
      color: $bgColor;
    }
  }
}
</style>
