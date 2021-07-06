import React, { useState } from 'react'
import { View, Text } from 'react-native'
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import functions from '@react-native-firebase/functions'
const CalculatorScreen = () => {
    const [number1,setNumber1] = useState(null)
    const [number2,setNumber2] = useState(null)
    const [symbol,setSymbol] = useState(null)
    const [result, setResult] = useState('')

    const Calculate = async () => {
        functions()
        .httpsCallable('helloWorld')({
            a : number1,
            b : number2,
            symbol: symbol
        })
        .then(response => {
          setResult(response.data);
          console.log(response)
        }).catch((e) => {
            console.log(e);
        });
        console.log('abc')
    }
    return (
        <View>
            <FormInput onChangeText={(input) => setNumber1(input)}/>
            <FormInput onChangeText={(input) => setNumber2(input)}/>
            <FormInput onChangeText={(input) => setSymbol(input)} placeholderText = "add , substract or multiply"/>
            <Button
        buttonTitle="Calculate"
        onPress={Calculate}
      />
      <Text>{result}</Text>
        </View>
    )
}

export default CalculatorScreen
