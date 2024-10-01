import { useNavigate, useParams } from "react-router-dom";
import { handleCancelRequest, handleGetAccount, handleSendFollow, handleUnfollow } from "../../../lib/api"
import { useEffect, useState } from "react";
import { IAccount } from "../../../lib/types";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant";
import { Gallery } from "../../../components/Gallery";


export const Account = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const [account, setAccount] = useState<IAccount|null>(null);

    const handleRequest = () => {
      if (account) {
        if (account.connection.following) {
          unfollowUser();
        } else if (account.connection.requested) {
          cancelRequest();
        } else {
          followUser();
        }
      }
    }

    const followUser = () => {
      if (account) {
        handleSendFollow(account.id)
        .then(response => {
          if (response.status == "following") {
            setAccount({
              ...account, 
              connection : {...account.connection, following : true}
            })
          } 
          else if (response.status == "requested") {
            setAccount({
              ...account,
              connection : {...account.connection, requested : true}
            })
          }
        })
      }
    }

    const unfollowUser = () => {
        if (account) {
          handleUnfollow(account.id)
          .then(response => {
            if (response.status == "unfollowed") {
              setAccount({
                ...account,
                connection : {...account.connection, following : false}
              })
            }
          })
        }
    }

    const cancelRequest = () => {
      if (account) {
        handleCancelRequest(account.id)
        .then(response => {
          console.log(response);
          if (response.status == "cancelled") {
            setAccount({
              ...account,
              connection : {...account.connection, requested : false}
            })
          }
        })
      }
    }

    useEffect(() => {
        if (id) {
            handleGetAccount(id)
            .then(response => {
                if (response.status == "ok") {
                    setAccount(response.payload as IAccount);
                } else {
                  navigate("/profile");
                }
            })
        }
    }, [id, navigate]);   

    return (

        <div className="gradient-custom-2" 
          style={{ backgroundColor: '#9DE2FF' }}>

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
                    <div className="d-flex justify-content-end text-center py-1">

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

                  <button onClick={handleRequest} className="btn btn-info">
                    {
                      account?.connection.following 
                      ? "UNFOLLOW"
                      : account?.connection.followsMe
                      ? "FOLLOW BACK"
                      : account?.connection.requested
                      ? "CANCEL REQUEST"
                      : "FOLLOW"
                    }
                  </button>

                  <MDBCardBody className="text-black p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <MDBCardText className="lead fw-normal mb-0"></MDBCardText>
                    </div>
                  </MDBCardBody>
                  {account?.isPrivate == "0" 
                  ? <Gallery posts={account?.posts}/> 
                  : <div style={{display:"flex", justifyContent:"space-around", padding:"20px"}}>
                        <div style={{textAlign:"center"}}>
                            <img 
                                style={{height:"150px", width:"150px"}}
                                src="https://cdn0.iconfinder.com/data/icons/mix-pack-8/44/Asset_18-512.png" 
                            />
                            <p>This account is private</p>
                        </div>
                  </div>
                  }

                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      )
}