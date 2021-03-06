import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Alert, FlatList } from 'react-native'
import Button from '../components/Button'
import firestore from '@react-native-firebase/firestore'
import FormInput from '../components/FormInput'
const TextScreen = () => {
  const [texts, setTexts] = useState(null);
  const [text, setText] = useState(null);


  useEffect(() => {
    fetchTexts();
  }, [texts])
  const fetchTexts = async () => {
    try {
      const list = []
      firestore()
        .collection('Texts')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(doc => {
            const { text } = doc.data();
            list.push({
              text: text
            }
            );
          })
          setTexts(list)
        })
    } catch (e) {
      console.log(e)
    }
  }

  const submitText = async () => {
    if (text == null) {
      return null;
    }

    try {


      Alert.alert(
        'Text uploaded!',
      );

      firestore()
        .collection('Texts')
        .add({
          text: text
        })
        .then(() => {
          console.log('text added')
        })
        .catch((e) => {
          console.log(e)
        })

    } catch (e) {
      console.log(e);
    }
  }
  const ItemSeprator = () => <View style={{

    height: 2,
  
    width: "100%",
  
    backgroundColor: "rgba(0,0,0,0.5)",
  
  }} />
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
      <FormInput onChangeText={(userText) => setText(userText)} />
      <Button
        buttonTitle="Upload Text"
        onPress={submitText}
      />
      <FlatList
        data={texts}
        contentContainerStyle={{ justifyContent: 'center', alignItems: "center" }}
        ItemSeparatorComponent={ItemSeprator}
        renderItem={({ item }) => (
          <View>
            <Text style = {styles.textStyle}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  tagView: {
    flexWrap: "wrap"
  },
  textStyle: {
    fontSize: 30,
    margin: 10,
    fontFamily: "Kufam-Italic"
  }
});

export default TextScreen
