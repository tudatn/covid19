import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function SettingView(props: any) {
  return (
    <View style={styles.container}>
      <Text>Data source is retrieved from</Text>
      <Text style={{fontWeight: 'bold'}}>Johns Hopkins CSSE</Text>
      <Text>Version: 1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
