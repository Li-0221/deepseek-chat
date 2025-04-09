import type { FormItemRule } from "element-plus";
import { $t, transformI18n } from "@/plugins/i18n";

/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

export type Validator = FormItemRule["validator"];

// 密码校验
export const passwordValidator: Validator = (rule, value, callback) => {
  if (value === "") {
    callback(new Error(transformI18n($t("login.sensePassWordReg"))));
  } else if (!REGEXP_PWD.test(value)) {
    callback(new Error(transformI18n($t("login.sensePassWordRuleReg"))));
  } else {
    callback();
  }
};

// 同意条款校验
export const isAgreeValidator: Validator = (rule, value, callback) => {
  if (!value) {
    return callback(new Error(transformI18n($t("login.senseAgreeReg"))));
  }
  callback();
};
