import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {NavigationContext} from 'react-native-navigation-hooks';
import Button from '../components/Button';
import Colors from '../styles/colors';
import {typography} from '../styles/typography';
import {ItemProp} from '../types/ItemProp.type';

const BillboardCtrlBottom = ({item}: ItemProp) => {
  const {componentId = ''} = useContext(NavigationContext);

  return (
    <View style={styles.controlsContainer}>
      <TouchableHighlight
        underlayColor={Colors.slateGray}
        onPress={() => console.log('TODO => Implement add to my list feature')}>
        <View style={styles.controlContainer}>
          <Text style={[typography.display3, styles.iconBig]}>+</Text>
          <Text style={typography.display6}>My List</Text>
        </View>
      </TouchableHighlight>
      <Button
        title="▶ Play"
        onPress={() =>
          Navigation.push(componentId, {
            component: {
              name: 'com.netflixClone.Player',
              passProps: {item, autoplay: true},
            },
          })
        }
      />
      <TouchableHighlight
        underlayColor={Colors.slateGray}
        onPress={() =>
          Navigation.push(componentId, {
            component: {
              name: 'com.netflixClone.Detail',
              passProps: {item},
            },
          })
        }>
        <View style={styles.controlContainer}>
          <Text style={[typography.display3, styles.iconBig]}>ℹ</Text>
          <Text style={typography.display6}>Info</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    padding: 8,
    marginBottom: 0,
    marginTop:0
  },
  controlContainer: {
    alignItems: 'center'
  },
  iconBig: {
    fontSize: 26,
  },
});

export default BillboardCtrlBottom;
