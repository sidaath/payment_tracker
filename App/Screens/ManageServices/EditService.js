import React from 'react'
import {View,ScrollView,Text, StyleSheet} from 'react-native'
import { ActivityIndicator, Button, Card, Dialog, Paragraph, Portal, Provider } from 'react-native-paper'
import { deleteService, readAllServices } from '../../ViewModel/Services'
import { screenAddService } from '../ScreenNames'

class EditService extends React.Component{
    constructor(props){
        super(props)
        this.state = {loading : true, error : false, showDialog : false}
    }

    async componentDidMount(){  
        console.log("Edit Service mount")
        const readResult = await readAllServices()
        if(readResult.result === true){
            this.setState({services : readResult.services, loading : false})
        }else{
            readResult.error? this.setState({error : true, services : readResult.error, loading : false}) 
                                : this.setState({error  : true, services : false, loading : false})
        }
    }

    async componentDidUpdate(){
        console.log("Edit Service Update")
        const updateScreen = (readServices)=>{
            if(readServices.result === true){
                this.setState({
                    services : readServices.services,
                    loading : false,
                    reload : false
                })
            }else{
                if(readServices.error){
                    this.setState({
                        error : true,
                        services : readServices.error,
                        loading : false,
                        reload : false
                    })
                }else{
                    this.setState({
                        error : true,
                        services : false,
                        loading : false,
                        reload : false
                    })
                }
            }
        } 
        if(this.state.reload === true){
            const readServices = await readAllServices()
            updateScreen(readServices)
        }

        if(this.props.route?.params?.reload === true){
            this.props.route.params.reload = false
            const readServices = await readAllServices()
            updateScreen(readServices)
        }
    }

    render(){
        const nav = this.props.navigation

        const showDialog = (service)=>{
            this.setState({showDialog : true, serviceToRemove : service})
            console.log(service)
        }

        const closeDialog = () =>{
            this.setState({showDialog : false, serviceToRemove : null})
        }

        const removeService = async () =>{
            const response = await deleteService(this.state.serviceToRemove)
            let success, errorMsg = false
            if(response.result===true){
                success = true
                console.log("success removing service")
            }
            if(response.error){
                errorMsg = response.error
            }
            this.setState({showDialog : false,  serviceToRemove : null, reload :true, loading : true })
        }

        const editSelectedService = (service)=>{
            nav.navigate(screenAddService, {
                edit : service
            })
        }

        if(this.state.loading === true){
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }

        if(this.state.error && this.state.services){
            return(
                <View>
                    <Text>{`${this.state.services}`}</Text>
                </View>
            )
        }

        if(this.state.services.length === 0){
            return(
                <View>
                    <Text>No Services Saved</Text>
                </View>
            )
        }

        if(this.state.error && !this.state.services){
            return(
                <View>
                    <Text>Error unknown</Text>
                </View>
            )
        }
        return(
            <Provider>
            <ScrollView>
                {
                    this.state.services.map((service)=>{
                        return(
                            <Card key={service.serviceID} style={styles.serviceCard}>
                                <Card.Title title={service.serviceName} />
                                <Card.Content>
                                    <Paragraph>{`${service.serviceDescription}`}</Paragraph>
                                </Card.Content>
                                <Card.Actions style={{justifyContent :'flex-end'}}>
                                    <Button onPress={()=>{showDialog(service)}}>Delete</Button>
                                    <Button onPress={()=>{editSelectedService(service)}}>Edit</Button>
                                </Card.Actions>
                            </Card>
                        )
                    })
                }

                <Portal>
                    <Dialog visible={this.state.showDialog} onDismiss={()=>{this.setState({showDialog : false})}}>
                        <Dialog.Title>Confirm Action</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Remove service? This will remove service and all associated payments permanently.</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={()=>{removeService()}}>Confirm</Button>
                            <Button onPress={()=>{closeDialog()}}>Cancel</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>

                
            </ScrollView>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    loadingContainer : {
        height : '100%',
        justifyContent : 'center'
    },

    serviceCard : {
        marginTop : 10,
        marginHorizontal : 4
    }
})


export default EditService