import React from 'react';
import { FaUserSecret } from 'react-icons/fa';
import { RiTeamLine } from 'react-icons/ri';
import { ImBooks } from 'react-icons/im';
import { BiHandicap } from 'react-icons/bi';
// import { GiPayMoney } from 'react-icons/gi';
import { AiFillThunderbolt } from 'react-icons/ai';
import { BsShieldLockFill } from 'react-icons/bs';
import { BsFillLockFill } from 'react-icons/bs';
import { FaRegEye} from 'react-icons/fa';



import FemalePlaceHolder from '../Assets/userPlaceholderFemale.png'
import MalePlaceHolder from '../Assets/malePlaceholder.png'
import './contacts.css';


const InfoCard = ({ name, designation, sex }) => {
    return <div className="card">
        <img src={sex === "female" ? FemalePlaceHolder : MalePlaceHolder} alt="placeholder" className="image" />
        <h3>{name}</h3>
        <span>{designation}</span>
        <br></br>
        <span className="college-name">MSRUAS</span>
    </div>
}

const InfoGraphicsCard = ({ content, icon }) => {
    return <div className="infographics">

        {icon}
        <h3>{content}</h3>
    </div>
}


const contactsPage = ({ handleChange }) => {

    const infographicsArray = [
        {
            icon: <RiTeamLine className="icon" />,
            content: "Long Queues during elections",

        },
        {
            icon: <FaUserSecret className="icon" />,
            content: "Security Breaches like data leaks, vote tampering",

        },
        {
            icon: <ImBooks className="icon" />,
            content: "Lot of paperwork involved, hence less eco-friendly and time-consuming"
        },
        {
            icon: <BiHandicap className="icon" />,
            content: "Difficult for differently-abled voters to reach polling booth",

        },

    ]

    const solutionArray = [
        {
            icon: <FaRegEye className="icon" />,
            content: "Transparent",

        },
        {
            icon: <AiFillThunderbolt className="icon" />,
            content: "Faster",

        },
        {
            icon: <BsShieldLockFill className="icon" />,
            content: "Immutable"
        },
        {
            icon: <BsFillLockFill className="icon" />,
            content: "Secure",

        },
    ]
    return (
        <>

            <div className="container">
                <div className="hero">
                    <h2>Decentralized Voting System using Blockchain</h2>
                    <p>Blockchain is a technology that is rapidly gaining momentum in era of
                        industry 4.0. With high security and transparency provisions, it is
                        being widely used in supply chain management systems, healthcare, payments, business,
                        IoT, voting systems, etc.
                    </p>
                </div>
                <div className="easy-fi-box">

                    <div className="box-header">
                        <h2>Why do we need it?</h2>
                        <p>Current voting systems like ballot box voting or electronic voting suffer from various security threats such as DDoS attacks, polling booth capturing, vote alteration and manipulation, malware attacks, etc, and also require huge amounts of paperwork, human resources, and time. This creates a sense of distrust among existing systems.
                            Some of the disadvantages are:
                        </p>
                    </div>
                    <div className="infographics-section">
                        {infographicsArray.map(item =>
                            <InfoGraphicsCard content={item.content} icon={item.icon} />
                        )}
                    </div>

                </div>
                <div className="easy-fi-box">

                    <div className="box-header">
                        <h2>Solution</h2>
                        <p> Using blockchain, voting process can be made more secure, transparent, immutable, and reliable. How? Let’s take an example

                            Suppose voter goes to polling booth and cast's his vote using EVM, then there must be a scenario of vote tempering with microchips. Since there is no tracking back functionality in it. But with the block chain technology, every vote has it's transaction ID which is traceble. Also it secures all confidential data of voters and protects it from hackers using blockchain and encyption algorithms.

                        </p>
                    </div>
                    <div className="infographics-section">
                        {solutionArray.map(item =>
                            <InfoGraphicsCard content={item.content} icon={item.icon} />
                        )}
                    </div>

                </div>


                <div className="member-content">

                    <h2>Mentor</h2>

                    <InfoCard name="Mrs. Santoshi Kumari" designation="Asst. Professor" sex="female" />
                </div>


                <div className="member-content">

                    <h2>Team</h2>
                    <div className="team-members-card">

                        <InfoCard name="Ayush Prajapati" designation="Members" sex="male" />
                        <InfoCard name="Sandipan Chakraborty" designation="Members" sex="male" />
                        <InfoCard name="Shashi kumar" designation="Members" sex="male" />
                    </div>
                </div>


            </div>
        </>
    );

}
export default contactsPage
