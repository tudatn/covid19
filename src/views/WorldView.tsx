import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {API_BASE_URL} from '../../env';
import {DataType} from '../types';
import SplashScreen from 'react-native-splash-screen';

import MapView from '../components/MapView';
import {useSafeArea} from 'react-native-safe-area-context';

export default function WorldView(props: any) {
  const [data, setData] = useState<DataType[]>([]);
  const insets = useSafeArea();
  function fetchData() {
    fetch(API_BASE_URL + '/data/world')
      .then((res) => res.json())
      .then(
        (data: DataType[]) => {
          setData(data);
        },
        (error) => {
          console.log(error);
        },
      );
  }

  useEffect(() => {
    fetchData();
    SplashScreen.hide();
  }, []);

  return (
    <View style={{flex: 1, marginTop: insets.top}}>
      <MapView data={data} />
      <View style={{position: 'absolute', top: 10, right: 10}}>
        <TouchableOpacity onPress={fetchData}>
          <Icon
            type="MaterialIcons"
            name="refresh"
            style={{fontSize: 24, color: 'white'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
