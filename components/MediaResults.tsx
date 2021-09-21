import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {typography} from '../styles/typography';
import {Recommendation} from '../types/Recommendations.type';
import {SearchResult} from '../types/Search.type';
import {Trending} from '../types/Trending.type';
import MediaCard from './MediaCard';

type dataType = (Recommendation | SearchResult | Trending)[];

interface Props {
  data: dataType;
  error: any;
}

const MediaResults = ({data, error}: Props) => {
  return error ? (
    <Text style={typography.display5}>
      Oops, there was a problem loading ...
    </Text>
  ) : (
    <View style={styles.listContainer}>
      {data
        .filter((el) => el.poster_path != null)
        .map((el) => (
          <MediaCard key={el.id} item={el} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});

export default MediaResults;
