import { addService, getAllServices } from "../Model/Services";
import { removeAllServices } from "../Model/ServicesDev";
import ServiceObject from "./ServiceObject";


export async function saveNewService(serviceName, serviceDescription, monthly, fixedAmount, amount){

    if(serviceDescription===''){
        serviceDescription = '-'
    }

    const service = new ServiceObject(serviceName, serviceDescription,monthly,fixedAmount,amount)

    const result = await addService(service)

    if(result.result === true) return {result : true}

    if(result.result === false && result.error){
        return {result : false, nameTaken : true }
    }

    return false
}



//dev
export async function viewAllServices(){
    try{
        const res = await getAllServices()
        if(res.result){
            return res.services
        }else{return []}
    }catch(e){
        console.error("ViewModel Services.js, dev, e",e)
    }
}

export async function deleteAll(){
    try{
        const res = await removeAllServices()
        return {result : res.result}
    }catch(e){
        console.error("VM Services.js, deleteAll catch ",e)
        return {result : false}
    }
}