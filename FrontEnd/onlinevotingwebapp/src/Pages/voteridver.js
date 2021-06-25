import React, { useRef, useEffect, useState } from 'react';
//import axios from 'axios';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";
import { withRouter } from 'react-router-dom';


import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Grid, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AlertMessage from '../Component/notification';
import Checkbox from '@material-ui/core/Checkbox';
import SendIcon from '@material-ui/icons/Send';


import * as Yup from 'yup'
import userApi from '../Api/userApi'
import blockchainApi from '../Api/blockChainApis'
import '../Containers/index.css';
import '../Containers/var.css';

const VoterverifyPage = (props) => {
  const videoConstraints = {
    width: 480,
    height: 360,
    facingMode: "user"
  };

  //setup reference
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //  Load posenet
  const runFacemesh = async () => {
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const face = await net.estimateFaces({ input: video });
      console.log(face);


      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      ctx.save();
      requestAnimationFrame(() => { drawMesh(face, ctx) });


    }
  };


  useEffect(() => { runFacemesh() }, []);

  const [image, setImage] = useState('');


  const showImage = () => {
    let img = webcamRef.current.getScreenshot();
    setImage(img);
    console.log(img);

  };

  //form functions

  const initialValues = {
    Username: '',
    VoterID: '',
    remember: false

  }


  const [isLoading, setLoading] = React.useState(false)
  const [loginStatus, setLoginStatus] = React.useState("")

  const onSubmit = (values) => {
    let email = values.Username;
    let voterId = values.VoterID;
    console.log(values)
    setLoading(true)
    userApi.addVoterId({
      email: email,
      voterId : voterId
    }).then(
      res => {
        console.log(res.data);
        blockchainApi.getAddressAgainstId(voterId).then(res => {
          console.log(res.data)
          setLoading(false);
          setLoginStatus({ msg: "Voter id registered", key: Math.random(), status: "success" });
          setTimeout(()=>
                    props.history.push('/')
                ,3000)
        }).catch(err => {
          setLoading(false);
          if(err.response !== undefined){
          return setLoginStatus({ msg: err.response.data.message, key: Math.random(), status: "error" })
        }
        else{
          return setLoginStatus({ msg: "unexpected error occured", key: Math.random(), status:"error"})
}})
      }
    ).catch(err => {
      // console.log(err.response.data.message)
      setLoading(false);
      return setLoginStatus({ msg: err.response.data.message, key: Math.random(), status: "error" })
      // console.log(err)

    })
    console.log(props)
  }

  //validations
  const validationSchema = Yup.object().shape({
    Username: Yup.string().email('Plese enter valid uername').required("Required"),
    VoterID: Yup.string()
      .required('No password provided!')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters.')
  })


  return (
    <div className="VoterverifyPage">
      <h1 className="Varhead"> Identity Verification</h1>
        <header className="VoterverifyPage-header">
          {image === '' ? <Webcam audio={false} ref={webcamRef} videoConstraints={videoConstraints}
            style={
              {
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
              
              }
            }
          /> : <img src={image} alt="user"
            style={
              {
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
                
               
              }} />}
          <canvas ref={canvasRef}
            style={
              {
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
                
             
              }}
          />
        </header>

        {image !== '' ?
          <button onClick={(e) => {
            e.preventDefault();
            setImage('')
          }}
            className="webcam-btn">
            Retake Image</button> :
          <button onClick={(e) => {
            e.preventDefault();
            showImage();
          }}
            className="webcam-btn">Capture</button>
        }

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(props) => (
          <Form>
          <Form className="voterid" >
            <Grid className="username">
              <Field as={TextField} id="outlined-user" name="Username"
                label="Username" variant="outlined" fullWidth required
                helperText={<ErrorMessage name="Username" />} />
            </Grid>

            <Grid className="VoterIDNumber">
              <Field as={TextField} id="outlined-pass" type="VoterID" name="VoterID"
                label="VoterID" variant="outlined" fullWidth required
                helperText={<ErrorMessage name="VoterID" />} />
            </Grid>

            <Field as={FormControlLabel}
              name="Terms and Conditions"
              control={
                <Checkbox color="primary" />
              }
              label="Terms and Conditions" />
          </Form>
          <div className="buttonver">
                <Button type="submit" variant="contained" color="primary" fullWidth endIcon={<SendIcon />} >
                  {isLoading ? "Loading..." : "Register"}
                </Button>
          </div>
                {loginStatus ? <AlertMessage key={loginStatus.key} message={loginStatus.msg} status={loginStatus.status} /> : null}
                </Form>
        )}
      </Formik>

    </div>
  );
}


export default withRouter(VoterverifyPage);

