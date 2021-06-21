import React from 'react';
import { Avatar, Grid, Link, Paper, TextField, Typography } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '../Containers/index.css';

    const LoginPage=({ handleChange})=>{
    

    const initialValues = {
        Username: '',
        Password: '',
        remember: false

    }
    const onSubmit = (values, props) => {
        console.log(values)
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 1500)
        console.log(props)
    }

    const validationSchema = Yup.object().shape({
        Username: Yup.string().email('Plese enter valid uername').required("Required"),
        Password: Yup.string()
            .required('No password provided!')
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    })




    return (
        <Paper elevation={10} className = "logpage">

            <Grid align='center'>
                <Avatar><LockIcon /></Avatar>
                <h2>Sign In</h2>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Grid className="username">
                            <Field as={TextField} id="outlined-user" name="Username"
                                label="Username" variant="outlined" fullWidth required
                                helperText={<ErrorMessage name="Username" />} />
                        </Grid>

                        <Grid className="password">
                            <Field as={TextField} id="outlined-pass" type="password" name="Password"
                                label="Password" variant="outlined" fullWidth required
                                helperText={<ErrorMessage name="Password" />} />
                        </Grid>

                        <Field as={FormControlLabel}
                            name="remember"
                            control={
                                <Checkbox color="primary" />
                            }
                            label="Remember me"/>

                        <Grid className="button">
                            <Button type='submit' variant="contained" color="primary" fullWidth endIcon={<SendIcon />} disabled={props.isSubmitting}>
                                {props.isSubmitting ? "Loading..." : "Sign in"}
                            </Button>

                        </Grid>
                    </Form>
                )}
            </Formik>


            <Typography>
                <Link href="#">
                    Forgot password?
                    </Link>
            </Typography>
            <Typography> Do you have an account?
                    <Link href="#" onClick={()=> handleChange("event",1)}>
                    &nbsp; Sign Up?
                    </Link>
            </Typography>
            </Paper>
    );

}
export default LoginPage