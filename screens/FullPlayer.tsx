import {useDimensions} from '@react-native-community/hooks';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import VideoPlayer from '../components/VideoPlayer';
import {ItemProp} from '../types/ItemProp.type';

const FullPlayer = ({item}: ItemProp) => {
  const {width, height} = useDimensions().screen;

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => Orientation.lockToPortrait();
  }, []);

  return (
    <View style={{flex: 1, height, width}}>
      <VideoPlayer item={item} autoplay={true} autoFullscreen={true} />
    </View>
  );
};

FullPlayer.options = {
  bottomTabs: {
    visible: false,
  },
};

export default FullPlayer;
