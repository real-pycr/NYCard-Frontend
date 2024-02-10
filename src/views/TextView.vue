<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
import { useGetPoem } from '@/composable/api/useGetPoem';
import { useGetCard } from '@/composable/api/useGetCard';
import { reactive } from 'vue';
import { ref } from 'vue';

const route = useRoute() as any
const router = useRouter()

// console.log(router.params.key)
useGetCard(route.params.key).then((res: any) => {
  console.log(res)
  if (!res.success) {
    ElNotification({
      title: 'Error',
      message: '请检查网址是否正确或输入密钥',
      type: 'error',
      duration: 1500
    })
    router.push('/')
  }
}).catch((err) => {
  console.error(err)
});

let text: string[] = ["再见,2023.", "你好,2024......"]
const typetext = ref(text[0])

const poem = reactive({
  title: '',
  content_first: '',
  content_second: '',
  author: ''
})

useGetPoem().then((res: any) => {
  poem.title = res.data.title
  poem.content_first = res.data.content_first
  poem.content_second = res.data.content_second
  poem.author = res.data.author
}).catch((err) => {
  console.error(err)
});

const p1 = ref(true)
const p2 = ref(true)
const p3 = ref(true)
const p4 = ref(false)
const p5 = ref(true)
const p6 = ref(false)

function typewriteBack() {
  for (let i = text[0].length; i >= 0; i--) {
    setTimeout(() => {
      typetext.value = text[0].slice(0, i);
      /*console.log(i);*/
    }, (text[0].length - i) * 150);
  }

}

function typewriteForward() {
  for (let i = 1; i <= text[1].length; i++) {
    setTimeout(() => {
      typetext.value = text[1].slice(0, i);
      /*console.log(i);*/
    }, (i - 1) * 200);
  }
}

function fadeIn() {
  setTimeout(() => {      // 第一行诗句
    p1.value = false
  }, 1500);
  setTimeout(() => {      // 第二行诗句
    p2.value = false
  }, 3000);
  setTimeout(() => {      // 作者
    p3.value = false
  }, 4500);
  setTimeout(() => {      // 都消失
    p4.value = true;
  }, 7000);
  setTimeout(() => {      // 文字出现
    p5.value = false;
  }, 9000);
  setTimeout(() => {      // 文字消失
    p6.value = true;
  }, 18000);
  setTimeout(() => {      // 打字机
    typewriteBack();
  }, 11500);
  setTimeout(() => {      //打字机
    typewriteForward();
  }, 13500);
  setTimeout(() => {
    router.push(`/card/${route.params.key}`)
  }, 20000);
}
fadeIn();

function jump() {
  router.push(`/card/${route.params.key}`)
}
</script>

<template>
  <div class="container">
    <div class="poem">
      <p class="p_first" :class="{ before: p1, after: p4 }">{{ poem.content_first }}</p>
      <p class="p_second" :class="{ before: p2, after: p4 }">{{ poem.content_second }}</p>
      <h6 class="author" :class="{ before: p3, after: p4 }">——{{ poem.author }}《{{ poem.title }}》</h6>
    </div>
    <div class="typetext">
      <p :class="{ before: p5, after: p6 }">{{ typetext }}</p>
    </div>
  </div>
  <div class="jump" @click="jump">跳过</div>
</template>

<style scoped>
@font-face {
  font-family: 'poem';
  src: url(../assets/fonts/poem.ttf);
}

* {
  transition: all 1s linear;
}

.container {
  width: 100%;
  height: 100vh;
  background: #000;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  color: #fff;
  font-family: 'poem';
}

.poem {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.typetext {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

p {
  font-size: 3.5rem;
  margin: 20px
}

.p_first {
  position: relative;
  left: -10%;
}

.p_second {
  position: relative;
  left: 10%;
}

.author {
  font-size: 1.2rem;
  float: right;
  position: relative;
}

.before {
  transform: translate(0, 50px);
  opacity: 0;
}

.after {
  transform: translate(0, -10px);
  opacity: 0;
}

.jump {
  position: absolute;
  top: 5%;
  right: 5%;
  font-size: 1rem;
  color: #fff;
  cursor: pointer;
  border: 1px solid #fff;
  padding: 5px 10px;
  border-radius: 50px;
}

@media (max-width: 768px) {
  .poem {
    width: 90%;
  }
  p {
    font-size: 1.5rem;
    text-align: center;
    margin: 20px;
  }

  .p_first {
    position: relative;
    left: -10%;
  }

  .p_second {
    position: relative;
    left: 10%;
  }

  .author {
    font-size: 0.7rem;
    float: right;
    position: relative;
  }

}
</style>