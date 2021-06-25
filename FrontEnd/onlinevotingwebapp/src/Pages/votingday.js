import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik'
import SendIcon from '@material-ui/icons/Send';
import AlertMessage from '../Component/notification';
import blockchainApi from '../Api/blockChainApis';
import '../Containers/candidate.css';
import storage from '../Controller/localStorageController'

import rap from '../Assets/contemplative-reptile.jpg';

import votingicon from '../Assets/vote.png';
import { data } from '@tensorflow/tfjs';
import candidateImage1 from '../Assets/bjp.jpeg';
import candidateImage2 from '../Assets/shashi.jpg';
import './displayResults.css';

const InfoCard = ({ name, designation, id, setVoteId }) => {
    return <div className="card">
        <img src={id === 1 ? candidateImage1 : candidateImage2} alt="placeholder" className="voterStatsImage" />
        <h3>{name}</h3>
        <span>{designation}</span>

        <br></br>
        <span className="college-name">
            <div className="candidate">
                <label>
                    <input type="radio" value={id} name="candidate" onChange={setVoteId} /> Candidate {id}
                </label>
            </div>
        </span>
    </div>
}



function VotedayPage(props) {

    const [isLoading, setLoading] = useState(false);
    const [loginStatus, setLoginStatus] = React.useState("");
    const [buttonLoading, setButtonLoading] = useState(false);
    const [voteId, setVoteId] = React.useState(null);
    const [array, setArray] = useState([]);
    const onSubmit = () => {
        console.log(voteId)
        setButtonLoading(true)
        let address = storage.getVal('walletAddress')
        console.log(address)
        let data = {
            'tx_from': address.toString(),
            'vote_to': parseInt(voteId)
        }
        console.log(data)
        blockchainApi.doVote(data).then(
            res => {
                console.log(res.data)
                setButtonLoading(false);
                setLoginStatus({ msg: "Successfully Voted!", key: Math.random(), status: "Success" })
                setTimeout(()=>
                    props.history.push('/')
                ,3000)
            }
        ).catch(err => {
            // console.log(err.response.data.message)
            setButtonLoading(false);
            
            setLoginStatus({ msg: "Unable to vote", key: Math.random(), status: "error" })
         
            // console.log(err)

        })
        // console.log(props)
    }


    useEffect(() => {
        setLoading(true);
        blockchainApi.getInfo().then(
            res => {
                setLoading(false)
                console.table(res.data)
                setArray(res.data)
            }
        ).catch(
            err => console.error(err)
        );
    }, [])

    const setVote = (e) => {
        console.log(e.target.value)
        setVoteId(e.target.value)
    }

    return isLoading ? <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>Loading ...</div> :
        <>
            <div className="container" style={{height:"100vh"}}>
                <div className="customhero">
                <img src={votingicon} alt="votingIcon" style={{ width: "50px", height: "50px" }} />
                    <h2> Choose your candidate</h2>
                </div>

                <div className="member-content">
                    <div className="team-members-card">
                        {array.map(item =>
                            <InfoCard name={item.name} designation={item.description} id={item.id} setVoteId={setVote} />
                        )}
                    </div>
                </div>

           
                    <div className="voteButton">
                        <Button onClick={onSubmit} variant="contained" color="primary" fullWidth endIcon={<SendIcon />} >
                            {buttonLoading ? "voting..." : "Vote"}
                        </Button>
                        {loginStatus ? <AlertMessage key={loginStatus.key} message={loginStatus.msg} status={loginStatus.status} /> : null}
                    </div>

            </div>

        </>


}
export default withRouter(VotedayPage);
