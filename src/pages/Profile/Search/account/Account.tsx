import { 
  MDBCol,
  MDBContainer, 
  MDBRow, 
  MDBCard, 
}from 'mdb-react-ui-kit';

import { useParams } from "react-router-dom";
import { handleGetAccount } from "../../../../lib/api"
import { useEffect, useState } from "react";
import { IAccount } from "../../../../lib/types";
import { UserCard } from "./components/UserCard";
import { FollowRequest } from "./components/FollowRequest";
import { BlockUnblockUser } from "./components/BlockUnblockUser";
import { AccountPosts } from "./components/AccountPosts";



export const Account = () => {

    const {id} = useParams();

    const [account, setAccount] = useState<IAccount|null>(null);    

    useEffect(() => {
      if (id) {
          handleGetAccount(id)
          .then(response => {
              if (response.status == "ok") {
                  setAccount(response.payload as IAccount);
              } else {
                console.log(response);
              }
          })
      }
  }, [id]);
  
  return (
    account && <div className="gradient-custom-2" style={{backgroundColor: '#9DE2FF'}}>

      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <MDBCard>

              <UserCard
                account={account}
                setAccount={setAccount}
              />
              <FollowRequest
                account={account}
                setAccount={setAccount}
              />
              <BlockUnblockUser
                account={account}
                setAccount={setAccount}
              />
              <AccountPosts
                account={account}
                setAccount={setAccount}
              />

      
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}