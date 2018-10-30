let createHash = require('sha.js')
let secp256k1 = require('secp256k1')

// Transaction data structure
// {
//     amount, sender, receiver, nonce, signature
// }

let toBuffer = (data) => {
    return Buffer.from(data, 'hex')
}

let hashTx = (tx) => {
    return createHash('sha256').update(tx).digest()
}

let signTx = (privKey, tx) => {
    let txHash = hashTx(tx);
    //console.log("Transaction hash")
    //console.log(toBuffer(txHash))
    let { signature } = secp256k1.sign(txHash, toBuffer(privKey))
    //console.log("Signature")
    //console.log(signature)

    let signedTx = Object.assign({}, tx) // make a copy of tx
    signedTx.signature = signature.toString('hex') // add signature field
    //console.log("Added Signature Field")
    //console.log(signedTx)
    return signedTx
}

let verifyTx = (tx) => {
    let rawTx = Object.assign({}, tx) // make copy of tx
    delete rawTx.signature // remove signature field to get original hash
    let txHash = hashTx(rawTx)
    return secp256k1.verify(txHash, toBuffer(tx.signature), toBuffer(tx.sender))
}

module.exports = {
    verifyTx,
    signTx
}