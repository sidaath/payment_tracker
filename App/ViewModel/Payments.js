import { savePaymentToStorage } from "../Model/Payments"

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