import uuid from 'react-native-uuid';

export default class ServiceObject{
    constructor(serviceName, serviceDescription, monthly, fixedAmount, amount, serviceID){
        this.serviceName = serviceName
        this.serviceDescription = serviceDescription
        this.monthly = monthly
        this.fixedAmount = fixedAmount
        this.amount = fixedAmount ? amount : null
        
        if(serviceID === undefined){
            this.serviceID = uuid.v4()
        }else{
            this.serviceID = serviceID
        }
    }
}
