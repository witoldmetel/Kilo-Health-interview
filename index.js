import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import './src/utils/locale';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
