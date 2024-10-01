import { useEffect, useState } from "react"
import { IUser } from "../../../lib/types"
import { handleSearch } from "../../../lib/api";
import { BASE_URL, DEFAULT_PIC } from "../../../lib/constant";
import { Link } from "react-router-dom";

export const Search = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [text, setText] = useState<string>("");

    useEffect(() => {
        if (!text.trim()) {
            setUsers([]);
        } else {
            handleSearch(text)
            .then(response => {
                setUsers(response.payload as IUser[]);
            })
        }
    }, [text]);

    return <div style={{padding:5}}>
        <input 
            type="text"
            placeholder="serch for a friends" 
            className="form-control"
            value={text}
            onChange={e => setText(e.target.value)}
        />

        {users.length > 0 && <small>{users.length} users found!</small>}

        <div className="list">
            {
                users.map(user => 
                    <div key={user.id}>
                        <img 
                            src={user.picture ? BASE_URL + user.picture : DEFAULT_PIC}
                        />
                        <p>{user.name} {user.surname}</p>
                        <Link to={"/profile/" + user.id}>account</Link>
                    </div> 
                )
            }
        </div>
    </div>
}