import React from "react";
import {ScrollView} from 'react-native'
import { ActivityIndicator, Card } from "react-native-paper";
import { readAllServices } from "../../ViewModel/Services";
import { screenServicePaymentHistory } from "../ScreenNames";


class PaymentHistoryHome extends React.Component{

    constructor(props){
        super(props)
        this.state = {loading : true}
    }

    async componentDidMount(){
        const readResponse = await readAllServices()
        if(readResponse.result===true){
            this.setState({services : readResponse.services, loading : false})
        }
    }
    
    render(){

        const navigate = (service) =>{
            this.props.navigation.navigate(screenServicePaymentHistory, {
                service : service
            })
        }

        if(this.state.loading===true){
            return <ActivityIndicator />
        }
        return(
            <ScrollView>
                {this.state.services.map((service)=>{
                    return(
                        <Card key={service.serviceID} onPress={()=>{navigate(service)}}>
                            <Card.Title title={service.serviceName} />
                        </Card>
                    )
                })}
            </ScrollView>
        )
    }
}

export default PaymentHistoryHome