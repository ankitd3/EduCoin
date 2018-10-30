let axios = require('axios')
let keys = require('./keys')
let { signTx } = require('./transaction')
let url = 'http://localhost:3000'

let genWallet = () => {
    let priv = keys.generatePrivateKey()
    let pub = keys.generatePublicKey(priv)
    return {priv: priv, pub: pub}
}

let addUser = async (wallet, amount, erp) => {
    let user = wallet.pub
    let currentState = await axios.get(url + '/state').then(res => res.data)
    let nonce = currentState.nonces[user] || 0

    //let tx = { balance, erp, public, nonce }
    let type = 0
    let receiver = 0
    let rate = 0
    let skill = 0

    let tx = {type, user, receiver , erp, rate, skill, amount, nonce}

    let signedTx = signTx(wallet.priv, tx)

    let result = await axios.post(url + '/txs', signedTx)
    return result.data
}

let sendCoin = async (wallet, receiver, amount) => {
    let sender = wallet.pub
    let currentState = await axios.get(url + '/state').then(res => res.data)
    let nonce = currentState.nonces[sender] || 0

    //let tx = { amount, sender, receiver, nonce }

    let type = 2
    let rate = 0
    let skill = 0
    let erp = 0

    let tx = {type, sender, receiver , erp, rate, skill, amount, nonce}
    //let tx = {2,sender, receiver, 0, 0, 0, amount, nonce}

    let signedTx = signTx(wallet.priv, tx)

    let result = await axios.post(url + '/txs', signedTx)
    return result.data
}

let getBalance = async (address) => {
    let state = await axios.get(url + '/state').then(res => res.data)
    return state.balances[address] || 0
}

let sendRating = async (wallet, validator, rate, skill) => {
    let claimant = wallet.pub //sender's public key 
    //current announced field for sender
    let currentState = await axios.get(url + '/state').then(res => res.data)
    let nonce = currentState.nonces[claimant] || 0
    //tr object
    //let tx = { rate, skill, sender, receiver, nonce }

    let type = 1
    let erp = 0
    let amount = 0

    let tx = {type, validator, claimant , erp, rate, skill, amount, nonce}
    
    //let tx = {1,validator,claimant,0,rate,skill,0,nonce}
    
    let signedTx = signTx(wallet.priv, tx)

    //post
    let result = await axios.post(url + '/txs', signedTx)
    return result.data
}

let claim = async (claimant_wallet,skill) => {

    let claimant = claimant_wallet.pub
    let currentState = await axios.get(url + '/state').then(res => res.data)
    let nonce = currentState.nonces[claimant] || 0

    let type = 3
    let erp = 0
    let amount = 0
    let sender = 0
    let rate = 0


    let tx = {type, sender, claimant , erp, rate, skill, amount, nonce}

    console.log(tx)

    let signedTx = signTx(claimant_wallet.priv, tx)

    console.log(signedTx)
    //post
    let result = await axios.post(url + '/txs', signedTx)
    return result.data

}

// tx = {type ,sender, receiver, erp, rate, skill, amount, nonce}
// case 1 (genWallet) = {0,user, Null, erp, Null, Null, amount, nonce}

// 2 (rate) = {1,validator, claimant, Null, rate, skill, Null, nonce}

// 2 (send coins) = {2,sender, receiver, Null, Null, Null, amount, nonce}

module.exports = {
    genWallet,
    sendCoin,
    sendRating,
    addUser,
    claim
}