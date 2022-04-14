import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import { screenManageServices, screenPaymentHistory, screenPaymentsHome } from '../ScreenNames';

class Home extends React.Component {
  render() {

    
    const handlePress = (location) =>{
        this.props.navigation.navigate(location)
    }

    return (
      <View>
        <Card style={styles.card} onPress={()=>{handlePress(screenManageServices)}}>
          <Card.Title title="Manage Services" />
        </Card>

        <Card style={styles.card} onPress={()=>{handlePress(screenPaymentsHome)}}>
            <Card.Title title="Payments"/>
        </Card>

        <Card style={styles.card} onPress={()=>{handlePress(screenPaymentHistory)}}>
            <Card.Title title='Payment History'/>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    card : {
        marginTop : 15,
        marginHorizontal : 5
    }
})

export default Home;
