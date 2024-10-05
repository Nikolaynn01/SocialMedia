import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBInput,
} from 'mdb-react-ui-kit';

import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { ILoginUpd } from '../../../../lib/types';
import { handleLoginUpd } from '../../../../lib/api';


const schema = yup.object().shape({
    password : yup.string().required("Enter the password"),
    login : yup.string().required("Enter a login")
});

export const EditLogin = () => {

    const navigate = useNavigate();
    
    const {register, handleSubmit, setError, formState: { errors }} = useForm({
        resolver : yupResolver(schema)
    });

    const handleAdd = (data : ILoginUpd) => {

        handleLoginUpd(data)
        .then(response => {
            if (response.status == "error") {
                if (response.message) {
                    setError("login", {
                        message : response.message
                    })
                } else {
                    setError("login", {
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
                        <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login Update</h3>
                            <form onSubmit={handleSubmit(handleAdd)}>
                                {errors.password && <p style={{color : "red"}}>{errors.password.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='password'
                                    type='password'
                                    {...register("password", {required : true})}
                                />
                                {errors.login && <p style={{color : "red"}}>{errors.login.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='login'
                                    type='text'
                                    {...register("login", {required : true})}
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