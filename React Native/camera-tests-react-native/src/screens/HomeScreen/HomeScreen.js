import React from 'react';
import {SafeAreaView, Button} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

export default function HomeScreen({route, navigation}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Button
          title="Take image"
          onPress={() =>
            // TODO zet de volgende return statement uit de commentaar voor de react-native-image-picker te gebruiken
            /*ImagePicker.launchCamera({mediaType: 'image'}, (response) => {
              if (response.uri != null) {
                //Do something
                console.log(response);
              }
            })*/
            navigation.navigate('Camera')
          }
        />
    </SafeAreaView>
  )
}