<template>
  <el-tabs v-model="loginType">
    <p class="text-left text-xs text-gray-400 font-medium mt-4 mb-2">
      {{ t("login.senseLoginTip") }}
    </p>
    <el-tab-pane :label="t('login.senseAccountLogin')" name="PWD">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="loginRules"
        size="large"
      >
        <Motion :delay="100">
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              clearable
              :placeholder="t('login.senseAccount')"
              :prefix-icon="useRenderIcon(User)"
            />
          </el-form-item>
        </Motion>

        <Motion :delay="150">
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              clearable
              show-password
              :placeholder="t('login.sensePassword')"
              :prefix-icon="useRenderIcon(Lock)"
            />
          </el-form-item>
        </Motion>

        <Motion :delay="250">
          <el-button
            class="w-full mt-4 !rounded-xl"
            size="large"
            type="primary"
            :loading="loading"
            @click="onLogin()"
          >
            {{ t("login.senseLogin") }}
          </el-button>
          <el-button
            link
            type="primary"
            class="!ml-0 mt-2"
            @click="router.push('/register')"
          >
            {{ t("login.senseRegister") }}
          </el-button>
        </Motion>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import Motion from "./utils/motion";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { passwordValidator } from "./utils/rule";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";
import { onBeforeUnmount, onMounted, reactive, ref, toRaw } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { addPathMatch, getTopMenu } from "@/router/utils";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { setToken } from "@/utils/auth";
import { getLogin } from "@/api/user";

const router = useRouter();
const { t } = useI18n();

const ruleFormRef = ref<FormInstance>();
const loading = ref(false);
const loginType = ref("PWD");

const ruleForm = reactive({
  username: "",
  password: ""
});

const loginRules = reactive<FormRules>({
  username: [
    { required: true, message: t("login.senseAccountReg"), trigger: "blur" }
  ],
  password: [{ validator: passwordValidator, trigger: "blur" }]
});

const psdLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      loading.value = true;
      const { username, password } = toRaw(ruleForm);
      getLogin({ username, password })
        .then(({ data }) => {
          setToken(data);
          usePermissionStoreHook().handleWholeMenus([]);
          addPathMatch();
          router.push(getTopMenu(true).path);
          message(t("login.senseLoginSuccess"), { type: "success" });
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};

const onLogin = async () => {
  if (loginType.value === "PWD") {
    await psdLogin(ruleFormRef.value);
  } else {
    // await smsLogin(smsFormRef.value);
  }
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (["Enter", "NumpadEnter"].includes(code)) {
    onLogin();
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>
