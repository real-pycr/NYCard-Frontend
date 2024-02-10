<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue';

const router = useRouter()

const props = defineProps({
  myid: {
    type: String,
    default: "",
    required: true,
  },
  to: String,
  content: String,
  from: String,
  mykey: String,
  idx: Number
})

const dialogVisible = ref(false)
const width = ref(500)
if (window.innerWidth <= 768) {
  width.value = 200
}
</script>

<template>
  <el-card class="box-card" shadow="hover" @click="router.push(`/card/${props.mykey}`)">
    <template #header>
      <div class="card-header">
        <span>{{ props.to }}</span>
        <el-icon>
          <DeleteFilled @click.stop="dialogVisible=true" />
        </el-icon>
      </div>
    </template>
    <el-text truncated size="large">
      {{ props.content }}
    </el-text>
    <template #footer>{{ props.from }}</template>
  </el-card>
  <el-dialog v-model="dialogVisible" title="Tips" :width="width">
    确认要删除这张贺卡嘛？
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="dialogVisible = false, $emit('deleteCard', props.myid, props.idx)">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
  
<style>
.box-card {
  height: 200px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.box-card:hover {
  transform: scale(1.05);
  /* box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.15); */
  transition: all 0.3s;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

@media (max-width: 768px) {
  .box-card {
    height: 180px;
  }
  .dialog-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
  