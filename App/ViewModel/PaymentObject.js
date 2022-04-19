import uuid from 'react-native-uuid';


export default class PaymentObject{
    constructor(serviceName, dateOfPayment, paymentAmount, billingMonth, paymentMethod,paymentID){
        this.serviceName = serviceName
        this.dateOfPayment = dateOfPayment
        this.paymentAmount = paymentAmount
        if(billingMonth !== undefined){
            this.billingMonth = billingMonth
        }

        this.paymentMethod = paymentMethod

        if(paymentID !== undefined){
            this.paymentID = paymentID
        }else{
            this.paymentID = uuid.v4()
        }
    }
}