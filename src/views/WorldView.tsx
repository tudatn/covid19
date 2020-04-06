import React, {useRef, useReducer, useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Container, Text, Icon} from 'native-base';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAPBOX_TOKEN, API_BASE_URL} from '../../env';
import * as utils from '../utils';
import {DataType} from '../types';

import MapView from '../components/MapView';

export default function WorldView(props: any) {
  const [data, setData] = useState<DataType[]>([]);

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
  }, []);

  return (
    <View style={styles.container}>
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
