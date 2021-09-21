import React from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import Button from '../components/Button';
import {useMediaTypeSelection} from '../context/MediaTypeSelectionContext';
import {MediaType, MediaTypes} from '../types/MediaTypes.enum';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const BillboardCtrlTop = () => {
  const [mediaTypeSelection, setMediaTypeSelection] = useMediaTypeSelection();

  const isMediaVisible = (mediaType: MediaType): boolean =>
    mediaTypeSelection === mediaType || mediaTypeSelection === MediaTypes.ALL;

  const handleMediaTypeSelection = (selection: MediaType) => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    });

    if (selection === mediaTypeSelection) {
      setMediaTypeSelection(MediaTypes.ALL);
    } else {
      setMediaTypeSelection(selection);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowTop1}>
        <View>
          <Image
            style={styles.logo}
            source={require('../image/Netflix_logo.png')}
          />
        </View>
        <View style={styles.rowTop2}>
          <View style={styles.button}>
          </View>
          <View style={styles.button}>
            <Button title="🐨" link onPress={() => console.log('🐨 clicked')} />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: -180 ,
          justifyContent: isMediaVisible(MediaTypes.ALL)
            ? 'space-around'
            : 'flex-start',
        }}>
        {isMediaVisible(MediaTypes.TV) ? (
          <Button
            title="TV Shows"
            link
            onPress={() => handleMediaTypeSelection(MediaTypes.TV)}
          />
        ) : null}
        {isMediaVisible(MediaTypes.MOVIE) ? (
          <Button
            title="Movies"
            link
            onPress={() => handleMediaTypeSelection(MediaTypes.MOVIE)}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowTop1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 20,
  },
  rowTop2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    width: 75,
  },
  logo: {
    margin: 10,
    height: 30,
    width: 30,
  },
});

export default BillboardCtrlTop;
