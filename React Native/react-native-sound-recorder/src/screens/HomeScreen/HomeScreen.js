import React, { useState } from 'react';
import {SafeAreaView, Button, PermissionsAndroid} from 'react-native';
import SoundRecorder from 'react-native-sound-recorder';


export default function HomeScreen({route, navigation}) {
  const [isRecording, setIsRecording] = useState(false);

  const checkPermissionsAudio = async (navigation) => {
  if (Platform.OS === 'android') {
    try {
      const storageUsage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (storageUsage === PermissionsAndroid.RESULTS.GRANTED) {
        try {
          const microphoneUsage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          );
          if (microphoneUsage === PermissionsAndroid.RESULTS.GRANTED) {
            useRecorder();
          }
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
      return;
    }
  } else {
    useRecorder();
  }
};

const useRecorder = () => {
  isRecording 
              ? SoundRecorder.stop().then((res) => {
                console.log('stopped recording, audio file saved at: ' + res.path);
                setIsRecording(false);
              }) 
              : SoundRecorder.start(SoundRecorder.PATH_CACHE + '/test.mp4').then((res) => {
                console.log('started recording');
                setIsRecording(true);
              });
}

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Button
          title={isRecording ? 'Stop recording' : 'Start recording'}
          onPress={() => checkPermissionsAudio()}
        />
    </SafeAreaView>
  )
}