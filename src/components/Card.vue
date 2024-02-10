<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus'
import { useGetCard } from '@/composable/api/useGetCard';
import { reactive } from 'vue';
import { ref } from 'vue';
import Button from '@/components/ButtonTwo.vue'

const route = useRoute() as any
const router = useRouter()

// console.log(router.params.key)
const card = reactive({
  from: '',
  to: '',
  content: ''
})

useGetCard(route.params.key).then((res: any) => {
  // console.log(res)
  if (!res.success) {
    ElNotification({
      title: 'Error',
      message: '请检查网址是否正确或输入密钥',
      type: 'error',
      duration: 1500
    })
    route.push('/')
  }
  card.from = res.data.from
  card.to = res.data.to
  card.content = res.data.content
  adaptdevice()
}).catch((err) => {
  console.error(err)
});

const show = ref(true)
setTimeout(() => {
  show.value = false
}, 3000)

const fontSize = ref(0)
function adaptdevice() {
  console.log(window.innerWidth, card.content.length)
  if (window.innerWidth <= 768) {
    if (card.content.length <= 100) {
      fontSize.value = 1
    }
    else if (card.content.length <= 300) {
      fontSize.value = 0.7
    }
    else {
      fontSize.value = 0.5
    }
  }
  else {
    if (card.content.length > 450) {
      fontSize.value = 0.6
    }
    else if (card.content.length >= 300) {
      fontSize.value = 1
    }
    else {
      fontSize.value = 1.2
    }
  }
}
</script>

<template>
  <div class="card-container" :class="{ before: show }">
    <div class="card-text">
      <p class="card-to">致：{{ card.to }}</p>
      <p class="card-content" :style="{'font-size': fontSize + 'rem'}">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{ card.content }}</p>
      <p class="card-from">——{{ card.from }}</p>
    </div>
    <Button msg="我也要写" @click="router.push('/write')" />
    <h6 style="margin-top: 10px;">ID: {{ route.params.key }}</h6>
    <img src="../assets/img/11.png" style="width: 100%; height: 100%; position: absolute; 
      top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: -1; opacity: 0.7;">
    <img src="../assets/img/12.png" style="width: 35%; position: absolute; 
      top: 0; right: 0; z-index: -1; opacity: 0.7;">
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'text';
  src: url(../assets/fonts/poem.ttf);
}

.card-container {
  /* position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(5deg); */

  /* background-image: url("../assets/img/card.png"); */
  /* background-size: contain; */
  /* background-repeat: no-repeat; */
  background: #FBF7DE;
  border-radius: 20px;
  width: 30%;
  height: 75%;
  transform: rotate(5deg);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all 2s linear;
}

.before {
  opacity: 0;
  transform: translateY(50px);
}

.card-text {
  width: 70%;
  height: 80%;
  font-family: text;
  text-align: justify;
  margin-top: 15px;
}

p.card-to {
  font-size: 1.2rem;
  margin-bottom: 10px;
  /* float: left; */
}

p.card-content {
  /* font-size: 1rem; */
  line-height: 1.618rem;
}

p.card-from {
  font-size: 1.2rem;
  margin-top: 10px;
  float: right;
}

@media screen and (max-width: 768px) {
  .card-container {
    width: 80%;
    height: 60%;
  }

  .card-text {
    width: 80%;
    height: 80%;
  }

  p.card-to {
    font-size: 0.8rem;
  }

  p.card-content {
    /* font-size: 0.5rem; */
    line-height: 1.1rem;
  }

  p.card-from {
    font-size: 0.8rem;
  }
}</style>