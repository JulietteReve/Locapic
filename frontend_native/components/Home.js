
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, ImageBackground } from 'react-native';
import { Input, Icon, Text } from 'react-native-elements'
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';


function Home(props) {
    const [name, setName] = useState('');

    useEffect(() => {
        AsyncStorage.getItem("userName", function(error, data) {
            setName(data)
          });
        }, []);
    
    if (name === '') {
        function GoToMap() {
            props.navigation.navigate('TabButton', {screen: 'Map'});
            AsyncStorage.setItem("userName", name);
            props.saveUserName(name);
        }
        return (
            <View style={styles.container}>
                    <ImageBackground source={require("../assets/dobby.jpg")} style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Input
                        containerStyle = {{marginBottom: 25, width: '70%'}}
                        color= 'white'
                        leftIcon={
                            <Entypo
                            name='user'
                            size={24}
                            color='white'
                            />}
                        placeholder='your name'
                        onChangeText={(value) => setName(value)}
                        value={name}
                    />
                <Button title='Go to Map' onPress={() => GoToMap()}></Button>
                </ImageBackground>
            </View>
      
        );
    } else {
        function GoToMap() {
            props.navigation.navigate('TabButton', {screen: 'Map'});
            props.saveUserName(name);
        }
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../assets/dobby.jpg")} style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text h3 h3Style={{color: 'white'}}>Welcome back {name}</Text>
                <Button title='Go to Map' onPress={() => GoToMap()}></Button>
                </ImageBackground>
            </View>
      
        );
        
    }   
}
        
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  
});

function mapDispatchToProps(dispatch){
    return {
        saveUserName: function(name){
            dispatch({
                type: 'saveUserName',
                userName: name,
            })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
    )(Home);

