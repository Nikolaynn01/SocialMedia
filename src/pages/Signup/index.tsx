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
import { Link, useNavigate } from 'react-router-dom';
import {InputUser} from "../../lib/types.ts"
import { handleSignUp } from '../../lib/api.ts';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
    name : yup.string().required("Please enter your first name."),
    surname : yup.string().required("Please enter your last name."),
    login : yup.string().required("Please choose a login."),
    password : yup.string().min(8).required("Please enter a password.")
})

export function Signup() {

    const navigate = useNavigate();

    const {register, handleSubmit, formState : {errors}, setError} = useForm({
        resolver : yupResolver(schema)
    })
   
    const handleAdd = (data : InputUser) => {

        handleSignUp(data)
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
                navigate("/profile")
            }
        })
    }


    return (
        <MDBContainer fluid>

            <MDBRow className='d-flex justify-content-center align-items-center'>

                <MDBCol lg='8'>

                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />

                        <MDBCardBody className='px-5'>

                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
                            <p>Already have an account? <Link to={'/login'}>Login Now</Link></p>

                            <form onSubmit={handleSubmit(handleAdd)}>
                                {errors.name && <p style={{color : "red"}}>{errors.name.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Name'
                                    type='text'
                                    {...register("name", {required : true})}
                                />
                                {errors.surname && <p style={{color : "red"}}>{errors.surname.message}</p>}
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Surname'
                                    type='text'
                                    {...register("surname", {required : true})}
                                />
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
