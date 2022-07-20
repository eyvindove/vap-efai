<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { GetUser, GetOneUser, PostUser, PutUser, DeleteUser } from '@/api'
import { validateAccount, validatePassword } from '@/validation'
import UserTable from '@/components/UserTable.vue'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()

const showDialog = ref(false)
const showConfirmDialog = ref(false)
const dialogType = ref('create')

const dialogTitle = computed(() =>
  dialogType.value === 'create' ? 'Create User' : 'Edit User'
)

interface FormData {
  account: string
  password: string
  passwordConfirmation: string
  name: string
}

const formData: FormData = reactive({
  account: '',
  password: '',
  passwordConfirmation: '',
  name: '',
})

const clearFormData = () => {
  formData.account = ''
  formData.password = ''
  formData.passwordConfirmation = ''
  formData.name = ''
}

const rules = reactive({
  account: [
    { required: true, message: 'Please input account', trigger: 'blur' },
    {
      validator: validateAccount,
      trigger: 'blur',
    },
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    {
      validator: validatePassword,
      trigger: 'blur',
    },
  ],
  passwordConfirmation: [
    {
      required: true,
      message: 'Please input password for confirmation',
      trigger: 'blur',
    },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === '')
          callback(new Error('Please input password to confirmation'))
        else if (formData.password !== value)
          callback(new Error('Password is not the same'))
        else callback()
      },
      trigger: ['change', 'blur'],
    },
  ],
  name: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { min: 10, message: 'Length should bigger than 10', trigger: 'blur' },
  ],
})

const activeRules = computed(() => {
  if (dialogType.value === 'create') return rules
  else
    return { ...rules.name, ...rules.password, ...rules.passwordConfirmation }
})

const openDialog = (type: string) => {
  showDialog.value = true
  dialogType.value = type
}

const closeDialog = (formElement: FormInstance | undefined) => {
  showDialog.value = false
  formElement?.resetFields()
  clearFormData()
}

const createUser = async () => {
  await PostUser({
    account: formData.account,
    password: formData.password,
    passwordConfirmation: formData.passwordConfirmation,
    name: formData.name,
  })
}

const updateUser = async () => {
  console.log('formDaata', formData)
  await PutUser({
    password: formData.password,
    passwordConfirmation: formData.passwordConfirmation,
    name: formData.name,
  })
}

const editUser = async (account: string) => {
  const user = await GetOneUser({ account })

  formData.name = user.result.name
  openDialog('edit')
}

const deleteUser = async (account: string) => {
  await DeleteUser({ account })
  await getUserList()
}

const afterSubmitted = () => {
  closeDialog(formRef.value)
  clearFormData()
}

const submittedUser = (formElement: FormInstance | undefined) => {
  formElement?.validate(async (valid) => {
    if (valid) {
      console.log('submit!')
      try {
        if (dialogType.value === 'create') await createUser()
        else if (dialogType.value === 'edit') await updateUser()
      } catch (err) {
        console.log('error', err)
      } finally {
        afterSubmitted()
        getUserList()
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const tableContent = reactive({
  data: [],
})

const getUserList = async () => {
  await GetUser().then((res) => {
    tableContent.data = res.result
  })
}

onMounted(async () => {
  await getUserList()
})
</script>

<template>
  <div>
    <div class="flex justify-end mb-4">
      <el-button type="primary" @click="openDialog('create')">Create</el-button>
    </div>

    <UserTable
      :data="tableContent.data"
      @edit-user="editUser"
      @delete-user="showConfirmDialog = true"
    />

    <el-dialog v-model="showDialog" :title="dialogTitle" width="600px">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="activeRules"
        label-width="140px"
      >
        <el-form-item
          v-if="dialogType === 'create'"
          prop="account"
          label="Account"
        >
          <el-input v-model="formData.account"></el-input>
        </el-form-item>

        <el-form-item prop="name" label="Name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>

        <el-form-item prop="password" label="Password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>

        <el-form-item prop="passwordConfirmation" label="Password Confirm">
          <el-input v-model="formData.passwordConfirmation"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="closeDialog(formRef)">Cancel</el-button>
        <el-button type="primary" @click="submittedUser(formRef)"
          >Confirm</el-button
        >
      </template>
    </el-dialog>

    <el-dialog v-model="showConfirmDialog" title="Delete User">
      <span>Are you sure to delete this user?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showConfirmDialog = false">Cancel</el-button>
          <el-button type="primary" @click="deleteUser">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
