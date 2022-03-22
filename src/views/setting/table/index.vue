<template>
  <ComWrapper>
    <el-descriptions
      class="margin-top"
      title="表格列管理"
      :column="3"
      :size="size"
      border
    >
      <template #extra>
        <el-button type="primary">Operation</el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <User />
            </el-icon>
            scui
          </div>
        </template>
        scui（原作者）
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Iphone />
            </el-icon>
            原代码仓库
          </div>
        </template>
        <el-link type="primary" href="https://gitee.com/lolicode/scui/tree/master/src/views/setting/table">原仓库code（gitee）</el-link>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <View />
            </el-icon>
            预览地址
          </div>
        </template>
        <el-link type="primary" href="https://lolicode.gitee.io/scui-doc/demo/#/setting/table">原版在线预览</el-link>
      </el-descriptions-item>
    </el-descriptions>
  </ComWrapper>
</template>

<script setup>
import {computed, ref} from 'vue'
import {User, Iphone, View} from '@element-plus/icons-vue'

const size = ref('')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {marginRight: marginMap[size.value] || marginMap.default}
})
</script>

<style scoped>
.el-descriptions {margin-top: 20px;}
.cell-item {display: flex; align-items: center;}
.margin-top {margin-top: 20px;}
</style>