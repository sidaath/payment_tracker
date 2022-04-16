import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVICES } from "./Keys";

export async function removeAllServices(){
    try{
        AsyncStorage.removeItem(SERVICES)
        return {result : true}
    }catch(e){
        console.error("ServicesDEV.js, failed remove all services : ",e)
    }
}