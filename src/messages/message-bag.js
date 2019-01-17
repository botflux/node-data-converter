/**
 * An error
 */
const MESSAGE_ERROR = 'error'
/**
 * A warning
 */
const MESSAGE_WARNING = 'warning'
/**
 * A notice
 */
const MESSAGE_NOTICE = 'notice'

/**
 * Message type colors
 */
const messageStyles = {
    [MESSAGE_ERROR]: `\x1b[31m`,
    [MESSAGE_WARNING]: "\x1b[33m",
    [MESSAGE_NOTICE]: "\x1b[37m"
}

/**
 * Represents a message
 */
class Message {
    /**
     * Initializes a new Message using an options object containing a type and a text.
     * 
     * @param {{}} options 
     */
    constructor ({ type = MESSAGE_ERROR, text = "Something went wrong" }) {
        this.type = type
        this.text = text
    }    

    /**
     * Returns the text of this message.
     * 
     * @returns {String} Message text
     */
    getText () {
        return this.text
    }

    /**
     * Returns the type of this message
     * 
     * @returns {String} Message type
     */
    getType () {
        return this.type
    }
}

/**
 * Handle all messages
 */
class MessageBag {
    /**
     * Initializes a new instance of MessageBag
     */
    constructor () {
        this.messages = []
    }

    /**
     * Add a new Message to the message bag.
     * 
     * @param {Message} message Message instance
     */
    addMessage (message) {
        this.messages = [...this.messages, ...[message]]
    }

    /**
     * Shows all messages added to this message bag.
     */
    showMessages () {
        this.messages.forEach((message) => {
            console.log(`${messageStyles[message.getType()]} ${message.getType()}: ${message.getText()}`)
        })
    }
}

/**
 * Application message bag instance
 */
let messageBag = null

/**
 * Returns the current MessageBag instance.
 * 
 * @returns {MessageBag} MessageBag instance
 */
const getMessageBag = () => {
    if (messageBag === null) messageBag = new MessageBag()
    return messageBag 
}

module.exports = {
    getMessageBag,
    Message,
    MessageBag,
    MESSAGE_ERROR,
    MESSAGE_NOTICE,
    MESSAGE_WARNING
}