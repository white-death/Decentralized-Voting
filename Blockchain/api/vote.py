import json
from web3 import Web3

chain_url = "HTTP://127.0.0.1:7545"
web3 = Web3(Web3.HTTPProvider(chain_url))

abi = json.loads('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_candidateId","type":"uint256"}],"name":"voted","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"candidates","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"candidatesCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_candidateId","type":"uint256"}],"name":"doVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"voter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]')
address = web3.toChecksumAddress("0x5fC6E46043089C4d860b4981e50127A1b1d3D212")
contract = web3.eth.contract(address=address, abi=abi)

def vote(tx_from, vote_to):
    web3.eth.default_account = tx_from
    
    tx = contract.functions.doVote(vote_to).transact()
    tx_hash = (web3.toHex(tx))
    tx_receipt = (web3.eth.waitForTransactionReceipt(tx_hash))  
    tx_block = (web3.eth.blockNumber)
    
    return tx_hash, tx_receipt, tx_block


   
