const MESSAGE_ERROR = 'error'
const MESSAGE_WARNING = 'warning'
const MESSAGE_NOTICE = 'notice'

const messageStyles = {
    [MESSAGE_ERROR]: `\x1b[31m`,
    [MESSAGE_WARNING]: "\x1b[33m",
    [MESSAGE_NOTICE]: "\x1b[37m"
}

/**
 * Represents a message
 */
class Message {
    constructor ({ type = MESSAGE_ERROR, text = "Something went wrong" }) {
        this.type = type
        this.text = text
    }    

    getText () {
        return this.text
    }

    getType () {
        return this.type
    }
}

/**
 * Handle all messages
 */
class MessageBag {
    constructor () {
        this.messages = []
    }

    addMessage (message) {
        this.messages = [...this.messages, ...[message]]
    }

    showMessages () {
        this.messages.forEach((message) => {
            console.log(`${messageStyles[message.getType()]} ${message.getType()}: ${message.getText()}`)
        })
    }
}

let messageBag = null

const getMessageBag = () => {
    if (messageBag === null) messageBag = new MessageBag()
    return messageBag 
}

module.exports = {
    getMessageBag,
    Message,
    MESSAGE_ERROR,
    MESSAGE_NOTICE,
    MESSAGE_WARNING
}