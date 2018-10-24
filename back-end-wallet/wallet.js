let axios = require('axios')
let keys = require('./keys')
let { signTx } = require('./transaction')
let url = 'http://localhost:3000'

let genWallet = () => {
    let priv = keys.generatePrivateKey()
    let pub = keys.generatePublicKey(priv)
    return {priv: priv, pub: pub}
}

let sendCoin = async (wallet, receiver, amount) => {
    let sender = wallet.pub
    let currentState = await axios.get(url + '/state').then(res => res.data)
    let nonce = currentState.nonces[sender] || 0

    let tx = { amount, sender, receiver, nonce }
    let signedTx = signTx(wallet.priv, tx)

    let result = await axios.post(url + '/txs', signedTx)
    return result.data
}

let getBalance = async (address) => {
    let state = await axios.get(url + '/state').then(res => res.data)
    return state.balances[address] || 0
}

let sendRating = async (wallet, receiver, rate) => {
    let sender = wallet.pub //sender's public key 
    //current announced field for sender
    let currentState = await axios.get(url + '/state').then(res => res.data)
    let nonce = currentState.nonces[sender] || 0

    //tr object
    let tx = { rate, sender, receiver, nonce }
    let signedTx = signTx(wallet.priv, tx)

    //post
    let result = await axios.post(url + '/txs', signedTx)
    return result.data
}


module.exports = {
    genWallet,
    sendCoin,
    sendRating
}