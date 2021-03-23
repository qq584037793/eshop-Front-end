<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="text"
        v-model="username"
        placeholder="ユーザー名を入力ください"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        v-model="password"
        autocomplete="new-password"
        placeholder="パスワードを入力ください"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        type="password"
        v-model="ensurement"
        placeholder="もう一度入力ください"
      />
    </div>
    <div class="wrapper__register--button" @click="handleRegister">登録</div>
    <div class="wrapper__register--link" @click="handleLogin">ログイン</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'
// 登録処理
const useRegister = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '', ensurement: '' })
  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register',
        {
          username: data.username,
          password: data.password
        })
      if (result?.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        showToast('登録失败')
      }
    } catch (e) {
      showToast('request失敗')
    }
  }
  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegister }
}
// ログインの画面転移
const useLogin = () => {
  const router = useRouter()
  const handleLogin = () => {
    router.push({ name: 'Login' })
  }
  return { handleLogin }
}

export default {
  name: 'Register',
  components: { Toast },
  setup () {
    // 処理の流れ
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegister(showToast)
    const { handleLogin } = useLogin()
    return { username, password, ensurement, show, toastMessage, handleLogin, handleRegister }
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
  &__register--button {
    font-size: 0.16rem;
    line-height: 0.48rem;
    margin: 0.32rem 0.4rem 0.16rem;
    background: $btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    color: $bgColor;
    text-align: center;
  }
  &__register--link {
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
    text-align: center;
    cursor: pointer;
  }
}
</style>
