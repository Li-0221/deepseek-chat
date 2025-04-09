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
    <!-- <el-tab-pane :label="t('login.senseSMSLogin')" name="SMS">
      <el-form ref="smsFormRef" :model="smsForm" :rules="smsRules" size="large">
        <Motion :delay="100">
          <el-form-item prop="username">
            <el-input
              v-model="smsForm.username"
              clearable
              :placeholder="t('login.senseAccountReg')"
              :prefix-icon="useRenderIcon(Phone)"
            />
          </el-form-item>
        </Motion>

        <Motion :delay="150">
          <el-form-item prop="password">
            <div class="flex gap-2">
              <el-input
                v-model="smsForm.password"
                clearable
                :placeholder="t('login.sensePassword')"
                :prefix-icon="useRenderIcon(Message)"
                class="flex-1"
              />

              <el-button
                type="primary"
                size="large"
                plain
                class="!rounded-lg !w-28"
                :disabled="timer > 0"
                @click="sendSMS"
              >
                {{
                  timer > 0
                    ? `${timer}${t("login.senseRetryAfter")}`
                    : t("login.senseSendSMS")
                }}
              </el-button>
            </div>
          </el-form-item>

          <el-form-item prop="isAgree" class="agree-checkbox">
            <el-checkbox v-model="smsForm.isAgree" size="large" :value="true">
              <div class="ml-1 text-xs font-normal">
                {{ t("login.senseUserAgreement") }}
                <a href="" class="text-primary">
                  {{ t("login.senseUserAgreement") }}
                </a>
                {{ t("login.senseAnd") }}
                <a href="" class="text-primary">
                  {{ t("login.sensePrivacyPolicy") }}
                </a>
              </div>
            </el-checkbox>
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
    </el-tab-pane> -->
  </el-tabs>
</template>

<script setup lang="ts">
import Motion from "./utils/motion";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { isAgreeValidator, passwordValidator } from "./utils/rule";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";
import Phone from "@iconify-icons/ri/smartphone-line";
import Message from "@iconify-icons/ri/message-3-line";
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

const smsFormRef = ref<FormInstance>();
const timer = ref(0);
const smsForm = reactive({
  username: "",
  password: ""
});

const smsRules = reactive<FormRules>({
  username: [
    { required: true, message: t("login.senseAccountReg"), trigger: "blur" }
  ],
  password: [{ validator: passwordValidator, trigger: "blur" }],
  isAgree: [{ validator: isAgreeValidator, trigger: "change" }]
});

const sendSMS = () => {
  // TODO: 发送验证码
  timer.value = 60;
  const interval = setInterval(() => {
    timer.value--;
    if (timer.value <= 0) {
      clearInterval(interval);
    }
  }, 1000);
};

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

// const smsLogin = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   await formEl.validate(valid => {
//     if (valid) {
//       loading.value = true;
//       const { username, password } = toRaw(ruleForm);
//       getLogin({ username, password })
//         .then(({ data }) => {
//           setToken(data);
//           usePermissionStoreHook().handleWholeMenus([]);
//           addPathMatch();
//           router.push(getTopMenu(true).path);
//           message(t("login.senseLoginSuccess"), { type: "success" });
//         })
//         .finally(() => {
//           loading.value = false;
//         });
//     }
//   });
// };

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
