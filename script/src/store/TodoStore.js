'use strict';

import BellTreeFlux from '../lib/bell-tree-flux';
import Constant from '../common/Constant';


export default class TodoStore {


	static get STORAGE_KEY() {
		return 'bell-tree-flux-sample-data';
	}


	static getStore() {
		if (!TodoStore.instance) {
			TodoStore.instance = new TodoStore();
		}
		return TodoStore.instance;
	}


	constructor() {
		if (JSON.parse(window.localStorage.getItem(TodoStore.STORAGE_KEY))) {
		 	this.data = JSON.parse(window.localStorage.getItem(TodoStore.STORAGE_KEY));
		} else {
			this.data = {};
		}
		if (!this.data.todoList) {
			this.data.todoList = [];
			window.localStorage.setItem(TodoStore.STORAGE_KEY, JSON.stringify(this.data));
		}
		BellTreeFlux.Dispatcher.getDispatcher().register(Constant.ACTION_TYPE.REGISTER_TODO, this.add.bind(this));
		BellTreeFlux.Dispatcher.getDispatcher().register(Constant.ACTION_TYPE.UPDATE_TODO, this.change.bind(this));
		BellTreeFlux.Dispatcher.getDispatcher().register(Constant.ACTION_TYPE.DELETE_TODO, this.delete.bind(this));
	}

	getData() {
		return this.data;
	}

	add(data, payload) {
		this.data.todoList.push(payload.todo);
		window.localStorage.setItem(TodoStore.STORAGE_KEY, JSON.stringify(this.data));
	}


	change(data, payload) {
		this.data.todoList[payload.index] = payload.todo;
		window.localStorage.setItem(TodoStore.STORAGE_KEY, JSON.stringify(this.data));
	}


	delete(data, payload) {
		this.data.todoList.splice(payload.index, 1);
		window.localStorage.setItem(TodoStore.STORAGE_KEY, JSON.stringify(this.data));
	}


	emit(handler, payload) {
		handler(this.data, payload);
	}

};
