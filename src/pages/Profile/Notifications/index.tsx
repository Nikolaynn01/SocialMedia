import { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { IRequestedUser } from "../../../lib/types"

export const Notifications = () => {

    const [notifications, setNotification] = useState<IRequestedUser[]>([]);

    const handleDataRequests = (data: IRequestedUser[]) => {
        setNotification(data);
    }

    return <>
        <div className="navigation">
            <NavLink to="/profile/notifications/requests">
                requests
                {notifications.length > 0 && (
                    <span style={{color:"red", marginLeft: "10px"}}>
                        ({notifications.length})
                    </span>
                )

                }
            </NavLink>
            <NavLink to="/profile/notifications/likes">likes</NavLink>
            <NavLink to="/profile/notifications/comments">comments</NavLink>
        </div>
        <Outlet context={{handleDataRequests}}/>
    </>
}