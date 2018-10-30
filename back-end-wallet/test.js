let wallet = require('./wallet')

let person1 = {
    priv: '08fb26d7166bfbbb98032bb4efa5f498d0bca6500d06487d2be1b3c4d5d2132c',
    pub: '0356f3af39823798e08dc8e2a92c90ee530a0f9548d9321ae924e78c3ca00a039b'
}

//let person2 = '32aa2d536f5fb6721e297037e27275d3d9c7f21c917da2b38a79f2c07b9e5783e8'

let person2={ priv: '082788bd41b8d0871a4d9912cd8922db1580db1f343fd1eee892cd0499bc6086',
  pub: '02a586962c68b3fae02e22783566d3fa0969bebeb2dc3bbe221ca1cb20ee33c8fe' }

async function testSend(from,to,amount) {
    let result = await wallet.sendCoin(from, to, amount)
    console.log(result)
}

//testSend()

async function testRate() {
    let result = await wallet.sendRating(person1, person2.pub, 2, 'java')
    console.log(result)
}

async function generate_user() {


	var user=wallet.genWallet()

	console.log(user)

    let result = await wallet.addUser(user, 2000, 50)
    console.log(result)

}
async function claim(claimant,skill) {
    let result = await wallet.claim(claimant, skill)
    console.log(result)
}

//claim(person2,'java')
//testSend(person2,person1.pub,1000)
//generate_user()
testRate()