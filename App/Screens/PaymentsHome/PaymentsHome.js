import React from "react";
import {ScrollView} from 'react-native'
import { ActivityIndicator, Card, Title } from "react-native-paper";
import { readAllServices } from "../../ViewModel/Services";
import { screenMakePayment } from "../ScreenNames";

class PaymentsHome extends React.Component{
    constructor(props){
        super(props)
        this.state = {loading : true, services : false, error : false}
    }

    async componentDidMount(){
        const servicesResponse = await readAllServices()
        if(servicesResponse.result === true){
            this.setState({services : servicesResponse.services, loading : false})
        }
        if(servicesResponse.result === false && servicesResponse.error){
            this.setState({error : true, loading : false, errorMsg :servicesResponse.error })
        }
    }

    async componentDidUpdate(){
        if(this.state.reload === true){
            this.setState({loading : true})
            const servicesResponse = await readAllServices()
            if(servicesResponse.result === true){
                this.setState({services : servicesResponse.services, loading : false})
            }
        }
    }

    render(){

        const handlePress = (service) =>{
            this.props.navigation.navigate(screenMakePayment, {
                service : service
            })
        }

        if(this.state.loading){ return <ActivityIndicator />}

        if(this.state.error){
            return(
                <Title>{this.state.errorMsg}</Title>
            )
        }

        return(
            <ScrollView>
                {this.state.services.map((service)=>{
                    return(
                        <Card key={service.serviceName} onPress={()=>{handlePress(service)}}>
                            <Card.Title title={service.serviceName} />
                        </Card>
                    )
                })}
            </ScrollView>
        )
    }
}

export default PaymentsHome