import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Text, Content, Tab, Header, Tabs, Icon} from 'native-base';
import {useSafeArea} from 'react-native-safe-area-context';

export default function InfoView(props: any) {
  const insets = useSafeArea();
  return (
    <Container style={{paddingTop: insets.top}}>
      <Tabs>
        <Tab heading="Overview">
          <OverView />
        </Tab>
        <Tab heading="Prevention">
          <Prevention />
        </Tab>
        <Tab heading="Symptoms">
          <Symptoms />
        </Tab>
      </Tabs>
    </Container>
  );
}

function OverView(props: any) {
  return (
    <Content padder>
      <Text style={styles.paragraph}>
        Coronavirus disease (COVID-19) is an infectious disease caused by a
        newly discovered coronavirus.
      </Text>
      <Text style={styles.paragraph}>
        Most people infected with the COVID-19 virus will experience mild to
        moderate respiratory illness and recover without requiring special
        treatment. Older people, and those with underlying medical problems like
        cardiovascular disease, diabetes, chronic respiratory disease, and
        cancer are more likely to develop serious illness.
      </Text>
      <Text style={styles.paragraph}>
        The best way to prevent and slow down transmission is be well informed
        about the COVID-19 virus, the disease it causes and how it spreads.
        Protect yourself and others from infection by washing your hands or
        using an alcohol based rub frequently and not touching your face.
      </Text>
      <Text style={styles.paragraph}>
        The COVID-19 virus spreads primarily through droplets of saliva or
        discharge from the nose when an infected person coughs or sneezes, so
        it’s important that you also practice respiratory etiquette (for
        example, by coughing into a flexed elbow).
      </Text>
      <Text style={styles.paragraph}>
        At this time, there are no specific vaccines or treatments for COVID-19.
        However, there are many ongoing clinical trials evaluating potential
        treatments. WHO will continue to provide updated information as soon as
        clinical findings become available.
      </Text>
      <Text style={{fontStyle: 'italic', fontWeight: 'bold'}}>Ref: WHO</Text>
    </Content>
  );
}

function BulletText(props: {text: string; icon: string; color: string}) {
  return (
    <View style={styles.bullet}>
      <Icon name={props.icon} style={{color: props.color, paddingRight: 10}} />
      <Text style={{flexShrink: 1}}>{props.text}</Text>
    </View>
  );
}

function Prevention(props: any) {
  return (
    <Content padder>
      <Text style={styles.paragraph}>
        To prevent infection and to slow transmission of COVID-19, do the
        following:
      </Text>
      <BulletText
        color="green"
        icon="ios-checkmark-circle-outline"
        text="Wash your hands regularly with soap and water, or clean them with alcohol-based hand rub."
      />
      <BulletText
        color="green"
        icon="ios-checkmark-circle-outline"
        text="Maintain at least 1 metre distance between you and people coughing or sneezing."
      />
      <BulletText
        color="green"
        icon="ios-checkmark-circle-outline"
        text="Avoid touching your face."
      />
      <BulletText
        color="green"
        icon="ios-checkmark-circle-outline"
        text="Cover your mouth and nose when coughing or sneezing."
      />
      <BulletText
        color="green"
        icon="ios-checkmark-circle-outline"
        text="Stay home if you feel unwell."
      />
      <BulletText
        color="green"
        icon="ios-checkmark-circle-outline"
        text="Refrain from smoking and other activities that weaken the lungs."
      />
      <BulletText
        color="green"
        icon="ios-checkmark-circle-outline"
        text="Practice physical distancing by avoiding unnecessary travel and staying away from large groups of people."
      />
    </Content>
  );
}

function Symptoms(props: any) {
  return (
    <Content padder>
      <Text style={styles.paragraph}>
        The COVID-19 virus affects different people in different ways. COVID-19
        is a respiratory disease and most infected people will develop mild to
        moderate symptoms and recover without requiring special treatment.
        People who have underlying medical conditions and those over 60 years
        old have a higher risk of developing severe disease and death.
      </Text>
      <Text style={styles.paragraph}>Common symptoms include:</Text>
      <BulletText color="red" icon="md-sad" text="fever" />
      <BulletText color="red" icon="md-sad" text="tiredness" />
      <BulletText color="red" icon="md-sad" text="dry cough." />
      <Text style={styles.paragraph}>Other symptoms include:</Text>
      <BulletText color="red" icon="md-sad" text="shortness of breath" />
      <BulletText color="red" icon="md-sad" text="aches and pains" />
      <BulletText color="red" icon="md-sad" text="sore throat" />
      <BulletText
        color="red"
        icon="md-sad"
        text="and very few people will report diarrhoea, nausea or a runny nose."
      />
    </Content>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paragraph: {
    paddingVertical: 5,
  },
  bullet: {
    flexDirection: 'row',
    padding: 5,
  },
});
