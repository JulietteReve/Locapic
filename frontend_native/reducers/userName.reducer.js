export default function(userName = "", action){ 
    if(action.type == 'saveUserName'){
        var newUsername= action.userName
        return newUsername
    } else {
    return userName
    }
}