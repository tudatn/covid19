import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Form,
  Textarea,
  Container,
  Header,
  Content,
  Title,
  Left,
  Right,
  Body,
  Button,
  Text,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ShareView(props: any) {
  return (
    <Container>
      <Content padder>
        <Form>
          <Textarea
            rowSpan={5}
            bordered
            placeholder="a good joke can fight covid19"
            underline={false}
          />
        </Form>
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            width: 100,
            padding: 10,
            alignSelf: 'flex-end',
            marginTop: 5,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Share</Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
