<template>
  <div>
    <el-popover
      width="200px"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 6px;"
    >
      <template #reference>
        <div class="h-12 p-2 flex items-center text-[#525252] rounded-xl cursor-pointer hover:bg-[rgb(239,246,255)]">
          <div class="mr-2 rounded-full overflow-hidden">
            <img
              class="w-[30px] h-[30px]"
              src="https://thirdwx.qlogo.cn/mmopen/vi_32/y8cR4NwgMcTa5icC5nuc78kRbTibktKibvMXjcVpYtLfjICqyugZ7KM8lfL6DqolKwuaZexIhjH70pnicI9Ava28Iutrcic6rvnMGlCU6aiambO7k/132"
              alt=""
            />
          </div>
          <span v-if="isExpand">个人信息</span>
        </div>
      </template>
      <template #default>
        <ul class="info">
          <li>
            <el-icon size="24"><Setting /></el-icon>系统设置
          </li>
          <li>
            <el-icon size="24"><Delete /></el-icon>删除所有对话
          </li>
          <li>
            <el-icon size="24"><Promotion /></el-icon>联系我们
          </li>
          <li>
            <el-icon size="24"><SwitchButton /></el-icon>退出登录
          </li>
        </ul>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isExpand: Boolean
});
</script>

<style lang="scss" scoped>
.info {
  li {
    @apply flex items-center h-10 rounded-lg  py-2 px-3 cursor-pointer hover:bg-[#f5f5f5] gap-[10px] text-sm;
  }
}
</style>
