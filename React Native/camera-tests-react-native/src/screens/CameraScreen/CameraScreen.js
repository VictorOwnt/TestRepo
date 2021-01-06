import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import styles from './styles';

export default function CameraScreen({route, navigation}) {
  const [cameraType, setCameraType] = useState('back');
  const [flashType, setFlashType] = useState('off');
  const [mirrorImage, setMirrorImage] = useState(false);

  const takePicture = async (camera) => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);
  };

  const switchCamera = async (camera) => {
    switch (cameraType) {
      case 'back':
        setCameraType('front');
        setMirrorImage('true');
        break;
      case 'front':
        setCameraType('back');
        setMirrorImage('false');
        break;
    }
  };

  const handleFlash = async (camera) => {
    switch (flashType) {
      case 'off':
        setFlashType('on');
        break;
      case 'on':
        setFlashType('off');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera style={styles.preview} type={cameraType} flashMode={flashType}>
        {({camera, status}) => {
          if (status !== 'READY') {
            return <ActivityIndicator />;
          }
          return (
            <View
              style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => handleFlash(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> FLASH </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> SNAP </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => switchCamera(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> SWITCH </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </SafeAreaView>
  );
}
