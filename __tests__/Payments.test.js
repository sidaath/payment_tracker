import AsyncStorage from "@react-native-async-storage/async-storage"
import { alterSavedPayment, erasePayment, savePaymentToStorage } from "../App/Model/Payments"
import PaymentObject from "../App/ViewModel/PaymentObject"

describe('Payment CRUD operations on disk', ()=>{
    const newPayment = new PaymentObject('TestService','1/2/2022', 2300, undefined,undefined)
    const payment2 = new PaymentObject('TestService','1/3/2022', 2500, undefined,undefined)
    const payment3 = new PaymentObject('TestService','1/4/2022', 2800, undefined,undefined)

    test('A new payment is saved to disk', async ()=>{
        const val = [newPayment]
        await savePaymentToStorage('TestService', newPayment)
        expect(AsyncStorage.setItem).toBeCalledWith(`TestService-payments`, JSON.stringify(val))
    })

    test('A second payment is added to disk', async ()=>{
        const val = [newPayment, payment2]
        await savePaymentToStorage('TestService', payment2)
        expect(AsyncStorage.setItem).toBeCalledWith(`TestService-payments`, JSON.stringify(val))
    })

    test('A third payment is added to disk', async ()=>{
        const val = [newPayment, payment2, payment3]
        await savePaymentToStorage('TestService', payment3)
        expect(AsyncStorage.setItem).toBeCalledWith(`TestService-payments`, JSON.stringify(val))
    })

    test('A payment is edited succesfully', async ()=>{
        const editedPayment = {...payment2, paymentAmount : 99999}
        await alterSavedPayment('TestService', editedPayment)

        expect(AsyncStorage.getItem).toBeCalledWith('TestService-payments')

        const newArray = [newPayment, editedPayment, payment3]
        expect(AsyncStorage.setItem).toBeCalledWith('TestService-payments', JSON.stringify(newArray))
    })

    test('A payment is erased ', async()=>{
        await erasePayment('TestService', payment2.paymentID)
        const expectedAr = [newPayment, payment3]
        expect(AsyncStorage.setItem).toBeCalledWith('TestService-payments', JSON.stringify(expectedAr))
    })
})