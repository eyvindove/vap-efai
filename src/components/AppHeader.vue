<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, Router } from 'vue-router'
import { useUserStore } from '@/store'
import { ElMessage } from 'element-plus'

const router: Router = useRouter()
const userStore = useUserStore()

const loading = ref(false)

const logout = () => {
  loading.value = true
  ElMessage.success('Logout success')
  setTimeout(() => {
    userStore.clearLocaleStorage()
    router.push({ name: 'LoginPage' })
    loading.value = false
  }, 500)
}
</script>

<template>
  <div class="flex justify-between items-center h-full">
    <div>User Information</div>
    <el-button :loading="loading" @click="logout">Logout</el-button>
  </div>
</template>
