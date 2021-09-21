import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {typography} from '../styles/typography';
import {Media} from '../types/Media.type';
import {getImageUrl, getMediaList} from '../util/api';
import {useAsync} from '../util/useAsync';
import BillboardCtrlTop from './BillboardCtrlTop';

const Billboard = () => {
  const {data: list, error, run} = useAsync<Media[]>([]);

  useEffect(() => {
    run(getMediaList());
  }, [run]);

  const i = 0;
  const item = list[i];

  return (
    <View style={styles.billboard}>
      {error ? (
        <View>
          <Text style={typography.display5}>{error.message}</Text>
        </View>
      ) : (
        <ImageBackground
          source={{uri: getImageUrl(item?.backdrop_path, 500)}}
          style={styles.backgroundImage}>
          <BillboardCtrlTop />
          <Text
            style={typography.display1}
            adjustsFontSizeToFit
            allowFontScaling>
            {item?.title}
          </Text>
          <Text style={styles.subtitle}>#{i + 1} in Canada Today</Text>
          
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  billboard: {
    flex: 1,
  },
  backgroundImage: {
    minHeight: 300,
  },
  subtitle: {
    ...typography.display4,
    textAlign: 'center',
  },
});

export default Billboard;
