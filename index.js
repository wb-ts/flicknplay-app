import {Navigation} from 'react-native-navigation';
import {withNavigationProvider} from 'react-native-navigation-hooks';
import Orientation from 'react-native-orientation-locker';
import Toast from './components/Toast';
import FullPlayer from './screens/FullPlayer';
import HomeScreen from './screens/HomeScreen';
import MediaDetail from './screens/MediaDetail';
import Search from './screens/Search';
import Colors from './styles/colors';

Orientation.lockToPortrait();

Navigation.registerComponent('com.netflixClone.Home', () =>
  withNavigationProvider(HomeScreen),
);
Navigation.registerComponent('com.netflixClone.Detail', () =>
  withNavigationProvider(MediaDetail),
);
Navigation.registerComponent('com.netflixClone.Player', () =>
  withNavigationProvider(FullPlayer),
);
Navigation.registerComponent('com.netflixClone.Search', () =>
  withNavigationProvider(Search),
);
Navigation.registerComponent('com.netflixClone.offlineToast', () =>
  withNavigationProvider(Toast),
);

Navigation.setDefaultOptions({
  topBar: {
    visible: false,
  },
  bottomTabs: {
    barStyle: 'black',
    visible: true,
    backgroundColor: Colors.charcoal,
  },
  bottomTab: {
    selectedTextColor: Colors.white,
    textColor: Colors.slateGray,
    fontSize: 15,
    selectedFontSize: 15
  },
});

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'com.netflixClone.Home',
                  },
                },
              ],
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'com.netflixClone.Search',
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
});
