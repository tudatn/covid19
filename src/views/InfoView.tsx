import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Text} from 'native-base';

export default function InfoView(props: any) {
  return (
    <Container>
      <Text>Some View</Text>
    </Container>
  );
}

const styleSheets = StyleSheet.create({
  container: {
    flex: 1,
  },
});
