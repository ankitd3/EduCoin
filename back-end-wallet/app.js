let lotion = require('lotion')
let { verifyTx } = require('./transaction')
let abs = require('math-abs')
let m = require('exact-math')

let app = lotion({
    initialState: {
        balances: {
            '0356f3af39823798e08dc8e2a92c90ee530a0f9548d9321ae924e78c3ca00a039b': 1000,
            '02aa2d536f5fb6721e297037e27275d3d9c7f21c917da2b38a79f2c07b9e5783e8': 400,
            '12aa2d536f5fb6721e297037e27275d3d9c7f21c917da2b38a79f2c07b9e5783e8': 400,
            '22aa2d536f5fb6721e297037e27275d3d9c7f21c917da2b38a79f2c07b9e5783e8': 400,
            '32aa2d536f5fb6721e297037e27275d3d9c7f21c917da2b38a79f2c07b9e5783e8': 400
        },
        ERP:{
            '0356f3af39823798e08dc8e2a92c90ee530a0f9548d9321ae924e78c3ca00a039b':10,
            '02aa2d536f5fb6721e297037e27275d3d9c7f21c917da2b38a79f2c07b9e5783e8': 40,
            '12aa2d536f5fb6721e297037e27275d3d9c7f21c917da2b38a79f2c07b9e5783e8': 40,
            '22aa2d536f5fb6721e297037e27275d3d9c7f21c917da2b38a79f2c07b9e5783e8': 40,
            '32aa2d536f5fb6721e297037e27275d3d9c7f21c917da2b38a79f2c07b9e5783e8': 40
        },
        Rating:{
            '0356f3af39823798e08dc8e2a92c90ee530a0f9548d9321ae924e78c3ca00a039b':{
                'python':{
                    '02aa2d536f5fb6721e297037e27275d3d9c7f21c917da2b38a79f2c07b9e5783e8':4,
                    '12aa2d536f5fb6721e297037e27275d3d9c7f21c917da2b38a79f2c07b9e5783e8':8,
                    '22aa2d536f5fb6721e297037e27275d3d9c7f21c917da2b38a79f2c07b9e5783e8':1
                }
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

    let rating = state.Rating[tx.sender][tx.skill][tx.receiver] || 0

    //console.log(rating)
    state.Rating[tx.sender][tx.skill][tx.receiver]=rating+tx.rate


    if((Object.keys(state.Rating[tx.sender][tx.skill]).length) == 4){
        
        let fee = 100

        state.balances[tx.sender]=state.balances[tx.sender]-fee

        let validators = state.Rating[tx.sender][tx.skill]

        let sum_rating=0
        let sum_ERP=0

        for(var validator in validators){
            sum_rating=sum_rating+state.Rating[tx.sender][tx.skill][validator]
            sum_ERP=sum_ERP+state.ERP[validator]
        }
        const mean_rating=m.div(sum_rating,4)
        const mean_ERP=m.div(sum_ERP,4)
        
        var reward_sum=0

        for(var validator in validators){

            var validator_ERP = state.ERP[validator]
            var validator_Rating = state.Rating[tx.sender][tx.skill][validator]

            var temp = m.mul(m.div(mean_ERP,validator_ERP),abs(m.sub(validator_Rating,mean_rating)))
            
            reward_sum+=m.div(fee,temp)
            
        }

        for(var validator in validators){

            var reward=0

            var validator_ERP = state.ERP[validator]
            var validator_Rating = state.Rating[tx.sender][tx.skill][validator]

            var temp = m.mul(m.div(mean_ERP,validator_ERP),abs(m.sub(validator_Rating,mean_rating)))
            var temp1 = m.div(fee,temp)

            reward=m.div(m.mul(temp1,fee),reward_sum)

            state.balances[validator]=m.add(state.balances[validator],reward)
        }

    }
}
let handler3 = (state,tx) => {

    let senderBal = state.balances[tx.public] || 0
    let senderERP = state.ERP[tx.public] || 0

    state.balances[tx.public]=senderBal+tx.balance

    state.ERP[tx.public]=senderERP+tx.erp

    console.log(state.balances[tx.public])
    console.log(state.ERP[tx.public])

}

//app.use(handler1)
//app.use(handler2)
app.use(handler3)
app.listen(3000)