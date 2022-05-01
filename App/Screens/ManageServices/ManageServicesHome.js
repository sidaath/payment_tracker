import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card} from 'react-native-paper';
import { deleteAll, viewAllServices } from '../../ViewModel/Services';
import { screenAddService, screenEditService } from '../ScreenNames';

class ManageServicesHome extends React.Component {
  render() {


    const handlePress = (location) =>{
        switch (location) {
            case "AddService":
                this.props.navigation.navigate(screenAddService)
                break;
            case "EditService":
                this.props.navigation.navigate(screenEditService)
                break;
            default:
                break;
        }
    }



    return (
      <View style={styles.container}>

        <Card style={styles.cardButton} onPress={()=>{handlePress("AddService")}}>
          <Card.Title title="Add Service" />
          <Card.Content></Card.Content>
        </Card>

        <Card style={styles.cardButton} onPress={()=>{handlePress("EditService")}}>
          <Card.Title title="Edit Services" />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardButton: {
    width: '45%',
    height: 120,
    marginTop: 30,
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
});

export default ManageServicesHome;
