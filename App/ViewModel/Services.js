import { addService, editService, findService, getAllServices, removeService } from "../Model/Services";
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

export async function saveEditedService(service){
    try{
        const editResponse = await editService(service)
        if(editResponse.result === true){
                return {result : true, savedIndex : editResponse.index}
        }else{
            if(editResponse.error) return {result : false, error : editResponse.error}
        }
    }catch(e){
        console.error("VM Services.js, saveEditedService, catch : ",e)
        return {result : false}
    }
}

export async function deleteService(service){
    try{
        const res = await removeService(service.serviceID)
        if(res.result === true) return  {result : true}
        else{
            if(res.error) return {result : false, error :  res.error}
        }
        return {result : false}
    }catch(e){
        console.error("VM Services.jsm deleteService, catch ",e)
        return {result : false}
    }
}


export async function readAllServices(){
    try{
        const data = await getAllServices()
        if(data.result === true){
            return {result : true, services : data.services}
        }else{
            if(data.error) return {result : false, error : data.error}
        }
        return {result : false}
    }catch(e){
        console.error("ViewModel, Services, getAllServices\n",e)
        return {result : false}
    }
}

export async function searchServiceByName(serviceName){
    try{
        const res = await findService(serviceName)
        if(res.result === true){
            return {result : true, service : res.service}
        }else{
            if(res.error) return {result : false, error : res.error}
            return {result : false}
        }
    }catch(e){
        console.error("Services VM, readServiceByName, catch ",e)
    }
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