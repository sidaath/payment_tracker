import React, {useEffect} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import { ActivityIndicator, Button, Card, RadioButton, Snackbar, TextInput } from 'react-native-paper'
import { saveNewService, saveEditedService } from '../../ViewModel/Services'
import { screenEditService } from '../ScreenNames'


export default function AddService({navigation, route}){
    useEffect(()=>{
        if(route.params?.edit){
            setName(route.params.edit.serviceName)
            setDescription(route.params.edit.serviceDescription)
            setMonthly(route.params.edit.monthly)
            setShowAmt(route.params.edit.fixedAmount)
            setAmount(route.params.edit.amount)
        }
    }, [route?.params?.edit])

    //loading
    const[loading, setLoading] = React.useState(false)

    //user input
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [monthly, setMonthly] = React.useState(null)
    const [showAmount, setShowAmt] = React.useState(null)
    const [amount, setAmount] = React.useState('')

    //snackbar
    const [snackbarSuccess, setSucces] = React.useState(false)
    const [snackbarFailure, setFailure] = React.useState(false)

    //errors
    const [nameErr , setNameEr] = React.useState(false)
    const [monthlyErr , setMonthlyEr] = React.useState(false)
    const [showAmtErr , setShowAmtEr] = React.useState(false)
    const [amtErr , setAmtEr] = React.useState(false)
    //reset errors
    const resetErrors = ()=>{
        setNameEr(false)
        setMonthlyEr(false)
        setShowAmtEr(false)
        setAmtEr(false)
    }
    //save new service
    const saveService = async () =>{
        resetErrors()
        let error = false
        if(name === ''){
            error = true
            setNameEr(true)
        }

        if(monthly === null){
            error = true
            setMonthlyEr(true)
        }

        if(showAmount === null){
            error = true
            setShowAmtEr(true)
        }

        if(showAmount && amount===''){
            error = true
            setAmtEr(true)
        }

        if(error){
            setFailure(true)
            return
        }

        setLoading(true)
        if(route.params?.edit){
            const response = await modifyExisting()
            response ? setSucces(true) : setFailure(true)
            navigation.navigate(screenEditService, {
                reload : true
            })
        }else{
            const response = await addNewService()
            response?setSucces(true) : setFailure(true)
        }

        setName('')
        setDescription('')
        setAmount('')
        setMonthly(null)
        setShowAmt(null)
        setLoading(false)
    }

    const addNewService = async () =>{
        const response = await saveNewService(name,description,monthly,showAmount,amount)
        if(response.result === true){
            return true
        }else{
            return false
        }
    }

    const modifyExisting = async () =>{
        const response = await saveEditedService(name,description,monthly,showAmount,amount, route.params.edit.serviceID)
        if(response.result === true){
            return true
        }else{
            return false
        }
    }

    if(loading) {
        return(
            <ActivityIndicator size='large' style={{top : 30}}/>
        )
    }


        return(
            <ScrollView>
                <Card style={styles.container}>
                    <Card.Title title="Name" subtitle="Mobitel-1, Dialog Mob etc"/>
                    <Card.Content>
                        <TextInput
                            mode='outlined' 
                            label="Service Name"
                            value={name}
                            onChangeText={(txt)=>{setName(txt)}}
                            error={nameErr}
                        />

                        <TextInput
                            multiline
                            numberOfLines={3}
                            mode='outlined' 
                            label="Description"
                            value={description}
                            onChangeText={(txt)=>{setDescription(txt)}}
                        />
                    </Card.Content>
                </Card>
                <Card style={styles.container}>
                    <Card.Title title="Details"/>
                    <Card.Content>
                        <Card style={showAmtErr? styles.cardError : styles.container} mode='elevated' elevation={4}>
                            <Card.Title title="Payment Frequency"/>
                            <Card.Content>
                                <RadioButton.Group onValueChange={val=>setMonthly(val)} value={monthly}>
                                    <RadioButton.Item label="Monthly" value={true} />
                                    <RadioButton.Item label="Non-Monthly" value={false} />
                                </RadioButton.Group>
                            </Card.Content>
                        </Card>

                        <Card style={monthlyErr? styles.cardError : styles.container} mode='elevated' elevation={4}>
                            <Card.Title title="Amount" />
                            <Card.Content>
                            <RadioButton.Group onValueChange={val=>setShowAmt(val)} value={showAmount}>
                                    <RadioButton.Item label="Fixed Amount" value={true} />
                                    <RadioButton.Item label="Variable Amount" value={false} />
                                </RadioButton.Group>
                            {showAmount===true && 
                                <TextInput 
                                    mode='outlined'
                                    label='Amount'
                                    keyboardType='numeric'
                                    value={amount}
                                    onChangeText={(val)=>{setAmount(val)}}
                                    error={amtErr}
                                />
                            
                            }
                            </Card.Content>
                        </Card>
                    </Card.Content>
                </Card>
                <Button onPress={()=>{saveService()}}>Save Service</Button>

                <Snackbar 
                    visible={snackbarSuccess} 
                    onDismiss={()=>{setSucces(false)}}
                    action={{
                        label : 'OK',
                        onPress : () =>{setSucces(false)}
                    }}
                    >
                    Added service succesfully
                </Snackbar>

                <Snackbar 
                    visible={snackbarFailure} 
                    onDismiss={()=>{setFailure(false)}}
                    action={{
                        label : 'OK',
                        onPress : () =>{setFailure(false)}
                    }}
                    >
                    Failed to add service. Check if required fields have data.
                </Snackbar>
            </ScrollView>
        )
    }


    const styles = StyleSheet.create({
        container : {
            marginHorizontal : 5,
            marginTop:10
        },

        cardError :{
            marginHorizontal : 5,
            marginTop:10,
            backgroundColor : '#ffcccc'
        }
    })