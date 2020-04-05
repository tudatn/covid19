import React, {useRef, useReducer, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Text} from 'native-base';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAPBOX_TOKEN, API_BASE_URL} from '../../env';

// @ts-ignore
import marker from '../assets/red-circle-icon.png';

MapboxGL.setAccessToken(MAPBOX_TOKEN);

interface CountryData {
  country: string;
  recovered: string;
  update: string;
  active: string;
  confirmed: string;
  deaths: string;
  lat: string;
  lon: string;
}

export default function WorldView(props: any) {
  const cameraRef = useRef(null);
  const mapRef = useRef(null);

  const [features, setFeatures] = useState<CountryData[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<CountryData | null>(
    null,
  );

  // get data
  useEffect(() => {
    fetch(API_BASE_URL + '/data/world')
      .then((res) => res.json())
      .then(
        (data: CountryData[]) => {
          setFeatures(data);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  function generateFeatureFromData(data: CountryData) {
    return {
      type: 'Feature',
      properties: {
        name: data.country,
        level: setIconSizeSymbolLayer(+data.confirmed),
      },
      geometry: {
        type: 'Point',
        coordinates: [data.lon ? +data.lon : 0, data.lat ? +data.lat : 0],
      },
    };
  }

  function constructShapsourceFromData(data: CountryData[]) {
    let source = {
      type: 'FeatureCollection',
      features: [] as any[],
    };
    data.forEach((item) => {
      source.features.push(generateFeatureFromData(item));
    });
    return source;
  }

  function setIconSizeSymbolLayer(quantity: number) {
    const baseSize = 0.005;
    if (quantity > 100000) return 'level-10';
    if (quantity > 25000) return 'level-9';
    if (quantity > 16000) return 'level-8';
    if (quantity > 8000) return 'level-7';
    if (quantity > 4000) return 'level-6';
    if (quantity > 2000) return 'level-5';
    if (quantity > 1000) return 'level-4';
    if (quantity > 500) return 'level-3';
    if (quantity > 100) return 'level-2';
    return baseSize;
  }

  function onPress(e: any) {
    console.log(e.features);
  }

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        ref={mapRef}
        styleURL="mapbox://styles/tudatn/ck823d7tm2gj41is5i4kws2a2"
        style={styles.map}>
        <MapboxGL.Camera
          ref={cameraRef}
          defaultSettings={{
            zoomLevel: 2,
          }}
        />
        <MapboxGL.ShapeSource
          id={'data-world'}
          shape={constructShapsourceFromData(features)}
          onPress={onPress}>
          <MapboxGL.SymbolLayer
            id="symbol-world"
            style={mapStyles.point as any}
          />
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

const baseSize = 0.0085;

const mapStyles = {
  point: {
    iconSize: [
      'match',
      ['get', 'level'],
      'level-10',
      baseSize * 10,
      'level-9',
      baseSize * 9,
      'level-8',
      baseSize * 8,
      'level-7',
      baseSize * 7,
      'level-6',
      baseSize * 6,
      'level-5',
      baseSize * 5,
      'level-4',
      baseSize * 4,
      'level-3',
      baseSize * 3,
      'level-2',
      baseSize * 2,
      'level-1',
      baseSize * 1,
      baseSize,
    ],
    iconImage: marker,
    iconOpacity: 0.8,
    symbolZOrder: 'source',
    textField: ['get', 'name'],
    textColor: '#ffffff',
    textSize: 10,
  },
};
