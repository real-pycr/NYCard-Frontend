<script setup lang="ts">
import Button from '@/components/ButtonOne.vue'
import { useLogin } from '@/composable/api/useLogin'
import { useGetInfo } from '@/composable/api/useGetInfo'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { ref } from 'vue'

const router = useRouter()

const username = ref('')
const password = ref('')

useGetInfo().then((res: any) => {
  if (res.success) {
    router.push('/write');
  }
}).catch((err) => {
  console.error(err)
})

function login() {
  if (username.value == '') {
    ElNotification({
      title: 'Error',
      message: '用户名不能为空',
      type: 'error',
      duration: 1500
    })
    return
  }
  if (password.value == '') {
    ElNotification({
      title: 'Error',
      message: '密码不能为空',
      type: 'error',
      duration: 1500
    })
    return
  }
  useLogin(username.value, password.value).then((res: any) => {
    if (res.success) {
      ElNotification({
        title: 'Success',
        message: '登录成功',
        type: 'success',
        duration: 1500
      })
      router.push('/write');
    } else {
      ElNotification({
        title: 'Error',
        message: '用户名或密码错误',
        type: 'error',
        duration: 1500
      })
    }
  }).catch((err) => {
    console.error(err)
  })
}

</script>

<template>
  <div class="bg"></div>
  <div class="container">
    <div class="card">
      <a class="login">Log in</a>
      <div class="inputBox">
        <input type="text" required="true" v-model="username"> <!-- Why it must work with 'required="true"'?? -->
        <span class="user">Username / QQ</span>
      </div>
      <div class="inputBox">
        <input type="password" required="true" v-model="password" @keyup.enter="login()">
        <span>Password</span>
      </div>

      <Button msg="Login" @click="login()" />
      <a class="to-register" @click="router.push('/register')">没有账号？戳我！</a>
    </div>
  </div>
  <!-- <Ornament /> -->
</template>

<style scoped>
.bg {
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F5EFD9;
  background-image: url("../assets/img/9.png");
  background-repeat: repeat;
  background-size: contain;
  z-index: -1;
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.to-register {
  position: relative;
  left: 30%;
  color: #fff;
  letter-spacing: 2px;
  margin-top: 20px;
}

.to-register:hover {
  color: #6f6f6f;
  cursor: pointer;
}

.login {
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: block;
  font-weight: bold;
  font-size: x-large;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 45px 50px 30px;
  min-height: 350px;
  width: 300px;
  flex-direction: column;
  gap: 35px;
  background: #606060;
  box-shadow: 16px 16px 32px #c8c8c8,
    -16px -16px 32px #fefefe;
  border-radius: 8px;
}

.inputBox {
  position: relative;
  width: 250px;
}

.inputBox input {
  width: 100%;
  padding: 10px;
  outline: none;
  border: none;
  color: #fff;
  font-size: 1em;
  background: transparent;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transition: 0.1s;
  border-bottom-left-radius: 8px;
}

.inputBox span {
  margin-top: 5px;
  position: absolute;
  left: 0;
  transform: translateY(-50px);
  margin-left: 10px;
  padding: 10px;
  pointer-events: none;
  font-size: 15px;
  color: #fff;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 3px;
  border-radius: 8px;
}

.inputBox input:valid~span,
.inputBox input:focus~span {
  transform: translateX(113px) translateY(-15px);
  font-size: 0.8em;
  padding: 5px 10px;
  background: #fff;
  letter-spacing: 0.2em;
  color: #000;
  border: 2px;
}

.inputBox input:valid,
.inputBox input:focus {
  border: 2px solid #fff;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .card {
    width: 250px;
  }
}
</style>