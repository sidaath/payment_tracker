import AsyncStorage from "@react-native-async-storage/async-storage";

function paymentsKey(serviceName){
    return `${serviceName}-payments`
}

export async function savePaymentToStorage(serviceName, payment){
    const key = paymentsKey(serviceName)
    try{
        const savedPaymentsJSON = await AsyncStorage.getItem(key)
        if(savedPaymentsJSON === null){
            const payments = [payment]
            await AsyncStorage.setItem(key, JSON.stringify(payments))
            return {result : true}
        }else{
            const savedPayments = JSON.parse(savedPaymentsJSON)
            const newPayments = [...savedPayments, payment]
            await AsyncStorage.setItem(key, JSON.stringify(newPayments))
            return {result : true}
        }
    }catch(e){
        console.error("Payments.js, savePaymentToStorage, catch ",e)
        return {result : false}
    }
}


export async function alterSavedPayment(serviceName, payment){
    const PAYMENTS_KEY = paymentsKey(serviceName)
    try{
        const savedPaymentsJSON = await AsyncStorage.getItem(PAYMENTS_KEY)
        if(savedPaymentsJSON === null){
            return {result : false, error : "Could not find payment"}
        }
        const savedPayments = JSON.parse(savedPaymentsJSON)
        const index = savedPayments.findIndex((item)=>item.paymentID === payment.paymentID)
        if(index === -1) return {result : false, error :" Could not find payment to modify."}
        savedPayments[index] = payment
        await AsyncStorage.setItem(PAYMENTS_KEY, JSON.stringify(savedPayments))
        return {result : true}
    }catch(e){
        console.error("Payments.js, alterSavedPayment, catch ",e)
        return {result : false}
    }
}

export async function erasePayment(serviceName, paymentID){
    const PAYMENTS_KEY = paymentsKey(serviceName)
    try{
        const savedPaymentsJSON = await AsyncStorage.getItem(PAYMENTS_KEY)
        if(savedPaymentsJSON === null){
            return {result : false, error : "No saved payments found"}
        }

        const savedPayments = JSON.parse(savedPaymentsJSON)
        const filteredPayments = savedPayments.filter((item)=>item.paymentID !== paymentID)
        await AsyncStorage.setItem(PAYMENTS_KEY, JSON.stringify(filteredPayments))
        return {result : true}
    }catch(e){
        console.error("Payments.js, erasePayment, catch ",e)
        return {result : false}
    }
}

export async function readAllPayments(serviceName){
    const PAYMENTS_KEY = paymentsKey(serviceName)
    try{
        const savedPaymentsJSON = await AsyncStorage.getItem(PAYMENTS_KEY)
        if(savedPaymentsJSON === null){
            return {result : false, error : "No saved payments found"}
        }else{
            return {result : true, payments : JSON.parse(savedPaymentsJSON)}
        }
    }catch(e){
        console.error("Payments.js, readAllPayments , catch ",e)
        return {result : false}
    }
}


export async function eraseServicePayments(serviceName){
    const PAYMENT_KEY = paymentsKey(serviceName)
    try{
        await AsyncStorage.removeItem(PAYMENT_KEY)
        return {result : true}
    }catch(e){
        console.error("Payments.js, eraseServicePayments, catch ",e)
        return {result : false}
    }
}

