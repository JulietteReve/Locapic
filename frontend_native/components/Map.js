import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Overlay, Input } from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';




function Map(props) {


    const [location, setLocation] = useState()
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('')
    // const [newPOI, setNewPOI] = useState({});
    const [openPOI, setOpenPOI] = useState(false);
    //const [POILIst, setPOIList] = useState([])

    const toggleOverlay = () => {
        setVisible(!visible);
    };
    

    useEffect(() => {
        async function askPermissions() {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
              Location.watchPositionAsync({ distanceInterval: 10 },
                (location) => {
                  setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude })
                }
              );
            }
          }
          askPermissions();

          AsyncStorage.getItem("SavePOIList", function(error, data) {
            var POIData = JSON.parse(data);
            for (let i=0; i<POIData.length; i++) {
                props.addToPOIList(POIData[i])
            }
        });

      }, []);

    console.log(props.POILIst);

    useEffect(() => {
        AsyncStorage.setItem("SavePOIList", JSON.stringify(props.POILIst)); 
    }, [props.POILIst]);

    var addPOI = (e) => {
        if (openPOI === true) {
            setVisible(!visible);
            setLatitude(e.nativeEvent.coordinate.latitude);
            setLongitude(e.nativeEvent.coordinate.longitude)
        }
    }

    var addaPOIToPOIList = () => {
        setVisible(!visible);
        var newPOI = {latitude: latitude, longitude: longitude, title: title, description: description}
        //setPOIList([...POILIst, newPOI]);
        props.addToPOIList(newPOI);
        setTitle('');
        setDescription('');
    };


  return (
    <View style={styles.container}>
        <MapView style={styles.map} 
            initialRegion={{
                latitude: 48.8876513,
                longitude: 2.3037661,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            onPress={(e) => {addPOI(e)}}
        >
            {location ?
           <Marker coordinate={{ latitude : location.latitude, longitude : location.longitude}} pinColor="#fd79a8" title={props.userName} description='I am here'/>: null }
            
            {props.POILIst.length > 0 ?
            props.POILIst.map((element, i) => {
                return(
                <Marker coordinate={{ latitude : element.latitude, longitude : element.longitude}} pinColor="#55efc4" title={element.title} description={element.description}/>)
            })
            : null }

        </MapView>
        <Button title="ADD POI" color="#ff7675" onPress={() => setOpenPOI(true)}/>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{width: '70%'}}>
            <Input
                containerStyle = {{marginBottom: 25, width: '50%'}}
                placeholder='place'
                onChangeText={(value) => setTitle(value)}
                value={title}
            />
            <Input
                containerStyle = {{marginBottom: 25, width: '100%'}}
                placeholder='description'
                onChangeText={(value) => setDescription(value)}
                value={description}
            />
            <Button title='Add' color='#d63031' onPress={(e) => {addaPOIToPOIList()}}/>
      </Overlay>
    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

});

function mapDispatchToProps(dispatch){
    return {
        addToPOIList: function(newPOI){
            dispatch({
                type: 'savePOI',
                newPOI: newPOI,
            })
        }
    }
}

function mapStateToProps(state){
    return {userName: state.userName, POILIst: state.POIList}
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
    )(Map);