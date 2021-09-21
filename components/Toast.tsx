import {useNetInfo} from '@react-native-community/netinfo';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Colors from '../styles/colors';

const Toast = function ({message, componentId}) {
  const {isConnected} = useNetInfo();

  useEffect(() => {
    if (isConnected) {
      Navigation.dismissOverlay(componentId);
    }
  }, [isConnected, componentId]);

  return (
    <View style={styles.root}>
      <View style={styles.toast}>
        <Text style={styles.text}>{message}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Navigation.dismissOverlay(componentId)}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  toast: {
    elevation: 2,
    flexDirection: 'row',
    height: 40,
    margin: 16,
    borderRadius: 20,
    backgroundColor: Colors.slateGray,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    marginLeft: 16,
  },
  button: {
    marginRight: 16,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

Toast.options = {
  layout: {
    componentBackgroundColor: 'transparent',
  },
  overlay: {
    interceptTouchOutside: false,
  },
};

export default Toast;
