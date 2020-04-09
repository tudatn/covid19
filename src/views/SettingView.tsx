import React from 'react';
import {View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native';

export default function SettingView(props: any) {
  return (
    <View style={styles.container}>
      <Text>Data source is retrieved from</Text>
      <Text style={{fontWeight: 'bold'}}>Johns Hopkins CSSE</Text>
      <Text>Version: 1.0</Text>

      <Text style={{fontWeight: 'bold'}}>Credits:</Text>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            'https://www.freepnglogos.com/images/virus-36895.html',
          )
        }>
        <Text style={{fontStyle: 'italic'}}>App icon: freepnglogos.com</Text>
      </TouchableOpacity>
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
