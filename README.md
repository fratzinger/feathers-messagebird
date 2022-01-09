# feathers-messagebird

A [feathers.js](https://feathersjs.com/) service adapter for [messagebird](https://messagebird.com).

[![npm](https://img.shields.io/npm/v/feathers-messagebird)](https://www.npmjs.com/package/feathers-messagebird)
[![libraries.io](https://img.shields.io/librariesio/release/npm/feathers-messagebird)](https://libraries.io/npm/feathers-messagebird)
[![npm](https://img.shields.io/npm/dm/feathers-messagebird)](https://www.npmjs.com/package/feathers-messagebird)
[![GitHub license](https://img.shields.io/github/license/fratzinger/feathers-messagebird)](https://github.com/fratzinger/feathers-messagebird/blob/master/LICENSE)



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
