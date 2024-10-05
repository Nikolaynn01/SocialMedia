
import { EditLogin } from "./components/EditLogin"
import { EditPassword } from "./components/EditPassword"
import { SetPrivacy } from "./components/SetPrivacy"




export const Settings = () => {

    return <> 
        <SetPrivacy/>
        <EditPassword/>
        <EditLogin/>
    </>
}