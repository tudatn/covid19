import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ShareView(props: any) {
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
