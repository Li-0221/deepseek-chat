<template>
  <div class="bg-[rgb(243,244,246)] p-[10px] rounded-3xl shadow">
    <el-input
      class="ds-textarea"
      v-model="msg"
      style="width: 100%"
      :rows="2"
      :autosize="{ minRows: 2, maxRows: 12 }"
      type="textarea"
      placeholder="给 DeepSeek 发送消息"
    />

    <div class="flex justify-between">
      <div class="flex text-[#4c4c4c] text-xs gap-[10px] cursor-pointer">
        <div class="inbtn"><ReactSvg class="w-[19px] h-[19px]" /> 深度思考(R1)</div>
        <div class="inbtn"><IntSvg class="w-[19px] h-[19px]" />联网搜索</div>
      </div>
      <div class="flex gap-[10px] items-center text-[#4c4c4c]">
        <FileSvg class="w-[23px] h-[23px] cursor-pointer" />
        <el-button circle class="!bg-[#d6dee8]">
          <template #icon>
            <el-icon size="20" color="#fff"><Top /></el-icon
          ></template>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileSvg from "@/assets/svg/file.svg";
import IntSvg from "@/assets/svg/int.svg";
import ReactSvg from "@/assets/svg/react.svg";
import { ref } from "vue";

const msg = ref("");
</script>

<style lang="scss" scoped>
.inbtn {
  @apply gap-1 rounded-[14px] border bg-white h-7 leading-7 px-[7px] flex items-center;
}
:deep(.ds-textarea) {
  textarea {
    box-shadow: none;
    background-color: transparent;
    font-size: 16px;
    resize: none;
  }
}
</style>
