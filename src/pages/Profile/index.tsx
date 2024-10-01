import { useEffect, useState } from "react"
import { Outlet, NavLink} from "react-router-dom"
import { handleLogout, handleVerify } from "../../lib/api"
import { useNavigate } from "react-router-dom"
import { IWideUser } from "../../lib/types"

export const Profile = () => {

    const navigate = useNavigate();
    const [account, setAccount] = useState<IWideUser|null>(null);

    useEffect(() => {
        handleVerify()
        .then(response => {
            if (!response.user) {
                navigate("/login")
            } else {
                setAccount(response.user);                
            }
        })
    }, []);

    const logout = () => {
        handleLogout()
        .then(response => {
            if (response.status == "ok") {
                navigate("/login");
                setAccount(null);
            } 
        })
    }

    return account && <>
        <nav>
            <NavLink to="/profile" end>Profile</NavLink>
            <NavLink to="/profile/settings">Settings</NavLink>
            <NavLink to="/profile/search">Search</NavLink>
            <NavLink to="/profile/posts">Posts</NavLink>
            <NavLink to="/profile/followers">Followers</NavLink>
            <NavLink to="/profile/followings">Folowings</NavLink>
            <button onClick={() => logout()}>Logout</button>
        </nav>
        <Outlet
            context={{account, setAccount}}
        />
    </>
}