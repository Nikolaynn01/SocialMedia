import { IAccountProps } from "../../../../../lib/types"
import { IAccount } from "../../../../../lib/types";
import { handleBlock } from "../../../../../lib/api";


export const BlockUnblockUser:React.FC<IAccountProps> = ({account, setAccount}) => {
    
    const handleBlockUnblock = () => {
        if (account?.id) {
          handleBlock(account.id) 
          .then(response => { 
            if (account.connection.blockedMe) {
              setAccount({
                ...account,
                picture:"",
                cover : "",
                posts:[],
                followers : [],
                following : [],
                available : false
              })
            } 
            else  {
              setAccount(response.payload as IAccount)
            }       
          })
        }
    }

    console.log(account);
    

    return account.available && (
        <div className="block-btn-container">
            <button style={{backgroundColor:"red"}} onClick={handleBlockUnblock}>
                {
                    account?.connection.didIBlock 
                    ? "Unblock"
                    : "Block"
                }
            </button>
        </div>
    )
}