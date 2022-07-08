import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";

const sendText = async (phoneNumber) => {
  console.log("PhoneNumber: ",phoneNumber);
  const loginResponse=await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers:{
        'content-type':'application/text'
     } 
    });

const loginResponseText = await loginResponse.text(); //converts the promise to a string by using await
console.log('Login Response', loginResponseText);

  };

const getToken = async({phoneNumber, oneTimePassword, setUserLoggedIn}) =>{
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin', {
    method: 'POST',
    body:JSON.stringify({oneTimePassword, phoneNumber}),
    headers:{
      'content-type':'application/json'
     }, 
    }
   );

  const responseCode = tokenResponse.status;//200 means logged in successfully
  console.log("Response Status Code", responseCode);
  if(responseCode==200){
    setUserLoggedIn(true);
  }
  const tokenResponseString = await tokenResponse.text();
 console.log ("token",tokenResponseString)
}

const getEmailToken = async ({emailAddress}) => {
const getEmailToken = emailToken=await fetch('https://dev.stedi.me/validate/'+tokenResponse, {
  method: 'GET',
  headers:{
    'Content-Type': 'Application/text'
  },
  body:JSON.stringify({emailAddress})
});
}
const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="801-555-1212"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{
          sendText(phoneNumber)
          console.log('Login button was clicked')}}
      >
        <Text>Send Text</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={()=>{
          getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn});
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  mainView:{
    marginTip:100
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  
  }
});

export default Login;