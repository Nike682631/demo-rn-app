import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Alert, FlatList } from 'react-native'
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Ionicons'
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';
import Button from '../components/Button'
import firestore from '@react-native-firebase/firestore'

const PhotoScreen = () => {
  const [image, setImage] = useState(null);
  const [photos, setPhotos] = useState(null);
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = image.path
      setImage(imageUri)
    });
  }
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      const imageUri = image.path
      setImage(imageUri)
    });
  }
  useEffect(() => {
    fetchPhotos();
  }, [image])
  const fetchPhotos = async () => {
    try {
      const list = []
      firestore()
        .collection('Photos')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(doc => {
            const { image } = doc.data();
            list.push({
              url: image
            }
            );
          })
          setPhotos(list)
        })
    } catch (e) {
      console.log(e)
    }
  }

  const submitPhoto = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setImage(null);

      Alert.alert(
        'Image uploaded!',
        'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      );

      firestore()
        .collection('Photos')
        .add({
          image: url
        })
        .then(() => {
          console.log('photo added')
        })
        .catch((e) => {
          console.log(e)
        })

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
      {image != null ? <Image style={{ height: 300, width: "100%", margin: 20, alignSelf: "center" }} source={{ uri: image }} /> : <Image style={{ height: 300, width: "100%", margin: 20, alignSelf: "center" }} source={require('../assets/placeholder.png')} />}
      <Button
        buttonTitle="Upload photo"
        onPress={submitPhoto}
      />
      <FlatList
        data={photos}
        contentContainerStyle={{justifyContent: 'center', alignItems: "center"}}
        columnWrapperStyle={styles.tagView}
        numColumns={3}
        renderItem={({ item }) => (
          <Image style={{ height: 75, width: 75, margin: 20}}
            source={{ uri: item.url }}
          />)}
      />
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor='#9b59b6' title="Take Photo" onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Gallery" onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
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
});

export default PhotoScreen
