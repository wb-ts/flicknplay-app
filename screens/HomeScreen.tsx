import {useNetInfo} from '@react-native-community/netinfo';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Billboard from '../components/Billboard';
import MovieList from '../components/MovieList';
import {MediaTypeSelectionProvider} from '../context/MediaTypeSelectionContext';
import Colors from '../styles/colors';
import {globalStyle} from '../styles/global';
import {homeLists} from '../util/constants';

import BillboardCtrlBottom from '../components/BillboardCtrlBottom';
import {getImageUrl, getMediaList , getVideos_new} from '../util/api';
import {useAsync} from '../util/useAsync';
import {Media} from '../types/Media.type';
import {Video_new} from '../types/Video_new.type';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const HomeScreen = () => {
  const {isConnected} = useNetInfo();
  const {data: list, error, run} = useAsync<Video_new[]>([]);


  useEffect(() => {
    if (!isConnected) {
      Navigation.showOverlay({
        component: {
          name: 'com.netflixClone.offlineToast',
          passProps: {message: 'Offline! Please check your connection.'},
        },
      });
    }
  }, [isConnected]);
  useEffect(() => {
    run(getMediaList());
  }, [run]);
  
  
  // console.log(error);


  const i = 0;
  const item = list[i];


  console.log(list);


  return (
    <View style={styles.homeContainer}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <ScrollView>
          <MediaTypeSelectionProvider>
            
            <Billboard />
            {/* <BillboardCtrlBottom item={item} /> */}
            <View style={styles.movieListContainer}>
              {homeLists.map((list) => (
                <MovieList key={list.title} data={list} />
              ))}
            </View>
          </MediaTypeSelectionProvider>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

HomeScreen.options = {
  bottomTab: {
    text:"Home",
    icon:require('../image/home.png')
  },
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: Colors.charcoal,
    flex: 1,
    height: '100%',
  },
  movieListContainer: {
    ...globalStyle.container,
    flex: 3,
  },
});

export default HomeScreen;
