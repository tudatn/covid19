import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function SettingView(props: any) {
  return (
    <View style={styles.container}>
      <Text>Coming soon ...</Text>
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
