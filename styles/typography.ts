import {StyleSheet} from 'react-native';
import Colors from './colors';

export const baseTextStyles = {
  fontFamily: 'Helvetica',
  color: Colors.white,
};

export const typography = StyleSheet.create({
  display1: {
    ...baseTextStyles,
    fontSize: 40,
    lineHeight: 60,
    fontWeight: '900',
    textAlign: 'center',
  },
  display2: {
    ...baseTextStyles,
    fontSize: 32,
    lineHeight: 48,
    fontWeight: '700',
  },
  display3: {
    ...baseTextStyles,
    fontSize: 28,
    lineHeight: 41,
    fontWeight: '600',
  },
  display4: {
    ...baseTextStyles,
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '500',
  },
  display5: {
    ...baseTextStyles,
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '400',
  },
  display6: {
    ...baseTextStyles,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
});
