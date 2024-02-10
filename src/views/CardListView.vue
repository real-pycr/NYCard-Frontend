<script setup lang="ts">
import { useGetInfo } from '@/composable/api/useGetInfo';
import { useGetCardList } from '@/composable/api/useGetCardList';
import { useDeleteCard } from '@/composable/api/useDeleteCard';
import Button from '@/components/ButtonTwo.vue'
import Card from '@/components/PreviewCard.vue'
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'

const router = useRouter()

const cards = ref<Array<{
  ID: string,
  to: string,
  content: string,
  from: string
  key: string
}>>([])

const userinfo = reactive({
  username: Number,
  qqname: String,
  gender: String,
  age: Number,
  area: String,
  qq_number: String
})

const imgsource = ref("")

useGetInfo().then((res: any) => {
  if (!res.success) {
    ElNotification({
      title: 'Error',
      message: '请先登录',
      type: 'error',
      duration: 1500
    })
    router.push('/login')
  }
  userinfo.username = res.data.username
  userinfo.qqname = res.data.qq_name
  userinfo.gender = res.data.gender
  userinfo.age = res.data.age
  userinfo.area = res.data.area
  userinfo.qq_number = res.data.qq_number
  imgsource.value = "https://api.vvhan.com/api/qt?qq=" + userinfo.qq_number
  console.log(userinfo.qq_number)
}).catch((err) => {
  console.error(err)
})

useGetCardList().then((res: any) => {
  if (res.success) {
    for (let i = 0; i < res.data.total; i++) {
      cards.value.push({
        ID: res.data.cards[i].ID,
        from: res.data.cards[i].from,
        to: res.data.cards[i].to,
        content: res.data.cards[i].content,
        key: res.data.cards[i].key
      })
    }
    // console.log(cards.value)
  }
}).catch((err) => {
  console.error(err)
})

function alternative() {
  imgsource.value = "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
}

function deletecard(myid: string, idx: number) {
  console.log(myid)
  useDeleteCard(myid).then((res: any) => {
    if (res.success) {
      ElNotification({
        title: 'Success',
        message: '删除成功',
        type: 'success',
        duration: 1500
      })
      cards.value.splice(idx, 1);
    }
    else {
      ElNotification({
        title: 'Error',
        message: '删除失败',
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
    <div class="user">
      <!-- <el-avatar size="large" src="https://api.vvhan.com/api/qt?qq=978585375" /> -->
      <img :src="imgsource"  alt="avatar" @error="alternative"
        style="width: 100px; height: 100px; border-radius: 50%; border: 1px solid white;">
      <div class="discription-on-pc">
        <h5>Username: {{ userinfo.username }}</h5>
        <h5>QQname: {{ userinfo.qqname }}</h5>
        <h5>Sex: {{ userinfo.gender }}</h5>
        <h5>Area: {{ userinfo.area }}</h5>
        <h5>Age: {{ userinfo.age }}</h5>
      </div>
      <div class="discription-on-phone">
        <h5><span class="usermain">{{ userinfo.qqname }}</span> {{ userinfo.username }}</h5>
        <h5>{{ userinfo.gender }} {{ userinfo.area }} {{ userinfo.age }}</h5>
      </div>
    </div>
    <div class="card">
      <Card v-if="cards.length !== 0" v-for="(card, index) in cards" :to="card.to" :content="card.content" :from="card.from" 
        :mykey="card.key" :myid="card.ID" :idx="index"
        @delete-card="deletecard"/>
      <div v-else class="button">
        <Button msg="to write" @click="router.push('/write')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
div.button {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
  background-color: white;
}
/* .card {
  background-color: rgba(0, 0, 0, 0.1);
} */

@media (min-width: 768px) {
  .container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 0px gray;
  }

  .user {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #aaa;
    /* padding: 70px 0px; */
    border-radius: 10px;
  }

  .discription-on-pc {
    display: flex;
    justify-content: center;
    align-items: first;
    flex-direction: column;
    margin-top: 50px;
  }

  .discription-on-phone {
    display: none;
  }

  h5 {
    margin: 10px 0px;
  }

  .card {
    width: 80%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    /* grid-template-rows: auto; */
    overflow: auto;
    /* padding: 20px; */
  }
}

@media (max-width: 768px) {
  .container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 0px gray;
  }

  .user {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #aaa;
    padding: 0px 5%;
    border-radius: 10px;
  }

  .discription-on-pc {
    display: none;
  }

  .discription-on-phone {
    display: flex;
    justify-content: center;
    /* align-items: first; */
    flex-direction: column;
    margin: 20px;
  }

  h5 {
    margin: 10px 0px;
  }

  span.usermain {
    font-size: 1.5em;
    margin-right: 10px;
  }

  .card {
    width: 100%;
    height: 50vh;
    display: grid;
    grid-template-columns: 1fr;
    /* grid-template-rows: auto; */
    overflow: auto;
    /* padding: 20px; */
  }
}
</style>