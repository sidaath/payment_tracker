import AsyncStorage from "@react-native-async-storage/async-storage"
import { SERVICES } from "../App/Model/Keys"
import { addService, editService, findService, getAllServices, removeService } from "../App/Model/Services"
import ServiceObject from "../App/ViewModel/ServiceObject"


describe('Calling async storage with proeper arguments', ()=>{
    const t = new ServiceObject("t1", "T1 DESC", true, false, null)
    const t2 = new ServiceObject("t2", "T2 DESC", true, false, null)
    test('Save new service is called for the first time', async ()=>{
        const ar = [t]
        await addService(t)
        expect(AsyncStorage.setItem).toBeCalledWith(SERVICES, JSON.stringify(ar))
        AsyncStorage.clear()
    })
    
    test('Save new service is called when saved services already exist', async ()=>{
        const serviceArray = [t,t2]
        await addService(t)
        await addService(t2)
        expect(AsyncStorage.setItem).toBeCalledWith(SERVICES, JSON.stringify(serviceArray))
        AsyncStorage.clear()
    })

    test('Service is removed from a set of existing services.', async ()=>{
        await addService(t)
        await addService(t2)
        const t2ID = t2.serviceID
        await removeService(t2ID)
        const serviceArray = [t]
        expect(AsyncStorage.setItem).toBeCalledWith(SERVICES, JSON.stringify(serviceArray))
        AsyncStorage.clear()
    })

})

describe('Check if data is saved properly', ()=>{
    const t1 = new ServiceObject("T1", "T1 DESC", true, false, null)
    const t2 = new ServiceObject("T2", "T2 DESC", true, false, null)
    const t3 = new ServiceObject("T3", "T3 DESC", true, false, null)

    test('Data is saved, and it can be found by searching with serviceName', async () =>{
        
        await addService(t1)
        await addService(t2)
        await addService(t3)

        const service1 = await findService("T1")
        expect(service1.service).toEqual(t1)

        const service2 = await findService("T2")
        expect(service2.service).toEqual(t2)

        const service3 = await findService("T3")
        expect(service3.service).toEqual(t3)
        
    })

    test('Service with duplicate name is not saved and return error msg', async () =>{
        const res = await addService(t1)
        const expectedRes = {result : false, error :"Name already in use."}
        expect(res).toEqual(expectedRes)


        const res2 = await addService(t2)
        const expectedRes2 = {result : false, error :"Name already in use."}
        expect(res2).toEqual(expectedRes2)

        tempArray = [t1,t2,t3]
        const saved = await getAllServices()
        expect(saved.services).toEqual(tempArray)

        AsyncStorage.clear()
    })

})

describe('Remove service removes correct services', ()=>{
    const t1 = new ServiceObject("obj 1", "description 1", true, true, '2433')
    const t2 = new ServiceObject("obj 2", "description 2", false, true, '2500')
    const t3 = new ServiceObject("obj 3", "description 3", false, false, null)
    const t4 = new ServiceObject("obj 4", "description 4", true, false, null)
    const t5 = new ServiceObject("obj 5", "description 5", true, true, '23')

    test('Correct array is saved to disk after filtering out service to remove', async ()=>{
        await addService(t1)
        await addService(t2)
        await addService(t3)
        await addService(t4)
        await addService(t5)

        await removeService(t1.serviceID)
        const expectedArray  = [t2,t3,t4,t5]
        expect(AsyncStorage.setItem).toBeCalledWith(SERVICES,JSON.stringify(expectedArray))
    })

    test('After removing services, other services are still there', async () =>{
        const expectedArray  = [t2,t3,t4,t5]
        const result = await getAllServices()
        expect(result.services).toEqual(expectedArray)
        AsyncStorage.clear()
    })
})

describe('Edit service calls async storage with edited values.', ()=>{
    test('Edited value is changed in the new array to be saved', async()=>{
        await AsyncStorage.clear()
        const t1 = new ServiceObject("x1", "description 1", true, true, '2433')
        const t2 = new ServiceObject("x2", "description 2", false, true, '2500')
        const t3 = new ServiceObject("x3", "description 3", false, false, null)
        const t4 = new ServiceObject("x4", "description 4", true, false, null)
        const t5 = new ServiceObject("x5", "description 5", true, true, '23')

        await addService(t1)
        await addService(t2)
        await addService(t3)
        await addService(t4)
        await addService(t5)

        const editedService = {...t4, serviceName : "Edited Name"}

        res = await editService(editedService)
        expect(res.index).toBe(3)
    })
})
