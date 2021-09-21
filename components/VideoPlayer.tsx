import {useDeviceOrientation} from '@react-native-community/hooks';
import React, {useEffect, useReducer} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import YouTube from 'react-native-youtube';
import Colors from '../styles/colors';
import {Media} from '../types/Media.type';
import {Video} from '../types/Video.type';
import {getVideos} from '../util/api';
import {useAsync} from '../util/useAsync';

interface Props {
  item: Media;
  autoplay?: boolean;
  autoFullscreen?: boolean;
  showFullscreenButton?: boolean;
}

interface State {
  status: string;
  isFullscreen: boolean;
}

const initialState: State = {
  status: 'paused',
  isFullscreen: false,
};

function reducer(state: State, action): State {
  switch (action.type) {
    case 'STATUS_CHANGE':
      return {...state, status: action.status};
    case 'ORIENTATION_LANDSCAPE':
      return {
        ...state,
        isFullscreen: state.status === 'playing' && action.landscape,
      };
    case 'FULLSCREEN_CHANGE':
      return {...state, isFullscreen: action.isFullscreen};
    default:
      throw new Error(`Error: the action ${action.type} is not supported.`);
  }
}

const VideoPlayer = ({
  item,
  autoplay = false,
  autoFullscreen = false,
  showFullscreenButton = true,
}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {data: videos, error, run} = useAsync<Video[]>([]);
  const orientation = useDeviceOrientation();

  const {status, isFullscreen} = state;
  const video = videos.filter((video) => video.type === 'Trailer')[0];

  useEffect(() => {
    if (item) {
      run(getVideos(item));
    }
  }, [item, run]);

  useEffect(() => {
    if (!autoFullscreen) {
      dispatch({
        type: 'ORIENTATION_LANDSCAPE',
        isLandscape: orientation.landscape,
      });
    }
  }, [autoFullscreen, status, orientation]);

  return video && !error ? (
    <YouTube
      videoId={video.key}
      play={status === 'playing' || autoplay}
      fullscreen={isFullscreen}
      showFullscreenButton={showFullscreenButton}
      controls={2}
      modestbranding={true}
      showinfo={false}
      rel={false}
      style={styles.player}
      onChangeState={(e) => dispatch({type: 'STATUS_CHANGE', status: e.state})}
      onChangeFullscreen={(e) =>
        dispatch({type: 'FULLSCREEN_CHANGE', isFullscreen: e.isFullscreen})
      }
    />
  ) : error ? (
    <Text>Error: {error.message}</Text>
  ) : (
    <View style={styles.ActivityIndicatorContainer}>
      <ActivityIndicator
        size={isFullscreen ? 'large' : 'small'}
        color={Colors.red}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  player: {
    alignSelf: 'stretch',
    height: '100%',
  },
  ActivityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoPlayer;
