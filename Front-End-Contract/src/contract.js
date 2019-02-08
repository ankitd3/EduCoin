const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_skill",
				"type": "string"
			}
		],
		"name": "claim",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_skill",
				"type": "string"
			}
		],
		"name": "increaseERP",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_userid",
				"type": "string"
			},
			{
				"name": "_isValidator",
				"type": "bool"
			}
		],
		"name": "signup",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "claimant",
				"type": "address"
			},
			{
				"name": "_skill",
				"type": "string"
			},
			{
				"name": "_rating",
				"type": "uint256"
			}
		],
		"name": "validate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_skill",
				"type": "string"
			}
		],
		"name": "returnERP",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"name": "userid",
				"type": "string"
			},
			{
				"name": "isValidator",
				"type": "bool"
			},
			{
				"name": "withdrawableEther",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
const address = '0x168b6e9759f99d6eb5c1dc1777b438c6574e933d';

module.exports = {abi, address};