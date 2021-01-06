import React from 'react';
import {SafeAreaView, View } from 'react-native';
import RNDrawOnScreen from 'react-native-draw-on-screen';


export default function HomeScreen({route, navigation}) {
  
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
          <RNDrawOnScreen
            penColor={this.state.color}
            strokeWidth={this.state.strokeWidth}
            ref={(r) => (this.RNDraw = r)}
          />
        </View>
      </SafeAreaView>
  )
}