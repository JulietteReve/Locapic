import React, { useEffect, useState } from 'react';
import { ScrollView, View, KeyboardAvoidingView,   } from 'react-native';
import {connect} from 'react-redux';
import socketIOClient from "socket.io-client";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Input, ListItem } from 'react-native-elements'



var socket = socketIOClient("http://172.17.1.83:3000");


function Chat(props) {

  const [message, setMessage] = useState('')
  const [listMessage, setListMessage] = useState([])

  useEffect(() => {
    socket.on('sendMessageToAll', (mess, name)=> {
      var newMessage = {name: name, message: mess}
      setListMessage([...listMessage, newMessage])
    });
  }, [listMessage]);

  function sendMessage() {
    socket.emit("sendMessage", message, props.userName);
    setMessage('');
  }

  var messageTab = listMessage.map((element, i) => {
    return (
      <ListItem >
                    <ListItem.Content>
                        <ListItem.Title>{element.name}</ListItem.Title>
                        <ListItem.Subtitle>{element.message}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
    )
  })

  return (
    <View style={{flex:1}}>
      <ScrollView style={{flex:1, marginTop: 50}}>
          
            {messageTab}

        </ScrollView>

        <KeyboardAvoidingView 
            style={{
                flex: 1,
                paddingBottom: 50,
                justifyContent: 'flex-end'
            }}
            behavior= {Platform.OS === "ios" ? "padding" : "height"}>
            <Input 
                containerStyle = {{marginBottom: 5}}
                placeholder="Your message"
                onChangeText={(value) => setMessage(value)} 
                value={message}
            /> 
            <Button
              icon={
                <Icon
                name="envelope-o"
                size={20}
                color="#ffffff"
                />
            } 
              title="Send"
              buttonStyle={{backgroundColor: "#eb4d4b"}}
              type='solid'
              onPress= {() => sendMessage()}
            />
        </KeyboardAvoidingView>
    </View>
  );  
}

function mapStateToProps(state){
  return {userName: state.userName}
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F2F2F2',
//     justifyContent: 'space-between',
//   },
// });

export default connect(
  mapStateToProps,
  null
  )(Chat);