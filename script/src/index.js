import React from 'react';
import ReactDOM from 'react-dom';
import BellTreeFlux from 'bell-tree-flux';
import AppComponent from './component/AppComponent';
import TodoStore from './store/TodoStore';

BellTreeFlux.Dispatcher.getDispatcher().setStore(TodoStore.getStore());
ReactDOM.render(<AppComponent />, document.getElementById('app'));
