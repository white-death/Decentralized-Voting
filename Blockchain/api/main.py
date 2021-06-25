from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from vote import vote
from address import adr
from candidates import allInfo, info, addC

from pydantic import BaseModel
app = FastAPI()

class voteModel(BaseModel):
   tx_from: str
   vote_to: int

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/vote")
def voting(voter: voteModel):
    """
    Gets Transaction Details

    Returns:
        [Hash]: [Transaction Generated] and updates the database.
    """
    print(voter.tx_from,voter.vote_to)
    tx_from = voter.tx_from
    vote_to = voter.vote_to
    print(tx_from,vote_to)

    tx_hash, tx_receipt, tx_block = vote(tx_from, vote_to)
    print ("last txn : {}".format(tx_hash))
    return {"tx_block":tx_block, "from": tx_from, "to": vote_to, "newHash":tx_hash}
    

@app.get('/address')
def address(govID: str):
    """Returns a new Wallet Address with transaction details and updates the Database.
    """    
    address, tx_hash, tx_receipt = adr(govID)

    return {"newWalletAddress":address, "newHash":tx_hash}


@app.get('/allInfo')
def candidate():
    """Returns all available candidate information!

    Returns:
        [object]: [json]
    """
    return allInfo()

@app.get('/candidateInfo')
def candidateInfo(id: int):
    """Returns information only on the candidate ID requested!

    Args:
        id (int): [candidate_id]

    Returns:
        [object]: [json]
    """
    return info(id)

@app.post('/addCandidate')
def addCandidate(name: str):
    """Adds a new candidate to the list 

    Args:
        name (str): [Candidate's name]

    Returns:
        [Status]: [Confirmation if added or not.]
    """
    return addC(name)