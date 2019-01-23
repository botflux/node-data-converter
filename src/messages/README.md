# Messages

This repository stores the message logic of this app. Message are used to advise the user when somethings went wrong when executing.

For example when a data is typed as number in the map but is a string, you will get a error message from this component.

Thoses messages **are not** really errors because they don't stop the program. If you want to exit the program just use throw.

## Classes

You have access to 2 classes :
- Message
- MessageBag

### Message

Represents just a message with a text and a priority (MESSAGE_ERROR|MESSAGE_WARNING|MESSAGE_NOTICE). Priority is used to style messages.

### Message bag

This class handle all message. It has a method for adding messages :
```js
// where message is a Message instance
addMessage (message)
```
It has also a method to displays all messages :
```js
showMessages()
```

## Shared

All the messages in the application need to be added in the same instance of MessageBag so you can access a singleton to do so.
```js
const messages = require('message-bag.js')
messages.getMessageBag()
```