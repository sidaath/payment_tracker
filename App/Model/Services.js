import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVICES } from './Keys';

export async function addService(newService){
    try{
        const savedServicesJSON = await AsyncStorage.getItem(SERVICES)
        if(savedServicesJSON === null){
            //first time function is called. 
            //no saved services yet.
            const services =[newService]
            await AsyncStorage.setItem(SERVICES, JSON.stringify(services))
            return {result : true}
        }else{
            //saved services exist. Not first service to be added.
            const savedServices = JSON.parse(savedServicesJSON)

            //check if name already in use
            const filtered = savedServices.filter((item)=>item.serviceName === newService.serviceName)
            if(filtered.length !==0){
                return {result : false, error :"Name already in use."}
            }
            const newServices = [...savedServices, newService]
            await AsyncStorage.setItem(SERVICES, JSON.stringify(newServices))
            return {result : true}
        }
    }catch(e){
        console.error("Services.js, addService, catch : ",e)
        return {result : false}
    }
}

export async function editService(editedService){
    const id = editedService.serviceID
    try{
        const servicesJSON = await AsyncStorage.getItem(SERVICES)
        if(servicesJSON === null){
            return {result : false, error : "No services saved."}
        }
        const services = JSON.parse(servicesJSON)
        const isRequiredService = (element) => element.serviceID === id
        const index = services.findIndex(isRequiredService)
        if(isNaN(index) || index === -1) return {result : false, error : "Service not found."}
        services[index] = editedService
        await AsyncStorage.setItem(SERVICES, JSON.stringify(services))
        return {result : true, index : index}
    }catch(e){
        console.error("Services.js, editService, catch : ",e)
        return {result : false}
    }
}

export async function findService(serviceName){
    try{
        const servicesJSON = await AsyncStorage.getItem(SERVICES)
        if(servicesJSON === null){
            return {result : false, error : "No saved services."}
        }else{
            const storedServices = JSON.parse(servicesJSON)
            const requiredService = storedServices.filter((item)=> item.serviceName === serviceName)
            if(requiredService.length === 0){
                return {result : false, error : "Could not find service."}
            }else{
                return {result : true, service : requiredService[0]}
            }
        }
    }catch(e){
        console.error("Services.js, findService, catch : ",e)
        return {result : false}
    }
}

export async function getAllServices(){
    try{
        const savedServicesJSON = await AsyncStorage.getItem(SERVICES)
        if(savedServicesJSON === null){
            return {result : false, error : "No services saved."}
        }else{
            return {result : true, services : JSON.parse(savedServicesJSON)}
        }
    }catch(e){
        console.error("Services.js, getAllServices, catch : ",e)
        return {result : false}
    }
}


export async function removeService(serviceID){
    try{
        const savedServicesJSON = await AsyncStorage.getItem(SERVICES)
        if(savedServicesJSON === null) return {result : false, error : "No services saved."}
        const savedServices = JSON.parse(savedServicesJSON)
        const newServices = savedServices.filter((service)=>service.serviceID !== serviceID)
        await AsyncStorage.setItem(SERVICES, JSON.stringify(newServices))
        return {result : true}
    }catch(e){
        console.error("Services.js, removeService, catch : ",e)
        return {result : false}
    }
}