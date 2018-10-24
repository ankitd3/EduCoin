let wallet = require('./wallet')

let my = {
    priv: '08fb26d7166bfbbb98032bb4efa5f498d0bca6500d06487d2be1b3c4d5d2132c',
    pub: '0356f3af39823798e08dc8e2a92c90ee530a0f9548d9321ae924e78c3ca00a039b'
}

let receiver = '02aa2d537f5fb6720e297037e27275d3d9c7f21c917da2b38a79f2c07b9e5783e8'

async function testSend() {
    let result = await wallet.sendCoin(my, receiver, 10)
    console.log(result)
}

//testSend()

async function testRate() {
    let result = await wallet.sendRating(my, receiver, 9)
    console.log(result)
}

testRate()