import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const loggerMiddleware = createLogger({});

// const middle = applyMiddleware(promise(), thunk, loggerMiddleware);
const enhancer = compose(
    // middle,
    // persistState()
);

// export default createStore(rootReducer, enhancer)
export default function configureStore(){
    return createStore(
        rootReducer, 
        applyMiddleware(thunk)
    )
}