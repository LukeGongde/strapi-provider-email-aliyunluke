# strapi-provider-email-aliyunluke

In the strapi email, use the aliyun provider.

## Installation

In the root directory of your project, run:

```bash
npm i strapi-provider-email-aliyunluke
```

## Configuration

In your `config/plugins.js`, set the following:

### Strapi v4:

```javascript
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "strapi-provider-email-aliyungd",
      providerOptions: {
        accessKeyId:  ** ,// change
        accessKeySecret: ** ,// change
        endpoint: "dm.aliyuncs.com",
      },
      settings: {
        FromAlias: ** // change
        AccountName: **, // change
        AddressType: 0,
        ReplyToAddress: false,
        ClickTrace: "1",
        TagName: **, // chang
        replyAddressAlias: **, // chang
        debug: true, // change
      },
    },
  },
});
```

Don't forget to allow 'Less Secure Apps' from account security options, if sending via Gmail.


## Resources

[MIT License](./LICENSE)
