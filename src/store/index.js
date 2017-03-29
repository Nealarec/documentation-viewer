import { createStore } from 'redux';
import rootReducer from 'store/reducers';

var user = {
    name: 'Nelson !!'
}

var store = createStore(rootReducer, { user })


export default store;