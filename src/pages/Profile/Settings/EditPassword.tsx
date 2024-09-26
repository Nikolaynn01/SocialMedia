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
import { handlePassUpd } from '../../../lib/api';
import { IPassUpd } from '../../../lib/types';

const schema = yup.object().shape({
    old : yup.string().required("Enter your password"),
    newpwd : yup.string().min(8).required("password must be at least 8 characters")
});

export const EditPassword = () => {

    const navigate = useNavigate();

    const {register, handleSubmit, setError, formState: { errors }} = useForm({
        resolver : yupResolver(schema)
    });

    const handleAdd = (data : IPassUpd) => {

        handlePassUpd(data) 
        .then(response => {
            if (response.status == "error") {
                if (response.message) {
                    setError("old", {
                        message : response.message
                    })
                } else {
                    setError("old", {
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
                            <form onSubmit={handleSubmit(handleAdd)}>
                                {errors.old && <p style={{color : "red"}}>{errors.old.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='old password'
                                    type='password'
                                    {...register("old", {required : true})}
                                />
                                {errors.newpwd && <p style={{color : "red"}}>{errors.newpwd.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='new password'
                                    type='password'
                                    {...register("newpwd", {required : true})}
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