<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import Ornament from '@/components/Ornament.vue'
import { ElNotification } from 'element-plus'
import { useGetCard } from '../composable/api/useGetCard'

const router = useRouter()

const key = ref('')

function goToCard() {
  useGetCard(key.value).then((res: any) => {
    console.log(res)    // 为什么总是进入这里？catch 呢？
    if(res.success) {
      ElNotification({
        title: 'Success',
        message: '这是来自别人的祝福哦ヾ(≧▽≦*)o~~',
        type: 'success',
        duration: 1500
      })
      router.push(`/${key.value}`);
    } else {
      ElNotification({
        title: 'Error',
        message: '请输入正确的贺卡ID',
        type: 'error',
        duration: 1500
      })
    }
  }).catch((err) => {
    console.error(err)
  });
}
</script>

<template>
  <div class="container">
    <div class="login-box">
      <div class="user-box">
        <input type="text" v-model="key" @keyup.enter="goToCard()" required="true">
        <label>请输入贺卡ID: </label>
      </div>
      <div class="center"><a @click="goToCard()">
            查看贺卡
        <span></span>
      </a></div>
      <div class="center"><a @click="router.push('/write')">
            我要写贺卡
        <span></span>
      </a></div>
    </div>
  </div>
  <Ornament />
</template>

<style scoped>
.center {
  text-align: center;
  cursor: pointer;
}
.container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg,#f2709c,#ff9472);
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 350px;
  padding: 60px;
  transform: translate(-50%, -50%);
  /* background: rgba(24, 20, 20, 0.987); */
  background: linear-gradient(135deg,#f54ea2,#ff7676);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0,0,0,.6);
  border-radius: 10px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #fff;
  font-size: 12px;
}

.login-box a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #ffffff;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 25px;
  letter-spacing: 4px
}

.login-box a:hover {
  background: #ecb0c1;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #ecb0c1,
              0 0 25px #ecb0c1,
              0 0 50px #ecb0c1,
              0 0 100px #ecb0c1;
}

.login-box a span {
  position: absolute;
  display: block;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,100% {
    left: 100%;
  }
}

.login-box a span:nth-child(1) {
  bottom: 2px;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ffffff);
  animation: btn-anim1 2s linear infinite;
}
</style>
