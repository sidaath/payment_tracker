import { readAllPayments, savePaymentToStorage } from "../Model/Payments"

export const markPayment = async (serviceName, payment) => {
    try{
        const response = await savePaymentToStorage(serviceName, payment)
        if(response.result){
            return {result : true}
        }else{
            return {result : false}
        }
    }catch(e){
        console.error("VM Payments.js, catch ",e)
        return {result : false}
    }
}

export const getPayments = async(serviceName)=>{
    try{
        const response = await readAllPayments(serviceName)
        if(response.result===true){
            return {result : true, payments : response.payments}
        }else{
            if(response.error){
                return {result : false, error : response.error}
            }
            return {result : false}
        }
    }catch(e){
        console.error("VM Payments.js, getPayments, catch ",e)
        return {result : false}
    }
}