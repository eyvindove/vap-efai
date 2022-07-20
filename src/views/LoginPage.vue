<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, Router } from 'vue-router'
import { useUserStore } from '@/store'
import { PostLogin } from '@/api'
import { validateAccount, validatePassword } from '@/validation'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'

const router: Router = useRouter()
const userStore = useUserStore()

const formRef = ref<FormInstance>()
const loading = ref(false)

interface FormData {
  account: string
  password: string
}

const formData: FormData = reactive({
  account: '',
  password: '',
})

const rules = reactive({
  account: [
    {
      validator: validateAccount,
      trigger: 'blur',
    },
  ],
  password: [
    {
      validator: validatePassword,
      trigger: 'blur',
    },
  ],
})

const userLogin = async () => {
  loading.value = true
  await PostLogin(formData)
    .then((res) => {
      if (res.result?.user?.active === 2) {
        console.log('not active')
        ElMessage.error('Account is not active')
      } else if (res.result?.token) {
        userStore.setLocalStorageToken(res.result?.token)
        ElMessage.success('Login success')
        setTimeout(() => {
          loading.value = false
          router.push({ name: 'UserPage' })
        }, 500)
      }
    })
    .catch((err) => {
      ElMessage.error('Account or Password is incorrect.')
      console.log('err', err)
      loading.value = false
    })
}

const submittedLogin = (formElement: FormInstance) => {
  formElement.validate(async (valid) => {
    if (valid) {
      console.log('submit!')
      await userLogin()
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<template>
  <div class="flex justify-center items-center h-full">
    <el-card class="w-3/4 md:w-80">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        status-icon
        label-position="top"
      >
        <el-form-item label="Account" prop="account">
          <el-input v-model="formData.account" type="text"></el-input>
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>
      </el-form>

      <el-button
        class="mt-4 w-full"
        type="primary"
        size="large"
        :loading="loading"
        @click="submittedLogin(formRef)"
      >
        Login
      </el-button>
    </el-card>
  </div>
</template>
