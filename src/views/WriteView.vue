<script setup lang="ts">
import { ref } from 'vue'
import { useAddCard } from '@/composable/api/useAddCard';
import { useGetInfo } from '@/composable/api/useGetInfo';
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import Button from '@/components/ButtonThree.vue'

const router = useRouter()

const to = ref('')
const content = ref('')
const from = ref('')

const fromname = ref('')

useGetInfo().then((res: any) => {
  if(!res.success) {
    ElNotification({
      title: 'Error',
      message: '请先登录',
      type: 'error',
      duration: 1500
    })
    router.push('/login')
  }
  fromname.value = "From: " + res.data.qq_name
}).catch((err) => {
  console.error(err)
})

function send() {
  if(to.value == '') {
    ElNotification({
        title: '???',
        message: '你要写给谁呢?',
        type: 'info',
        duration: 1500
    })
    return
  }
  if(content.value == '') {
    ElNotification({
        title: '???',
        message: '你想要对Ta说些什么呢?',
        type: 'info',
        duration: 1500
    })
    return
  }
  if(from.value == '') {
    ElNotification({
        title: '???',
        message: '发件人是谁呢?',
        type: 'info',
        duration: 1500
    })
    return
  }
  if(content.value.length > 300) {
    ElNotification({
        title: 'Error',
        message: '不能超过300个字哦~~',
        type: 'error',
        duration: 1500
    })
    return
  }
  useAddCard(from.value, to.value, content.value).then((res: any) => {
    if(res.success) {
      ElNotification({
        title: 'Success',
        message: '记得复制ID/网址发送给Ta哦~~',
        type: 'success',
        duration: 1500
      })
      router.push(`/card/${res.data.key}`)
    } else {
      ElNotification({
        title: 'Error',
        message: "呃呃，可能出了点小问题，请稍后重试吧",
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
      <div class="card-header">
        <h1>Write</h1>
      </div>
      <el-input v-model="to" placeholder="To" 
        maxlength="10" show-word-limit class="el-input" clearable/>
      <el-input v-model="content" placeholder="在这里输入你想要说的话吧~~

如果字很多的话建议在别处写完再粘贴，如果没写完网页刷新就什么都没有了哦~~" 
        :autosize="{ minRows: 5, maxRows: 10 }" maxlength="300" 
        type="textarea" class="el-input" clearable/>
      <el-input v-model="from" :placeholder="fromname" 
        maxlength="10" show-word-limit class="el-input" clearable/>
      <Button style="margin-top: 50px;" @click="send()" />
      <a class="to-list" @click="router.push('/cardlist')">查看写过的贺卡</a>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: Title;
  src: url(../assets/fonts/Anthares.ttf);
}
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
  width: 100%;
  height: 100vh;
  /* background-color: black; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.to-list {
  position: relative;
  left: 25%;
  color: #0077ff;
  letter-spacing: 2px;
  margin-top: 20px;
}
.to-list:hover {
  color: #6f6f6f;
  cursor: pointer;
}
.card {
  width: 30%;
  /* height: 50%; */
  padding: 50px 0px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1 {
  font-family: Title;
  font-size: 50px;
  margin-bottom: 50px;

}
.el-input {
  margin: 10px;
  width: 70%;
}

@media (max-width: 768px) {
  .card {
    width: 90%;
  }
}

</style>