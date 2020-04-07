import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Text} from 'native-base';

export default function BulletText(props: {
  text: string;
  icon: string;
  color: string;
}) {
  return (
    <View style={styles.bullet}>
      <Icon name={props.icon} style={{color: props.color, paddingRight: 10}} />
      <Text style={{flexShrink: 1}}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bullet: {
    flexDirection: 'row',
    padding: 5,
  },
});
