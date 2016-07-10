import BellTreeFlux from '../lib/bell-tree-flux';
import Constant from '../common/Constant';


export default class TodoStore {

	static getStore() {
		if (!TodoStore.instance) {
			TodoStore.instance = new TodoStore();
		}
		return TodoStore.instance;
	}


	constructor() {
		this.data = {};
		this.data.todoList = [
			'ゴミを捨てる',
			'風呂を掃除する',
			'皿を洗う',
			'トイレを掃除する'
		];
		BellTreeFlux.Dispatcher.getDispatcher().register(Constant.ACTION_TYPE.REGISTER_TODO, this.add.bind(this));
		BellTreeFlux.Dispatcher.getDispatcher().register(Constant.ACTION_TYPE.UPDATE_TODO, this.change.bind(this));
		BellTreeFlux.Dispatcher.getDispatcher().register(Constant.ACTION_TYPE.DELETE_TODO, this.delete.bind(this));
	}

	getData() {
		return this.data;
	}

	add(data, payload) {
		this.data.todoList.push(payload.todo);
	}


	change(data, payload) {
		this.data.todoList[payload.index] = payload.todo;
	}


	delete(data, payload) {
		this.data.todoList.splice(payload.index, 1);
	}


	emit(handler, payload) {
		handler(this.data, payload);
	}

};
