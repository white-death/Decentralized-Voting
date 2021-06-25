import React, { useState } from 'react';
import blockchainApi from '../Api/blockChainApis';
import candidateImage1 from '../Assets/bjp.jpeg';
import candidateImage2 from '../Assets/shashi.jpg';
import './displayResults.css'
const InfoCard = ({ name, designation, vote }) => {
    return <div className="card">
        <img src={vote === 1 ? candidateImage1 : candidateImage2} alt="placeholder"  className="voterStatsImage" />
        <h3>{name}</h3>
        <span>Total votes :  </span>
        <span>{designation}</span>
        
        <br></br>
        <span className="college-name"></span>
    </div>
}


const DisplayResult = (props) => {

    const [isLoading, setLoading] = useState(false);

    const [array, setArray] = useState([]);


    React.useEffect(() => {
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

    return isLoading ? <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>Loading ...</div> :
        <div className="container" style={{height:"100vh !important"}}>
            <div className="hero">
                <h2>Voting stats</h2>
                <p>see voting results live here</p>
            </div>
            <div className="member-content">
            <div className="team-members-card">
            {array.map(item =>
                    <InfoCard name={item.name} designation={item.votes} vote={item.id}/>
                )}
                </div>
            </div>
        </div>

}
export default DisplayResult;