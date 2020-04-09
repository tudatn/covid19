import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Modal} from 'react-native';
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
import BulletText from '../components/BulletText';

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
  const [showHelp, setShowHelp] = useState(false);

  // show top 5 jokes
  const [topJokes, setTopJokes] = useState<JokeType[]>([]);

  const deviceId = getUniqueId();

  function validateJokeContent() {
    return content.length < 250;
  }

  function closeJokeRulePanel() {
    setShowHelp(false);
  }

  function addJoke() {
    if (!validateJokeContent()) return;
    if (myJoke) {
      if (content == '')
        jokesCollection
          .doc(myJoke.id)
          .delete()
          .then(() => {
            setmyJoke(undefined);
            setShowForm(false);
          })
          .catch((error) => console.log(error));
      else
        jokesCollection
          .doc(myJoke.id)
          .update({content})
          .then(() => {
            setmyJoke({...myJoke, content});
            setShowForm(false);
          });
    } else {
      if (content == '') return;
      const id = jokesCollection.doc().id;
      const joke = {
        content: content,
        id: id,
        created: firestore.Timestamp.now(),
        owner: deviceId,
        like: 0,
      };
      jokesCollection
        .doc(id)
        .set(joke)
        .then(() => {
          setmyJoke(joke);
          setShowForm(false);
        });
    }
  }

  function onChangeText(text: string) {
    setContent(text);
  }

  function editJoke() {
    setShowForm(true);
  }

  function loadTopJokes(top: number) {
    jokesCollection
      .orderBy('like', 'desc')
      .limit(top)
      .get()
      .then((documentSnapshots) => {
        const jokes: JokeType[] = [];
        documentSnapshots.forEach((doc) => {
          jokes.push(doc.data() as any);
        });
        setTopJokes(jokes);
      });
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
    loadTopJokes(5);
  }, []);

  return (
    <Container>
      <TouchableOpacity
        style={{position: 'absolute', top: 10, right: 10, zIndex: 10}}
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
        style={{position: 'absolute', top: 10, left: 10, zIndex: 10}}>
        <Icon
          type="MaterialCommunityIcons"
          name="reload"
          style={{color: 'green'}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setShowHelp(true)}
        style={{position: 'absolute', bottom: 10, right: 10, zIndex: 10}}>
        <Icon
          type="MaterialCommunityIcons"
          name="help-circle-outline"
          style={{color: 'green'}}
        />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'rgb(245, 244, 244)',
          paddingVertical: 10,
        }}>
        <Text>Covid19 makes me sad ...</Text>
        <Text>but a joke can make my day</Text>
      </View>
      <JokeRule visible={showHelp} closeJokeRulePanel={closeJokeRulePanel} />
      <Content padder>
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
              disabled={!validateJokeContent()}
              style={{
                backgroundColor: validateJokeContent() ? 'green' : 'gray',
                width: 100,
                padding: 10,
                alignSelf: 'flex-end',
                marginTop: 5,
                borderRadius: 20,
              }}>
              <Text style={{color: 'white', textAlign: 'center'}}>Share</Text>
            </TouchableOpacity>
          </>
        )}
        {myJoke && !showForm && (
          <Joke joke={myJoke} current={true} editJoke={editJoke} />
        )}
        <Text style={{fontWeight: 'bold'}}>Top jokes</Text>
        {topJokes.map((joke) => {
          return <Joke key={joke.id} joke={joke} />;
        })}
        <Text style={{fontWeight: 'bold'}}>Latest jokes</Text>

        {jokes.map((joke) => {
          return <Joke key={joke.id} joke={joke} />;
        })}
      </Content>
    </Container>
  );
}

function Joke(props: {
  joke: JokeType;
  current?: boolean;
  editJoke?: () => void;
}) {
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

  function editJoke() {
    if (props.editJoke) props.editJoke();
  }

  useEffect(() => {
    // do nothing
    jokesCollection.doc(props.joke.id).update({like});
  }, [like]);
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
          {props.current && props.joke.owner == getUniqueId() && (
            <TouchableOpacity onPress={editJoke}>
              <Text>Edit</Text>
            </TouchableOpacity>
          )}
        </Right>
      </CardItem>
    </Card>
  );
}

function JokeRule(props: {visible: boolean; closeJokeRulePanel: () => void}) {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'rgba(255, 252, 255, 0.85)',
          justifyContent: 'center',
        }}>
        <Text>Please follow some rules to have good jokes</Text>
        <BulletText
          color="green"
          icon="ios-checkmark-circle-outline"
          text="Length of less than 250 characters"
        />
        <BulletText
          color="green"
          icon="ios-checkmark-circle-outline"
          text="Only 25 latest jokes are shown"
        />
        <BulletText
          color="green"
          icon="ios-checkmark-circle-outline"
          text="No more than 5 jokes/ day"
        />
        <TouchableOpacity
          onPress={props.closeJokeRulePanel}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'orange',
            borderRadius: 20,
            padding: 10,
          }}>
          <Text style={{color: 'white'}}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
