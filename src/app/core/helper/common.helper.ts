import { GlobalConstant } from "../constants/GlobalConstant";
import { ILoginUser } from "../models/interface/common.model";

function readLoggedUserData():ILoginUser|undefined{
    const loggedData = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_KEY)
    if(loggedData!=null){
        return JSON.parse(loggedData) as ILoginUser
    }
    return undefined
}

export {readLoggedUserData}