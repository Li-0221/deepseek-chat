<template>
  <p class="text-left text-xs text-gray-400 font-medium mt-4 mb-2">
    {{ t("login.senseLoginTip") }}
  </p>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules size="large">
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
      <el-form-item prop="passwordAgain">
        <el-input
          v-model="ruleForm.passwordAgain"
          clearable
          show-password
          :placeholder="t('login.sensePasswordAgain')"
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
        @click="onLogin(ruleFormRef)"
      >
        {{ t("login.senseConfirm") }}
      </el-button>
      <el-button
        link
        type="primary"
        class="!ml-0 mt-2"
        @click="router.push('/login')"
      >
        {{ t("login.senseToLogin") }}
      </el-button>
    </Motion>
  </el-form>
</template>

<script setup lang="ts">
import Motion from "./utils/motion";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { passwordValidator, Validator } from "./utils/rule";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";
import { onBeforeUnmount, onMounted, reactive, ref, toRaw } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { registerAPi } from "@/api/user";

const passwordAgainValidator: Validator = (rule, value, callback) => {
  if (value !== ruleForm.password) {
    callback(new Error(t("login.sensePassWordAgainRuleReg")));
  } else {
    callback();
  }
};

const router = useRouter();
const { t } = useI18n();

const ruleFormRef = ref<FormInstance>();
const loading = ref(false);

const ruleForm = reactive({
  username: "",
  password: "",
  passwordAgain: ""
});

const rules = reactive<FormRules>({
  username: [
    { required: true, message: t("login.senseAccountReg"), trigger: "blur" }
  ],
  password: [{ validator: passwordValidator, trigger: "blur" }],
  passwordAgain: [
    {
      required: true,
      message: t("login.sensePassWordAgainReg"),
      trigger: "blur"
    },
    { validator: passwordAgainValidator, trigger: "blur" }
  ]
});

const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      loading.value = true;
      const { username, password } = toRaw(ruleForm);
      registerAPi({ username, password })
        .then(() => {
          message("注册成功", { type: "success" });
          router.push("/login");
        })
        .catch(error => {
          ruleFormRef.value?.resetFields();
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (["Enter", "NumpadEnter"].includes(code)) {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>
