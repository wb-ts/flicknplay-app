import React, {useContext, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {NavigationContext} from 'react-native-navigation-hooks';
import Button from '../components/Button';
import MediaResults from '../components/MediaResults';
import VideoPlayer from '../components/VideoPlayer';
import Colors from '../styles/colors';
import {globalStyle} from '../styles/global';
import {typography} from '../styles/typography';
import {ItemProp} from '../types/ItemProp.type';
import {MediaDetail as MediaDetailType} from '../types/MediaDetail.type';
import {Recommendation} from '../types/Recommendations.type';
import {getDetails, getRecommendations} from '../util/api';
import {useAsync} from '../util/useAsync';

const MediaDetail = ({item}: ItemProp) => {
  const {componentId = ''} = useContext(NavigationContext);
  const {data: detail, error, run} = useAsync<MediaDetailType>(null);
  const {
    data: recommendations,
    error: recommendationsError,
    run: recommendationsRun,
  } = useAsync<Recommendation[]>([]);

  useEffect(() => {
    if (item) {
      run(getDetails(item));
      recommendationsRun(getRecommendations(item));
    }
  }, [item, run, recommendationsRun]);

  return detail && !error ? (
    <View style={styles.detailContainer}>
      <SafeAreaView style={globalStyle.flex}>
        <View style={styles.videoContainer}>
          <VideoPlayer item={item} autoplay={true} />
        </View>
        <ScrollView contentContainerStyle={globalStyle.container}>
          <Text style={typography.display2}>{detail.name || detail.title}</Text>
          <Text style={typography.display6}>{detail.tagline}</Text>
          <View style={styles.playBtnContainer}>
            <Button
              title="▶ Play"
              onPress={() =>
                Navigation.push(componentId, {
                  component: {
                    name: 'com.netflixClone.Player',
                    passProps: {item},
                  },
                })
              }
            />
          </View>
          <View>
            <Text style={typography.display6}>{detail.overview}</Text>
          </View>
          <View style={globalStyle.flex}>
            <Text style={styles.label}>More Like This</Text>
            <MediaResults data={recommendations} error={recommendationsError} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  ) : null;
};

MediaDetail.options = {
  topBar: {
    visible: true,
    background: {
      color: Colors.charcoal,
    },
  },
};

const styles = StyleSheet.create({
  detailContainer: {
    backgroundColor: Colors.charcoal,
    flex: 1,
  },
  videoContainer: {
    height: '30%',
    minHeight: 200,
    backgroundColor: Colors.black,
  },
  playBtnContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  label: {
    ...typography.display4,
    marginTop: 16,
    marginBottom: 8,
  },
});

export default MediaDetail;
