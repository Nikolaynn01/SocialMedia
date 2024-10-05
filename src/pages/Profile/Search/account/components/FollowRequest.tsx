import { IAccountProps } from "../../../../../lib/types"
import { handleSendFollow, handleUnfollow, handleCancelRequest } from "../../../../../lib/api";


export const FollowRequest:React.FC<IAccountProps> = ({account, setAccount}) => {

    const handleRequest = () => {
        if (account) {
          if (account.connection.following) {
            unfollowUser();
          } else if (account.connection.requested) {
            cancelRequest();
          } else if (account.connection.followsMe){
            followUser();
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
            if (response.status == "requested") {
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

    return (
        <div className="follow-btn-container">
            {
                <button onClick={handleRequest} className="btn btn-info">
                {
                  account?.connection.followsMe && !account.connection.requested
                  ? "Follow back"
                  : account?.connection.requested && !account.connection.following
                  ? "Cancel request"
                  : account?.connection.following
                  ? "Unollow"
                  : "Follow"
                }
              </button>
            }
        </div>
    )
}