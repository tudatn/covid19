import React, {useRef, useReducer, useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Container, Text, Icon} from 'native-base';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAPBOX_TOKEN, API_BASE_URL} from '../../env';
import * as utils from '../utils';
import {DataType} from '../types';

import MapView from '../components/MapView';

export default function CountryMapView(props: any) {
  const {country} = props.route.params;
  const [data, setData] = useState<DataType[]>([]);

  function fetchData() {
    fetch(API_BASE_URL + '/data/country?name=' + country.country)
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
      <MapView data={data} center={[+country.lon!, +country.lat!]} />
      <View style={{position: 'absolute', top: 10, right: 10}}>
        <TouchableOpacity onPress={fetchData}>
          <Icon
            type="MaterialIcons"
            name="refresh"
            style={{fontSize: 24, color: 'white'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{position: 'absolute', bottom: 10, alignSelf: 'center'}}>
        <TouchableOpacity>
          <Icon
            type="MaterialIcons"
            name="insert-chart"
            style={{fontSize: 45, color: 'white'}}
          />
          <Text style={{color: 'white', fontWeight: 'bold'}}>Statistic</Text>
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
