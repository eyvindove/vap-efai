<script setup lang="ts">
import { activeStatusConfig } from '@/config'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['edit-user', 'delete-user'])

const convertActiveLabel = (active: number) => {
  return activeStatusConfig[active].label || ''
}
</script>

<template>
  <el-table :data="props.data">
    <el-table-column fixed prop="id" label="ID" width="60" align="center" />
    <el-table-column prop="account" label="Account" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="active" label="Active" align="center">
      <template #default="scope">
        <div>{{ convertActiveLabel(scope.row.active) }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="created_at" label="Created At" width="180" />
    <el-table-column prop="updated_at" label="Updated At" width="180" />
    <el-table-column fixed="right" label="Operations" width="140">
      <template #default="scope">
        <el-button
          link
          type="primary"
          @click="emits('edit-user', scope.row.account)"
          >Edit</el-button
        >
        <el-button
          link
          type="danger"
          @click="emits('delete-user', scope.row.account)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
