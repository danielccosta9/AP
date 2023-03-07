import { combineReducers } from 'redux';
import NavigationReducer from './NavigationReducer';
import NotificationReducer from './NotificationReducer';

const RootReducer = combineReducers({
  notifications: NotificationReducer,
  navigations: NavigationReducer,
});

export default RootReducer;
