import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
}, {
  path: '/shop/:id/',
  name: 'Shop',
  component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
},
{
  path: '/cartList',
  name: 'CartList',
  component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList')
},
{
  path: '/orderConfirmation/:id',
  name: 'OrderConfirmation',
  component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
},
{
  path: '/orderList',
  name: 'OrderList',
  component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderList')
},
{
  path: '/myPage',
  name: 'MyPage',
  component: () => import(/* webpackChunkName: "myPage" */ '../views/myPage/MyPage')
},
{
  path: '/myPage/address',
  name: 'Address',
  component: () => import(/* webpackChunkName: "address" */ '../views/myPage/Address')
}, {
  path: '/myPage/address/new',
  name: 'NewAddress',
  component: () => import(/* webpackChunkName: "newAddress" */ '../views/myPage/NewAddress')
},
{
  path: '/myPage/address/:id',
  name: 'UpdateAddress',
  component: () => import(/* webpackChunkName: "updateAddress" */ '../views/myPage/UpdateAddress')
},
{
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
  // ログインした後ログイン画面見ることができない
  beforeEnter (to, from, next) {
    const { isLogin } = localStorage
    isLogin ? next({ name: 'Home' }) : next()
  }
}, {
  path: '/register',
  name: 'Register',
  component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
  beforeEnter (to, from, next) {
    const { isLogin } = localStorage
    isLogin ? next({ name: 'Home' }) : next()
  }
}

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  (!isLogin && (to.name !== 'Login' && to.name !== 'Register')) ? next({ name: 'Login' }) : next()
})

export default router
