<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt />
    <div class="wrapper__input">
      <input class="wrapper__input__content" v-model="username" placeholder="ユーザー名を入力ください" />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        v-model="password"
        autocomplete="new-password"
        type="password"
        placeholder="パスワードを入力ください"
      />
    </div>
    <div class="wrapper__input--button" @click="handleLogin">ログイン</div>
    <div class="wrapper__input--link" @click="handleRegister">会員登録</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'
// ログイン
const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '' })
  const handleLogin = async () => {
    try {
      // const { username, password } = data
      // if (username === '' && password === '') {
      //   showToast('パスワードを入力ください')
      // }
      const result = await post('/api/user/login',
        {
          username: data.username,
          password: data.password
        })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('ログイン失败')
      }
    } catch (e) {
      showToast('request失敗')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}
// 登録
const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegister }
}

export default {
  name: 'Login',
  components: { Toast },
  // コード実行する流れ
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegister } = useRegisterEffect()
    return { username, password, show, toastMessage, handleLogin, handleRegister }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriable.scss';
.wrapper {
  height: 5rem;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.6rem;
    height: 0.6rem;
  }
  &__input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    &__content {
      width: 100%;
      margin-top: 0.12rem;
      line-height: 0.22rem;
      border: none;
      outline: none;
      background: none;
      font-size: 0.16rem;
      color: $content-notice-fontcolor;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__input--button {
    font-size: 0.16rem;
    line-height: 0.48rem;
    margin: 0.32rem 0.4rem 0.16rem;
    background: $btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: $bgColor;
    text-align: center;
    cursor: pointer;
  }
  &__input--link {
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
    text-align: center;
    cursor: pointer;
  }
}
</style>
