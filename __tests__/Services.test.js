import AsyncStorage from "@react-native-async-storage/async-storage"
import { SERVICES } from "../App/Model/Keys"
import { addService, findService, getAllServices } from "../App/Model/Services"
import ServiceObject from "../App/ViewModel/ServiceObject"


describe('Calling async storage with proeper arguments', ()=>{
    const t = new ServiceObject("t1", "T1 DESC", true, false, null)
    const t2 = new ServiceObject("t2", "T2 DESC", true, false, null)
    test('First service to be saved', async ()=>{
        const ar = [t]
        await addService(t)
        expect(AsyncStorage.setItem).toBeCalledWith(SERVICES, JSON.stringify(ar))
        AsyncStorage.clear()
    })
    
    test('Data already exists', async ()=>{
        const serviceArray = [t,t2]
        await addService(t)
        await addService(t2)
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
