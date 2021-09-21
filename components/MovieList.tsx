import React, {useContext, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {NavigationContext} from 'react-native-navigation-hooks';
import {useMediaTypeSelection} from '../context/MediaTypeSelectionContext';
import Colors from '../styles/colors';
import {globalStyle} from '../styles/global';
import {typography} from '../styles/typography';
import {ListOption} from '../types/ListOption.type';
import {Media} from '../types/Media.type';
import {MediaTypes} from '../types/MediaTypes.enum';
import {getImageUrl, getMediaList} from '../util/api';
import {useAsync} from '../util/useAsync';

interface Props {
  data: ListOption;
  horizontal?: boolean;
}

const MovieList = ({data, horizontal = true}: Props) => {
  const {data: list, error, run} = useAsync<Media[]>(null);
  const {componentId = ''} = useContext(NavigationContext);
  const [mediaTypeSelection] = useMediaTypeSelection();

  useEffect(() => {
    if (data) {
      run(getMediaList(data.mediaType, data.id));
    }
  }, [data, run]);

  const renderItem = ({item}) => (
    <TouchableHighlight
      underlayColor={Colors.slateGray}
      style={styles.touchable}
      onPress={() => onPress(item)}>
      <View style={globalStyle.posterContainer}>
        <Image
          source={{
            uri: getImageUrl(item.poster_path),
          }}
          style={[globalStyle.poster, styles.posterSize]}
        />
      </View>
    </TouchableHighlight>
  );

  const onPress = (item) =>
    Navigation.push(componentId, {
      component: {
        name: 'com.netflixClone.Detail',
        passProps: {item},
      },
    });

  if (
    mediaTypeSelection === MediaTypes.ALL ||
    data.mediaType === mediaTypeSelection
  ) {
    return error ? (
      <Text style={typography.display5}>
        Oops, there was a problem loading this list...
      </Text>
    ) : (
      <>
        <Text style={typography.display4}>{data.title}</Text>
        <FlatList
          style={styles.flatList}
          horizontal={horizontal}
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.id + ''}
        />
      </>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  flatList: {
    marginBottom: 8,
  },
  touchable: {
    borderRadius: 5,
  },
  posterSize: {
    width: 120,
    height: 180,
  },
});

export default MovieList;
