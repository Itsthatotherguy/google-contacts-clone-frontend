import { combineReducers } from 'redux';
import user from './user';
import ui from './ui';
import contacts from './contacts';

export default combineReducers({ user, ui, contacts });
