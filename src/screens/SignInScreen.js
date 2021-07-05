import React, { useContext, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import { AuthContext } from '../navigation/AuthProvider'

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login} = useContext(AuthContext)
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require('../assets/Samplelogo500*500.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>SAMPLE</Text>
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitaize='none'
          autoCorrect={false}
        />
        <FormInput
          labelValue={password}
          onChangeText={(userPasword) => setPassword(userPasword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry = {true}
        />
        <Button
          buttonTitle = "Sign in"
          onPress = {() => login(email, password)}
        />
        <TouchableOpacity style = {styles.forgotButton} onPress = {() => {}}>
          <Text style = {styles.navButtonText}>
            Forgot Password? 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.forgotButton} onPress = {() => navigation.navigate('Signup')}>
          <Text style = {styles.navButtonText}>
            Don't have an account? Create here 
          </Text>
        </TouchableOpacity>        
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 10,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});

export default SignInScreen
