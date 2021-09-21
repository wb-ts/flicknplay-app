import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MediaResults from '../components/MediaResults';
import Colors from '../styles/colors';
import {globalStyle} from '../styles/global';
import {typography} from '../styles/typography';
import {SearchResult} from '../types/Search.type';
import {Trending} from '../types/Trending.type';

import {getSearch, getTrending} from '../util/api';
import {useAsync} from '../util/useAsync';

import Icon from 'react-native-vector-icons/Ionicons';  

const Search = () => {
  const [searchText, setSearchText] = React.useState('');
  const {data, error, run} = useAsync<SearchResult[] | Trending[]>([]);

  useEffect(() => {
    if (searchText) {
      run(getSearch(searchText));
    } else {
      run(getTrending());
    }
  }, [searchText, run]);

  const label = searchText ? 'Movies & TV Shows' : 'Top Searches';

  return (
    <View style={styles.searchContainer}>
      <SafeAreaView>
        <View style={styles.searchInput}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.slateGray}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            clearButtonMode="while-editing"
            selectionColor={Colors.slateGray}
            style={styles.textInput}
          />
        </View>
        <ScrollView>
          <View style={globalStyle.flex}>
            <Text style={styles.label}>{label}</Text>
            <MediaResults data={data} error={error} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

Search.options = {
  bottomTab: {
    text:"Search",
    icon:require('../image/search.png')
  },
};

const styles = StyleSheet.create({
  searchContainer: {
    ...globalStyle.container,
    backgroundColor: Colors.charcoal,
    flex: 1,
  },
  searchInput: {
    backgroundColor: Colors.mediumGray,
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 16,
    marginRight: 4,
    marginLeft: 4,
    borderRadius: 4,
    padding: 4,
  },
  textInput: {
    color: Colors.charcoal,
    height: 30,
  },
  label: {
    ...typography.display4,
    marginTop: 16,
    marginBottom: 8,
  },
});

export default Search;
