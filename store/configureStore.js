import { createStore } from 'redux';
import toggleFavorite from './reducers/favoriteReducer'

export default createStore(toggleFavorite)