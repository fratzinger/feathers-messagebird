# feathers-messagebird

A [feathers.js](https://feathersjs.com/) service adapter for [messagebird](https://messagebird.com).

[![npm](https://img.shields.io/npm/v/feathers-messagebird)](https://www.npmjs.com/package/feathers-messagebird)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/fratzinger/feathers-messagebird/Node.js%20CI)](https://github.com/fratzinger/feathers-messagebird/actions/workflows/node.js.yml?query=branch%3Amain++)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/fratzinger/feathers-messagebird)](https://codeclimate.com/github/fratzinger/feathers-messagebird)
[![Code Climate coverage](https://img.shields.io/codeclimate/coverage/fratzinger/feathers-messagebird)](https://codeclimate.com/github/fratzinger/xxx)
[![David](https://img.shields.io/david/fratzinger/feathers-messagebird)](https://david-dm.org/fratzinger/feathers-messagebird)
[![npm](https://img.shields.io/npm/dm/feathers-messagebird)](https://www.npmjs.com/package/feathers-messagebird)
[![GitHub license](https://img.shields.io/github/license/fratzinger/xxx)](https://github.com/fratzinger/feathers-messagebird/blob/master/LICENSE)



## Installation

```bash
npm i feathers-messagebird
```

Also see:
- https://github.com/messagebird/messagebird-nodejs
- https://dashboard.messagebird.com/en/developers/access
- https://developers.messagebird.com/tutorials/send-sms-node

## Supported features
- [x] Messages
  - [create](https://developers.messagebird.com/api/sms-messaging/#send-outbound-sms) -> `create` method
  - [list](https://developers.messagebird.com/api/sms-messaging/#list-messages) -> `find` method
  - [read](https://developers.messagebird.com/api/sms-messaging/#view-an-sms) -> `get` method
  - [delete](https://developers.messagebird.com/api/sms-messaging/#available-http-methods) -> `remove` method

## Todo (contributions welcome)
- [ ] [Verify](https://developers.messagebird.com/quickstarts/verify-overview/)
- [ ] [Lookup](https://developers.messagebird.com/quickstarts/lookup-overview/)
- [ ] [WhatsApp](https://developers.messagebird.com/quickstarts/whatsapp-overview/)

## Usage

```js
const { MessageBirdSmsService } = require("feathers-messagebird");

app.use("/sms", new MessageBirdSmsService({
  accessKey: "YOUR_ACCESS_KEY" // get your accessKey: https://dashboard.messagebird.com/en/developers/access
}))

app.service("sms").create({
  originator : '31970XXXXXXX',
  recipients : [ '31970YYYYYYY' ],
  body : 'Hello World, I am a text message and I was hatched by Javascript code!'
})

```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run. It has full support for *Visual Studio Code*. You can use the debugger to set breakpoints.

## License

Licensed under the [MIT license](LICENSE).
