let lotion = require('lotion')
let { verifyTx } = require('./transaction')

let app = lotion({
    initialState: {
        balances: {
            '0356f3af39823798e08dc8e2a92c90ee530a0f9548d9321ae924e78c3ca00a039b': 1000
        },
        ERP:{
            '0356f3af39823798e08dc8e2a92c90ee530a0f9548d9321ae924e78c3ca00a039b':10
        },
        Rating:{
         '0356f3af39823798e08dc8e2a92c90ee530a0f9548d9321ae924e78c3ca00a039b':{
             '02aa2d536f5fb6721e297037e27275d3d9c7f21c917da2b38a79f2c07b9e5783e8':0
         }
        },
        nonces: {}
    }
})

let handler1 = (state, tx) => {
    let senderBalance = state.balances[tx.sender] || 0
    let receiverBalance = state.balances[tx.receiver] || 0

    // Verify Tx conditions
    if (!verifyTx(tx) || tx.sender === tx.receiver) {
        return
    }
    if (!Number.isInteger(tx.amount) || tx.amount > senderBalance) {
        return
    }
    if (tx.nonce !== (state.nonces[tx.sender] || 0)) {
        return
    }

    // Update state
    state.balances[tx.sender] = senderBalance - tx.amount
    state.balances[tx.receiver] = receiverBalance + tx.amount
    state.nonces[tx.sender] = (state.nonces[tx.sender] || 0) + 1
}

let handler2 = (state,tx) => {

    let rating = state.Rating[tx.receiver] || 0
    state.Rating[tx.sender][tx.receiver]=rating+tx.rate
    //console.log("Hi")
    console.log(state.Rating[tx.sender].length)
}


app.use(handler1)
app.use(handler2)
app.listen(3000)