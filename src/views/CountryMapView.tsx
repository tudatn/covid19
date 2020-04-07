import React, {useRef, useReducer, useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import {Container, Text, Icon, Content, Button} from 'native-base';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAPBOX_TOKEN, API_BASE_URL} from '../../env';
import * as utils from '../utils';
import {DataType, TimeDataType} from '../types';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import MapView from '../components/MapView';

export default function CountryMapView(props: any) {
  const {country} = props.route.params;
  const [data, setData] = useState<DataType[]>([]);
  const [showStatistic, setShowStatistic] = useState(false);
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
        <TouchableOpacity onPress={() => setShowStatistic(true)}>
          <Icon
            type="MaterialIcons"
            name="insert-chart"
            style={{fontSize: 45, color: 'white'}}
          />
          <Text style={{color: 'white', fontWeight: 'bold'}}>Statistic</Text>
        </TouchableOpacity>
      </View>
      {showStatistic && (
        <View style={{position: 'absolute', top: 10, bottom: 10}}>
          <TouchableOpacity
            onPress={() => setShowStatistic(false)}
            style={{
              backgroundColor: 'orange',
              width: 80,
              borderRadius: 20,
              padding: 10,
              marginBottom: 5,
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>Close</Text>
          </TouchableOpacity>
          <StatisticView country={country} />
        </View>
      )}
    </View>
  );
}

function StatisticView(props: any) {
  const [data, setData] = useState<TimeDataType[]>([]);

  function fetchData() {
    fetch(API_BASE_URL + '/data/time?name=' + props.country.country)
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

  function getChartData(): [string[], number[], number[]] {
    let lables: string[] = [];
    let confirmedData: number[] = [];
    let deathsData: number[] = [];
    data.forEach((item) => {
      lables.push('');
      confirmedData.push(+item.confirmed);
      deathsData.push(+item.deaths);
    });
    return [lables, confirmedData, deathsData];
  }

  const [lables, confirmedData, deathsData] = getChartData();

  useEffect(() => {
    fetchData();
  }, []);

  function renderChart(labels: string[], data: number[], title: string) {
    return (
      <>
        <Text style={{textAlign: 'center', paddingTop: 10, fontWeight: 'bold'}}>
          {title}
        </Text>
        <LineChart
          data={{
            labels: lables.length > 0 ? lables : ['date'],
            datasets: [
              {
                data: data.length > 0 ? data : [1],
              },
            ],
          }}
          width={Dimensions.get('window').width - 20} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1000} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '2',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </>
    );
  }

  return (
    <Container
      style={{
        borderRadius: 10,
        alignItems: 'center',
        width: Dimensions.get('window').width,
      }}>
      <Content>
        {confirmedData.length > 0 && (
          <View style={{paddingVertical: 10}}>
            <Text style={{color: 'red', fontWeight: 'bold'}}>
              Death rate (deaths/confirmed):{' '}
              {(
                (+deathsData[deathsData.length - 1] * 100) /
                +confirmedData[confirmedData.length - 1]
              ).toFixed(2)}{' '}
              %
            </Text>
          </View>
        )}
        {renderChart(lables, confirmedData, 'Confirmed by Date')}
        {renderChart(lables, deathsData, 'Deaths by Date')}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
