from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from vote import vote

app = FastAPI()


@app.post("/vote")
def voting(tx_from: str, vote_to: int):
    """
    Gets Transaction Details

    Returns:
        [Hash]: [Transaction Generated]
    """
    tx_hash, tx_receipt, tx_block = vote(tx_from, vote_to)
    print ("last txn : {}".format(tx_hash))
    return {"tx_block":tx_block, "from": tx_from, "to": vote_to, "newHash":tx_hash}
    
