import { createContext, useEffect, useState } from "react";
import type { user } from "../../intrefaces/User";
import axios from "axios";

 export let AuthContext = createContext()

 export default function AuthContextProvider({children}){
    let [userData , setUser] = useState<user | null>(null)
     async function Getprofile(Token){
        try {
            let {data} = await axios.get(`https://route-posts.routemisr.com/users/profile-data` ,{
                headers:{
                    Authorization:`Bearer ${Token} `
                }
            })
            setUser(data.data.user)
            console.log(data.data.user);
            
            console.log("6152");
            
        } catch (error) {
            console.log(error.response.message);
            
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("userToken")){
            Getprofile(localStorage.getItem("userToken"))
        }
    },[])
    console.log("6313");
    
    return<AuthContext.Provider value={{ userData , setUser}}>
        {children}
    </AuthContext.Provider>
}