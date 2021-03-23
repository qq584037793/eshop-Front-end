<template>
  <div class="content">
    <div class="categroy">
      <div
        :class="{'categroy__item':true, 'categroy__item--active':currentTab === item.tab }"
        v-for="item in categories"
        :key="item.name"
        @click="()=>handleTabClick(item.tab)"
      >{{item.name}}</div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in list" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sale">月售{{item.sales}}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;{{item.price}}</span>
            <span class="product__item__origin">&yen;{{item.olePrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            @click="()=>{changeCartItem(shopId,item._id,item,-1, shopName)}"
            class="product__number__minus iconfont"
          >&#xe66d;</span>
          {{getProductCartCount(shopId, item._id)}}
          <span
            class="product__number__plus iconfont"
            @click="()=>{changeCartItem(shopId,item._id,item,1, shopName)}"
          >&#xe786;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request'
import { useStoreEffect } from '../../effects/cartEffects'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '果物', tab: 'fruit' }, { name: '肉', tab: 'meat' }]

// tabの切り替え
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}
// listの切り替え   某店舗商品リスト
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (result?.errno === 0 && result?.data.length) {
      content.list = result.data
    }
  }
  watchEffect(() => { getContentData() })
  const { list } = toRefs(content)
  return { list }
}
// 商品のプラスとマイナス
const useCartEffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useStoreEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { cartList, changeCartItem, getProductCartCount }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItem, getProductCartCount } = useCartEffect()
    return { categories, currentTab, handleTabClick, list, shopId, changeCartItem, cartList, getProductCartCount }
  }

}

</script>
<style lang="scss" scoped>
@import '../../style/viriable.scss';
@import '../../style/mixins.scss';
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: 0.5rem;
}
.categroy {
  overflow-y: scroll;
  width: 0.76rem;
  background: $search-bgColor;
  height: 100%;
  &__item {
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.14rem;
    color: $content-fontcolor;
    &--active {
      background: $bgColor;
    }
  }
}
.product {
  flex: 1;
  overflow-y: scroll;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid $content-bgColor;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
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
    &__sale {
      margin: 0.06rem 0;
      font-size: 0.12rem;
      line-height: 0.16rem;
      color: $content-fontcolor;
    }
    &__price {
      margin: 0;
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
      bottom: 0.12rem;
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
</style>
