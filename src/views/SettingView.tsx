import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function SettingView(props: any) {
  return (
    <View style={styles.container}>
      <Text>Data source is retrieved from</Text>
      <Text style={{fontWeight: 'bold'}}>Johns Hopkins CSSE</Text>
      <Text>---</Text>
      <Text>Contact</Text>
      <Text style={{fontWeight: 'bold'}}>nguyentudat@gmail.com</Text>
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
