import AsyncStorage from "@react-native-async-storage/async-storage"
import ServiceObject from "../App/ViewModel/ServiceObject"
import { readAllServices,  saveEditedService,  saveNewService, searchServiceByName } from "../App/ViewModel/Services"

describe('Checking service operations', ()=>{

    test('Saving new service', async ()=>{
        const res = await saveNewService("s1","desc",false,false,null)
        expect(res.result).toBe(true)

        const res2 = await saveNewService("s2","desc",false,false,null)
        expect(res2.result).toBe(true)
    })

    test('saving service with existing name', async ()=>{
        const res = await saveNewService("s1","desc",false,false,null)
        expect(res.result).toBe(false)
        expect(res.nameTaken).toBe(true)
    })

    test('reading all saved services', async()=>{
        const ob1 = new ServiceObject("s1","desc",false,false,null)
        const ob2 = new ServiceObject("s2","desc",false,false,null)
        delete ob1.serviceID
        delete ob2.serviceID

        const res = await readAllServices()
        expect(res.result).toBe(true)
        expect(res.services[0]).toEqual(expect.objectContaining(ob1))
        expect(res.services[1]).toEqual(expect.objectContaining(ob2))
    })

    test('searching a service by name', async ()=>{
        const service = await searchServiceByName("s1")
        expect(service.result).toBe(true)
        expect(service.service.serviceName).toBe("s1")
    })

    test('editing existing service', async()=>{
        const res = await searchServiceByName("s1")
        const service = res.service
        const saveRes = await saveEditedService(
            "s1 edited",
            service.serviceDescription,
            service.monthly,
            service.fixedAmount,
            service.amount,
            service.serviceID
        )
        expect(saveRes.result).toBe(true)

        const savedService = await searchServiceByName("s1 edited")
        expect(savedService.result).toBe(true)
        expect(savedService.service.serviceName).toBe("s1 edited")

        await AsyncStorage.clear()
    })

})


