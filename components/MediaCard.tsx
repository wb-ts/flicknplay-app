import React, {useContext} from 'react';
import {Image, TouchableHighlight} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {NavigationContext} from 'react-native-navigation-hooks';
import Colors from '../styles/colors';
import {globalStyle} from '../styles/global';
import {getImageUrl} from '../util/api';

interface Props {
  item: any;
}

const MediaCard = ({item}: Props) => {
  const {componentId = ''} = useContext(NavigationContext);

  const onPress = () => {
    Navigation.push<Props>(componentId, {
      component: {
        name: 'com.netflixClone.Detail',
        passProps: {item},
      },
    });
  };

  return (
    <TouchableHighlight
      underlayColor={Colors.slateGray}
      onPress={onPress}
      style={globalStyle.posterContainer}>
      <Image
        source={{
          uri: getImageUrl(item.poster_path),
        }}
        style={globalStyle.poster}
      />
    </TouchableHighlight>
  );
};

export default MediaCard;
