import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import { Card, RadioButton, TextInput } from 'react-native-paper'


export default function AddService(){

    //user input
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [monthly, setMonthly] = React.useState(null)
    const [showAmount, setShowAmt] = React.useState(null)
    const [amount, setAmount] = React.useState('')

    //errors
    const [nameErr , setNameEr] = React.useState(false)
    const [monthlyErr , setMonthlyEr] = React.useState(false)
    const [showAmtErr , setShowAmtEr] = React.useState(false)
    const [amtErr , setAmtEr] = React.useState(false)

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
                                    onChangeValue={(val)=>{setAmount(val)}}
                                    error={amtErr}
                                />
                            
                            }
                            </Card.Content>
                        </Card>
                    </Card.Content>
                </Card>
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