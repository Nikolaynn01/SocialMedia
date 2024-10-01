import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';
import { handleSetAccount, handleVerify } from "../../../lib/api";
import { useEffect, useState } from "react";


export const SetPrivacy = () => {

    const [isPrivate, setIsPrivate] = useState<string>("0");
    const [error, setError] = useState<string>("");
    
    useEffect(() => {
        handleVerify()
        .then(response => {
            setIsPrivate(response.user?.isPrivate as string)
        })
    })

    const handleChangeStatus = () => {
        handleSetAccount()
        .then(response => {
            if (response.status == "ok") {
                setIsPrivate(response.payload as string);
            } else {
                setError("server error")
            }
        })
    }

    return <>
        <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center'>
                <MDBCol lg='8'>
                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardBody className='px-5'>

                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Privacy Settings</h3>

                            {isPrivate == "0" && <p>Current status : public</p>}
                            {isPrivate == "1" && <p>Current status : private</p>}

                            {error && <p style={{color:"red"}}>{error}</p>}

                            <div style={{display : "flex", justifyContent : "space-around", padding : "20px"}}>

                                <div style={{textAlign:"center"}}>
                                    <img 
                                        style={{cursor:"pointer", width:"120px", height:"120px"}}
                                        src="https://cdn4.iconfinder.com/data/icons/mix-pack-3/44/Asset_181-256.png" 
                                        onClick={() => {if (isPrivate == "1") {
                                            handleChangeStatus();
                                            setIsPrivate("0");
                                            setError("")
                                        } else {
                                            setError("Account already is public")
                                        }}
                                    }
                                    />
                                    <p>Public</p>
                                </div>

                                <div style={{textAlign:"center"}}>
                                    <img 
                                        style={{cursor:"pointer", width:"120px", height:"120px"}}
                                        src="https://cdn0.iconfinder.com/data/icons/mix-pack-8/44/Asset_18-512.png" 
                                        onClick={() => {if (isPrivate == "0") {
                                            handleChangeStatus();
                                            setIsPrivate("1");
                                            setError("")
                                        } else {
                                            setError("Account already is private")
                                        }}
                                    }
                                    />
                                    <p>Private</p>
                                </div>

                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    </>
}
