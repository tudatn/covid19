import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
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
  Card,
  CardItem,
  Icon,
} from 'native-base';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {getUniqueId} from 'react-native-device-info';

interface ReactionType {
  emoji: string;
  count: number;
}

interface JokeType {
  content: string;
  owner: string;
  // reaction?: ReactionType;
  like: number;
  created: FirebaseFirestoreTypes.Timestamp;
  id: string;
}

export default function ShareView(props: any) {
  const jokesCollection = firestore().collection('jokes');
  const [content, setContent] = useState('');
  const [jokes, setJokes] = useState<JokeType[]>([]);
  const [myJoke, setmyJoke] = useState<JokeType>();
  const [lastVisible, setLastVisible] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot
  >();
  const [showForm, setShowForm] = useState(false);

  const deviceId = getUniqueId();

  function addJoke() {
    const id = jokesCollection.doc().id;
    const joke = {
      content: content,
      id: id,
      created: firestore.Timestamp.now(),
      owner: deviceId,
      like: 0,
    };
    jokesCollection
      .doc()
      .set(joke)
      .then(() => {
        setmyJoke(joke);
        setShowForm(false);
      });
  }

  function onChangeText(text: string) {
    setContent(text);
  }

  function loadJokes() {
    jokesCollection
      .orderBy('created', 'desc')
      .limit(25)
      .get()
      .then((documentSnapshots) => {
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        const jokes: JokeType[] = [];
        documentSnapshots.forEach((doc) => {
          jokes.push(doc.data() as any);
        });
        setJokes(jokes);
        setLastVisible(lastVisible);
        setmyJoke(undefined);
        setContent('');
      });
  }

  useEffect(() => {
    loadJokes();
  }, []);

  return (
    <Container>
      <Content padder>
        <View style={{alignItems: 'center'}}>
          <Text>Covid19 makes me sad ...</Text>
          <Text>but a joke can make my day</Text>
        </View>
        <TouchableOpacity
          style={{position: 'absolute', top: 10, right: 10}}
          onPress={() => setShowForm(!showForm)}>
          <Icon
            type="Ionicons"
            name={
              showForm ? 'ios-close-circle-outline' : 'ios-add-circle-outline'
            }
            style={{color: 'orange'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={loadJokes}
          style={{position: 'absolute', top: 10, left: 10}}>
          <Icon
            type="MaterialCommunityIcons"
            name="reload"
            style={{color: 'green'}}
          />
        </TouchableOpacity>
        {showForm && (
          <>
            <Form>
              <Textarea
                rowSpan={5}
                bordered
                placeholder="a good joke can fight covid19"
                underline={false}
                value={content}
                onChangeText={onChangeText}
              />
            </Form>
            <TouchableOpacity
              onPress={addJoke}
              style={{
                backgroundColor: 'green',
                width: 100,
                padding: 10,
                alignSelf: 'flex-end',
                marginTop: 5,
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>Share</Text>
            </TouchableOpacity>
          </>
        )}
        {myJoke && <Joke joke={myJoke} />}
        {jokes.map((joke) => {
          return <Joke key={joke.id} joke={joke} />;
        })}
      </Content>
    </Container>
  );
}

function Joke(props: {joke: JokeType}) {
  const jokesCollection = firestore().collection('jokes');
  const [like, setLike] = useState(props.joke.like);
  const [didLike, setDidLike] = useState(false);

  function addLike() {
    if (didLike == true) {
      setLike((like) => like - 1);
    } else {
      setLike((like) => like + 1);
    }
    setDidLike(!didLike);
  }

  useState(() => {
    // do nothing
    return () => jokesCollection.doc(props.joke.id).update({like});
  });
  return (
    <Card>
      <CardItem>
        <Body>
          <Text>{props.joke.content}</Text>
        </Body>
      </CardItem>
      <CardItem>
        <Left>
          <TouchableOpacity
            onPress={addLike}
            style={{
              flexDirection: 'row',
              borderRadius: 20,
              padding: 3,
              borderColor: 'pink',
              borderWidth: 1,
            }}>
            <Icon
              type="MaterialIcons"
              name="sentiment-very-satisfied"
              style={{color: didLike ? 'orange' : 'pink'}}
            />
            {like > 0 && <Text style={{paddingRight: 5}}>{like}</Text>}
          </TouchableOpacity>
        </Left>
        <Right>
          {props.joke.owner == getUniqueId() && (
            <TouchableOpacity>
              <Text>Edit</Text>
            </TouchableOpacity>
          )}
        </Right>
      </CardItem>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
