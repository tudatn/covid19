import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {
  Container,
  Text,
  Header,
  Item,
  Icon,
  Input,
  Content,
  List,
} from 'native-base';
import {API_BASE_URL} from '../../env';
import {DataType} from '../types';
import * as utils from '../utils';
import {StackNavigationProp} from '@react-navigation/stack';

export default function CountryView(props: any) {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<DataType[]>([]);
  const [searchData, setSearchData] = useState(data);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = props.navigation;

  function fetchData() {
    setIsLoading(true);
    fetch(API_BASE_URL + '/data/world')
      .then((res) => res.json())
      .then(
        (data: DataType[]) => {
          data.sort((a, b) => +b.confirmed - +a.confirmed);
          setIsLoading(false);
          setData(data);
          setSearchData(data);
        },
        (error) => {
          console.log(error);
        },
      );
  }

  function onChangeText(text: string) {
    setSearchText(text);
    search(text);
  }

  function clearSearchText() {
    setSearchText('');
    setSearchData(data);
  }

  function search(text: string) {
    const searchTerm = text.toLowerCase();
    let result: DataType[] = [];
    if (text === '') {
      setSearchData(data);
    } else {
      data.forEach((item) => {
        if (item.country.toLowerCase().includes(searchTerm)) {
          result.push(item);
        }
      });
      setSearchData(result);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="search"
            value={searchText}
            onChangeText={onChangeText}
          />
          <TouchableOpacity onPress={clearSearchText}>
            <Icon
              type="MaterialIcons"
              name="clear"
              style={{color: searchText.length > 0 ? 'black' : 'gray'}}
            />
          </TouchableOpacity>
        </Item>
        <TouchableOpacity
          onPress={fetchData}
          style={{alignSelf: 'center', paddingLeft: 40}}>
          <Icon
            type="MaterialIcons"
            name="refresh"
            style={{fontSize: 24, color: 'white'}}
          />
        </TouchableOpacity>
      </Header>
      <View style={{padding: 10}}>
        <FlatList
          data={searchData}
          renderItem={({item}) => (
            <CountryInfo country={item} navigation={navigation} />
          )}
          onRefresh={fetchData}
          refreshing={isLoading}
          keyExtractor={(item) => item.country}
        />
      </View>
    </Container>
  );
}

function CountryInfo(props: {country: DataType; navigation: any}) {
  const country = props.country;
  return (
    <TouchableOpacity
      style={styles.rowButton}
      onPress={() =>
        props.navigation.navigate('CountryMapView', {country: props.country})
      }>
      <View style={styles.itemRow}>
        <Text style={{fontWeight: 'bold'}}>{country.country}</Text>
        <Icon name="ios-arrow-forward" style={{fontSize: 16, color: 'gray'}} />
      </View>
      <View style={styles.itemRow}>
        <Text>Confirmed: {utils.formatNumberString(country.confirmed)}</Text>
        <Text style={{color: 'red'}}>
          Deaths: {utils.formatNumberString(country.deaths)}
        </Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={{color: 'green'}}>
          Recovered: {utils.formatNumberString(country.recovered)}
        </Text>
        <Text>Active: {utils.formatNumberString(country.active)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  rowButton: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 10,
  },
});
