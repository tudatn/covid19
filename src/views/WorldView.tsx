import React, {useRef, useReducer} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Text} from 'native-base';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAPBOX_TOKEN} from '../../env';

MapboxGL.setAccessToken(MAPBOX_TOKEN);

export default function WorldView(props: any) {
  const cameraRef = useRef(null);
  const mapRef = useRef(null);
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
