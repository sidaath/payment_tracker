import uuid from 'react-native-uuid';

export default class ServiceObject{
    constructor(serviceName, serviceDescription, monthly, fixedAmount, amount){
        this.serviceName = serviceName
        this.serviceDescription = serviceDescription
        this.monthly = monthly
        this.fixedAmount = fixedAmount
        this.amount = fixedAmount ? amount : null
        this.serviceID = uuid.v4()
    }
}
