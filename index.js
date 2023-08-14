/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust';

AppRegistry.registerComponent(appName, () => App);
