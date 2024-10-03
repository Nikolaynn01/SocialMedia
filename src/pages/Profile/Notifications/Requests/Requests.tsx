import { useEffect, useState } from "react";
import { handleAcceptRequest, handleDeclineRequest, handleRequests } from "../../../../lib/api";
import { IContextRequests, IRequestedUser } from "../../../../lib/types";
import { BASE_URL, DEFAULT_PIC } from "../../../../lib/constant";
import { useOutletContext } from "react-router-dom";

export const Requests = () => {

    const {handleDataRequests} = useOutletContext<IContextRequests>();

    const [requests, setRequests] = useState<IRequestedUser[]>([]);

    useEffect (() => {
        handleRequests()
        .then(response => {
            if (response.status == "ok") {
                setRequests(response.payload as IRequestedUser[])
            }    
        })
        handleDataRequests(requests);
    }, [requests]);

    return <>
        {
            requests.length > 0 
            ? <div className="requests_list">
                {
                  requests.map(request => 
                    <div key={request.id}>
                        <div className="request-container">
                            <div className="avatar-container">
                                <img 
                                    src={!request.user.picture? DEFAULT_PIC : BASE_URL + request.user.picture} 
                                    alt="Avatar" 
                                    className="avatar"
                                />
                            </div>
                            <div className="user-info">
                                <p className="user-name">{request.user.name + " " + request.user.surname}</p>
                                <div className="action-buttons"> 

                                <button className="accept" onClick={() => handleAcceptRequest(request.id)
                                                                        .then(response => {
                                                                            if (response.message == "accepted") {
                                                                                const temp = requests.filter(elem => elem.id != request.id);
                                                                                setRequests(temp);
                                                                            }  
                                                                            })                      
                                }>accept</button>

                                <button className="decline" onClick={() => handleDeclineRequest(request.id)
                                                                        .then(response => {
                                                                            if (response.message == "declined") {
                                                                                const temp = requests.filter(elem => elem.id != request.id);
                                                                                setRequests(temp);
                                                                                } 
                                                                            })
                                }>decline</button>
                
                                </div>
                            </div>
                        </div>
                    </div>
                  )
                }
            </div>
            : <div>
                <p><strong>Requets: </strong>{requests.length}</p>
            </div>
        }
    </>
}