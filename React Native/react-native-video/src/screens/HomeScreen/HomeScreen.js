import React, {useRef} from 'react';
import {SafeAreaView, View } from 'react-native';
import VideoPlayer from 'react-native-video-player';

export default function HomeScreen({route, navigation}) {
  const videoPlayer = useRef();

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            border: 'solid',
            borderWidth: 2,
            borderColor: '#ccc',
          }}
        >
          <VideoPlayer 
            video={{uri: "https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4"}}   // Can be a URL or a local file.
            videoWidth={1600}
            videoHeight={900}
            thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }} />
        </View>
      </SafeAreaView>
  )
}