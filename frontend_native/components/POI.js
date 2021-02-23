import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {connect} from 'react-redux'
import { ListItem } from 'react-native-elements'



function POI(props) {
    
    if (props.POIList.length > 0) {
        return (
            <View style={{marginTop: 70}}>
                {
                props.POIList.map((element, i) => (
                    <ListItem key={i} bottomDivider onPress={() => props.deletePOI(element)}>
                        <ListItem.Content>
                            <ListItem.Title>{element.title}</ListItem.Title>
                            <ListItem.Subtitle>{element.description}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
                }
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text>Pas de POI</Text>
            </View>
        )
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
        deletePOI: function(POI){
            dispatch({
                type: 'deletePOI',
                POI: POI,
            })
        }
    }
}

function mapStateToProps(state){
    return {POIList: state.POIList}
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
    )(POI);