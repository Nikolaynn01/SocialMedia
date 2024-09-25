import React from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ILogin } from '../../lib/types';
import { handleSignIn } from '../../lib/api';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    login : yup.string().required("wrong login or password"),
    password : yup.string().min(8).required("wrong login or password")
})

export function Login() {

    const navigate = useNavigate();

    const {register, handleSubmit, setError, formState:{ errors }} = useForm({
        resolver: yupResolver(schema)
    });

    const hanldeAdd = (data : ILogin) => {

        handleSignIn(data)
        .then(response => {
            if (response.status == "error") { 
                if (response.message) {
                    setError("login", {
                        message : response.message,
                    })
                }
                else {
                    setError("login", {
                        message : "server error"
                    })                
                }
            } else {
                navigate("/profile");
            }
        })
        .catch(reject => {
            console.log(reject.data);
            
        })

    }


    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center'>

                <MDBCol lg='8'>

                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />

                        <MDBCardBody className='px-5'>

                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login Info</h3>
                            <p>Don't you have an account? <Link to={'/'}>Signup Now</Link></p>
                            <form onSubmit={handleSubmit(hanldeAdd)}>
                                {errors.login && <p style={{color : "red"}}>{errors.login.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Login'
                                    type='text'
                                    {...register("login", {required : true})}
                                />
                                {errors.password && <p style={{color : "red"}}>{errors.password.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    type='password'
                                    {...register("password", {required : true})}
                                />
                                <button type='submit' className='btn btn-outline-info' >Submit</button>
                            </form>



                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
    );
}
