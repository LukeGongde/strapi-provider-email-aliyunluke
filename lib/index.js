"use strict";
const Dm20151123 = require("@alicloud/dm20151123");
const OpenApi = require("@alicloud/openapi-client");
const Util = require("@alicloud/tea-util");

/**
 * 使用AK&SK初始化账号Client
 * @return Client
 * @throws Exception
 */
function createClient(key, keySecret, endpoint) {
  // 工程代码泄露可能会导致 AccessKey 泄露,并威胁账号下所有资源的安全性.以下代码示例仅供参考.
  // 建议使用更安全的 STS 方式,更多鉴权访问方式请参见:https://help.aliyun.com/document_detail/378664.html.
  let config = new OpenApi.Config({
    // 必填,请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID.
    accessKeyId: key,
    // 必填,请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET.
    accessKeySecret: keySecret,
  });
  // Endpoint 请参考 https://api.aliyun.com/product/Dm
  config.endpoint = endpoint;
  return new Dm20151123.default(config);
}

async function main(options, providerOptions, settings) {
  const { to, from, cc, bcc, replyTo, subject, text, html } = options;
  const { accessKeyId, accessKeySecret, endpoint } = providerOptions;

  const {
    FromAlias,
    AccountName,
    AddressType,
    ReplyToAddress,
    ClickTrace,
    TagName,
    replyAddressAlias,
    debug,
  } = settings;
  const logger = strapi.logger
    ? strapi.logger("email:aliyun:send")
    : strapi.log;
  logger.debug("email aliyun");

  let singleSendMailRequest = new Dm20151123.SingleSendMailRequest({
    accountName: from ? from : AccountName,
    addressType: 0,
    tagName: TagName,
    replyToAddress: ReplyToAddress,
    toAddress: to,
    subject: subject,
    htmlBody: html,
    fromAlias: FromAlias,
    replyAddress: replyTo,
    replyAddressAlias: replyAddressAlias,
    clickTrace: "0",
    unSubscribeLinkType: "",
    unSubscribeFilterLevel: "",
    textBody: text,
  });
  let client = createClient(accessKeyId, accessKeySecret, endpoint);

  let runtime = new Util.RuntimeOptions({});
  try {
    // 复制代码运行请自行打印 API 的返回值
    await client.singleSendMailWithOptions(singleSendMailRequest, runtime);
  } catch (error) {
    // 此处仅做打印展示,请谨慎对待异常处理,在工程项目中切勿直接忽略异常.
    // 错误 message
    logger.error(error.message);
    // 诊断地址
    logger.error(error.data["Recommend"]);
    Util.default.assertAsString(error.message);
  }
}

module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    return {
      send: async (
        options = {
          to: "",
          from: "",
          cc: "",
          bcc: "",
          replyTo: "",
          subject: "",
          text: "",
          html: "",
        }
      ) => {
        await main(options, providerOptions, settings);
      },
    };
  },
};
