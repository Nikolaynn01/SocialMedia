import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput,
}
from 'mdb-react-ui-kit';

import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { ILoginUpd, IPassUpd } from '../../../lib/types';
import { handleLoginUpd, handlePassUpd } from '../../../lib/api';

const schema_1 = yup.object().shape({
    old : yup.string().required("Enter your password"),
    newpwd : yup.string().min(8).required("password must be at least 8 characters")
});

const schema_2 = yup.object().shape({
    password : yup.string().required("Enter the password"),
    login : yup.string().required("Enter a login")
});

export const Settings = () => {

    const navigate = useNavigate();

    const {register: registerForm1, handleSubmit: handleSubmitForm1, setError : setErrorForm1, formState: { errors: errorsForm1 }} = useForm({
        resolver : yupResolver(schema_1)
    });

    const {register: registerForm2, handleSubmit: handleSubmitForm2, setError : setErrorForm2, formState: { errors: errorsForm2 }} = useForm({
        resolver : yupResolver(schema_2)
    });

    const handleAdd1 = (data : IPassUpd) => {

        handlePassUpd(data) 
        .then(reaponse => {
            if (reaponse.status == "error") {
                if (reaponse.message) {
                    setErrorForm1("old", {
                        message : reaponse.message
                    })
                } else {
                    setErrorForm1("old", {
                        message : "server error"
                    })
                }
            } else {
                navigate("/profile");
            }
        })
    }

    const handleAdd2 = (data : ILoginUpd) => {

        handleLoginUpd(data)
        .then(response => {
            if (response.status == "error") {
                if (response.message) {
                    setErrorForm2("login", {
                        message : response.message
                    })
                } else {
                    setErrorForm2("login", {
                        message : "server error"
                    })
                }
            } else {
                navigate("/profile");
            }
        })
    }
    return (
        <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center'>
                <MDBCol lg='8'>
                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardBody className='px-5'>
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Password Update</h3>
                            <form onSubmit={handleSubmitForm1(handleAdd1)}>
                                {errorsForm1.old && <p style={{color : "red"}}>{errorsForm1.old.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='old password'
                                    type='password'
                                    {...registerForm1("old", {required : true})}
                                />
                                {errorsForm1.newpwd && <p style={{color : "red"}}>{errorsForm1.newpwd.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='new password'
                                    type='password'
                                    {...registerForm1("newpwd", {required : true})}
                                />
                                <button type='submit' className='btn btn-outline-info' >Submit</button>
                            </form>
                        </MDBCardBody>

                    
                    </MDBCard>

                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardBody className='px-5'>
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login Update</h3>
                            <form onSubmit={handleSubmitForm2(handleAdd2)}>
                                {errorsForm2.password && <p style={{color : "red"}}>{errorsForm2.password.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='password'
                                    type='password'
                                    {...registerForm2("password", {required : true})}
                                />
                                {errorsForm2.login && <p style={{color : "red"}}>{errorsForm2.login.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='login'
                                    type='text'
                                    {...registerForm2("login", {required : true})}
                                />
                                <button type='submit' className='btn btn-outline-info' >Submit</button>
                            </form>
                        </MDBCardBody>

                    
                    </MDBCard>

                </MDBCol>
            </MDBRow>

        </MDBContainer>
        
    )
}