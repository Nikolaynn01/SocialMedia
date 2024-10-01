import { EditLogin } from "./EditLogin"
import { EditPassword } from "./EditPassword"
import { SetPrivacy } from "./SetPrivacy"




export const Settings = () => {

    return <> 
        <SetPrivacy/>
        <EditPassword/>
        <EditLogin/>
    </>
}