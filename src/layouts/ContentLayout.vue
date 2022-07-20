<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="layout">
    <el-container>
      <el-header class="text-slate-200 bg-slate-500">
        <AppHeader />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
