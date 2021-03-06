import React, {useRef, useReducer, useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Container, Text, Icon} from 'native-base';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAPBOX_TOKEN} from '../../env';
import * as utils from '../utils';

// @ts-ignore
import marker from '../assets/red-circle-icon.png';
// @ts-ignore
import selectMarker from '../assets/purple-circle-icon.png';

import {DataType} from '../types';

MapboxGL.setAccessToken(MAPBOX_TOKEN);

interface CFeature extends GeoJSON.Feature {
  properties: {
    name: string;
    recovered: string;
    update: string;
    active: string;
    confirmed: string;
    deaths: string;
  };
}

export default function MapView(props: {
  data: DataType[];
  center?: [number, number];
}) {
  const cameraRef = useRef<MapboxGL.Camera | null>(null);
  const mapRef = useRef(null);

  const data = props.data;
  const [selectedFeature, setSelectedFeature] = useState<CFeature | null>(null);

  const styleURL = 'mapbox://styles/tudatn/ck821xt1i2f5v1is5dfvdcluc';

  function generateFeatureFromData(data: DataType) {
    return {
      type: 'Feature',
      properties: {
        name: data.province ? data.province : data.country,
        level: setIconSizeSymbolLayer(+data.confirmed),
        recovered: data.recovered,
        update: data.update,
        active: data.active,
        confirmed: data.confirmed,
        deaths: data.deaths,
      },
      geometry: {
        type: 'Point',
        coordinates: [data.lon ? +data.lon : 0, data.lat ? +data.lat : 0],
      },
    };
  }

  function constructShapsourceFromData(data: DataType[]) {
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

  function centerMapTo(point: [number, number]) {
    cameraRef.current?.moveTo(point, 200);
  }

  function onSourceShapePress(e: any) {
    const feature = e.features[0];
    setSelectedFeature(feature);
    centerMapTo(feature.geometry.coordinates);
  }

  function onMapPress() {
    setSelectedFeature(null);
  }

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        ref={mapRef}
        styleURL={styleURL}
        style={styles.map}
        onPress={onMapPress}>
        <MapboxGL.Camera
          ref={cameraRef}
          defaultSettings={{
            zoomLevel: 2,
          }}
          centerCoordinate={props.center}
        />
        <MapboxGL.ShapeSource
          id={'data-world'}
          shape={constructShapsourceFromData(data)}
          onPress={onSourceShapePress}>
          <MapboxGL.SymbolLayer
            id="symbol-world"
            style={mapStyles.point as any}
          />
        </MapboxGL.ShapeSource>
        {selectedFeature && (
          <MapboxGL.ShapeSource id={'data-country'} shape={selectedFeature}>
            <MapboxGL.SymbolLayer
              id="symbol-country"
              style={mapStyles.selectPoint as any}
            />
          </MapboxGL.ShapeSource>
        )}
      </MapboxGL.MapView>
      {selectedFeature && <InformationPanel feature={selectedFeature} />}
    </View>
  );
}

function InformationPanel(props: {feature: CFeature}) {
  const feature = props.feature;
  return (
    <View style={styles.inforPanel}>
      <Text style={{color: 'white', fontWeight: 'bold'}}>
        {feature.properties.name}
      </Text>
      <Text style={{color: 'white'}}>
        Confirmed: {utils.formatNumberString(feature.properties.confirmed)}
      </Text>
      <Text style={{color: 'white'}}>
        Deaths: {utils.formatNumberString(feature.properties.deaths)}
      </Text>
      <Text style={{color: 'white'}}>
        Recovered: {utils.formatNumberString(feature.properties.recovered)}
      </Text>
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
  inforPanel: {
    padding: 10,
    position: 'absolute',
    backgroundColor: 'gray',
    top: 10,
    left: 10,
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
    textSize: 12,
    iconAllowOverlap: true,
  },
  selectPoint: {
    iconSize: 0.0085 * 5,
    iconImage: selectMarker,
    textField: ['get', 'name'],
    textColor: '#ffffff',
    textSize: 12,
    textHaloColor: 'rgba(0, 0, 0, 0)',
    textOffset: [0, -2],
  },
};
