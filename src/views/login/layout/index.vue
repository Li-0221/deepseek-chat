<template>
  <div class="select-none">
    <div class="absolute right-5 top-3">
      <!-- 国际化 -->
      <el-dropdown trigger="click">
        <globalization
          class="hover:text-primary hover:!bg-[transparent] w-[20px] h-[20px] ml-1.5 cursor-pointer outline-none duration-300"
        />
        <template #dropdown>
          <el-dropdown-menu class="translation">
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'zh')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'zh')]"
              @click="translationCh"
            >
              <IconifyIconOffline
                v-show="locale === 'zh'"
                class="check-zh"
                :icon="Check"
              />
              简体中文
            </el-dropdown-item>
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'en')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'en')]"
              @click="translationEn"
            >
              <span v-show="locale === 'en'" class="check-en">
                <IconifyIconOffline :icon="Check" />
              </span>
              English
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="login-container">
      <div class="login-box">
        <div class="w-80">
          <img src="@/assets/logo1.png" class="w-32 mx-auto" />
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNav } from "@/hooks/useNav";
import { useLayout } from "@/hooks/useLayout";
import { useTranslationLang } from "@/hooks/useTranslationLang";
import { useDataThemeChange } from "@/hooks/useDataThemeChange";
import globalization from "@/assets/svg/globalization.svg?component";
import Check from "@iconify-icons/ep/check";

defineOptions({
  name: "Login"
});

const { initStorage } = useLayout();
initStorage();

const { overallStyle, dataThemeChange } = useDataThemeChange();
dataThemeChange(overallStyle.value);
const { getDropdownItemStyle, getDropdownItemClass } = useNav();
const { locale, translationCh, translationEn } = useTranslationLang();
</script>
<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-zh {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}

.login-container {
  @apply w-screen h-[calc(100vh-28px)] flex items-center justify-center px-8 max-w-full;
}

:deep(.login-box) {
  @apply flex items-center text-center overflow-hidden;

  .el-tabs__nav-wrap::after {
    content: none !important;
  }

  .el-tabs__nav-scroll {
    --el-text-color-primary: rgb(139 139 139);

    display: flex;
    justify-content: center;
  }

  .el-input__wrapper {
    border-radius: 8px;
  }
}
</style>
