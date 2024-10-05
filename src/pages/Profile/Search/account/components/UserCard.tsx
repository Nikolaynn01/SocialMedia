import { 
    MDBCol,
    MDBContainer, 
    MDBRow, 
    MDBCard, 
    MDBCardText, 
    MDBCardImage, 
    MDBTypography 
}from 'mdb-react-ui-kit';
import { DEFAULT_PIC, BASE_URL } from '../../../../../lib/constant';
import { IAccountProps } from '../../../../../lib/types';


export const UserCard:React.FC<IAccountProps>= ({account}) => {  
      
    return (
        <div className='gradient-custom-2'
        style={{ backgroundColor: '#9DE2FF' }}
        >
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="9" xl="7">
                        <MDBCard>
                            <div className="rounded-top text-white d-flex flex-row" 
                                 style={{ 
                                    backgroundImage : account?.cover 
                                    ? `url('http://localhost:4002/${account.cover}')` 
                                    : "none",
                                    backgroundColor : !account?.cover 
                                    ? "black" 
                                    : "transparent",
                                    backgroundSize : "cover",
                                    backgroundPosition : "center",
                                    height: '200px',
                                    }}
                            >
  
                  
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                <MDBCardImage 
                                    src = {!account?.picture ? DEFAULT_PIC : BASE_URL + account.picture}
                                    alt="Generic placeholder image" 
                                    className="mt-4 mb-2 img-thumbnail" 
                                    fluid 
                                    style={{ width: '150px', zIndex: '1' }} 
                                 />
                                </div>

                                <div className="ms-3" style={{ marginTop: '130px' }}>
                                    <MDBTypography tag="h5">{account?.name} {account?.surname}</MDBTypography>
                                    <MDBCardText>Erevan, Armenia</MDBCardText>
                                </div>

                            </div>

                            <div className="p-4 text-black" style={{ backgroundColor: '#F8F9FA' }}>
                   `        <div className="d-flex justify-content-end text-center py-1">

                                <div>
                                    <MDBCardText className="mb-1 h5">{account?.posts?.length}</MDBCardText>
                                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                                </div>


                                <div className="px-3">
                                    <MDBCardText className="mb-1 h5">{account?.followers?.length}</MDBCardText>
                                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                                </div>

                                <div>
                                    <MDBCardText className="mb-1 h5">{account?.following?.length}</MDBCardText>
                                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                                </div>

                            </div>
                        </div>

                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}