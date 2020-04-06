import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
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
import {CountryData} from 'src/types';

import * as utils from '../utils';

export default function CountryView(props: any) {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<CountryData[]>([]);
  const [searchData, setSearchData] = useState(data);

  function fetchData() {
    fetch(API_BASE_URL + '/data/world')
      .then((res) => res.json())
      .then(
        (data: CountryData[]) => {
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
    let result: CountryData[] = [];
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
      </Header>
      <Content padder>
        <List>
          {searchData
            .sort((a, b) => +b.confirmed - +a.confirmed)
            .map((item, index) => {
              return <CountryInfo key={index} country={item} />;
            })}
        </List>
      </Content>
    </Container>
  );
}

function CountryInfo(props: {country: CountryData}) {
  const country = props.country;
  return (
    <TouchableOpacity style={styles.rowButton}>
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
