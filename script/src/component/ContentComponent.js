'use strict';

import React from 'react';
import BellTreeFlux from '../lib/bell-tree-flux';
import Constant from '../common/Constant';
import TodoComponent from './TodoComponent';
import TodoStore from '../store/TodoStore';


export default class ContentComponent extends React.Component {


	constructor(props) {
		super(props);
		this.state = {};
		this.state.todoList = [];
		this.handleClickRegisterButton = this.handleClickRegisterButton.bind(this);
		this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this);
		this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this);
		this.handleChangeNewTodo = this.handleChangeNewTodo.bind(this);
		this.onRegisterTodo = this.onRegisterTodo.bind(this);
		this.onDeleteTodo = this.onDeleteTodo.bind(this);
		BellTreeFlux.Dispatcher.getDispatcher().register(Constant.ACTION_TYPE.REGISTER_TODO, this.onRegisterTodo);
		BellTreeFlux.Dispatcher.getDispatcher().register(Constant.ACTION_TYPE.DELETE_TODO, this.onDeleteTodo);
	}


	componentDidMount() {
		const todoList = TodoStore.getStore().getData().todoList;
		this.setState({
			todoList: todoList
		});
	}


	componentWillUnmount() {
		BellTreeFlux.Dispatcher.getDispatcher().remove(Constant.ACTION_TYPE.READ_ALL, this.onReadAll);
		BellTreeFlux.Dispatcher.getDispatcher().remove(Constant.ACTION_TYPE.REGISTER_TODO, this.onRegisterTodo);
		BellTreeFlux.Dispatcher.getDispatcher().remove(Constant.ACTION_TYPE.DELETE_TODO, this.onDeleteTodo);
	}

	handleClickRegisterButton() {
		const payload = {
			actionType: Constant.ACTION_TYPE.REGISTER_TODO,
			todo: this.refs.new_todo_content.value
		};
		BellTreeFlux.Dispatcher.getDispatcher().dispatch(payload);
		this.setState({
			newTodo: ''
		});
	}


	handleClickDeleteButton(index) {
		const payload = {
			actionType: Constant.ACTION_TYPE.DELETE_TODO,
			index: index
		};
		BellTreeFlux.Dispatcher.getDispatcher().dispatch(payload);
	}


	handleClickUpdateButton(index, todo) {
		const payload = {
			actionType: Constant.ACTION_TYPE.UPDATE_TODO,
			todo: todo,
			index: index
		};
		BellTreeFlux.Dispatcher.getDispatcher().dispatch(payload);
	}


	handleChangeNewTodo(event) {
		event.preventDefault();
		this.setState({
			newTodo: event.target.value
		})
	}


	onRegisterTodo(data) {
		this.setState({
			todoList: data.todoList
		});
	}


	onDeleteTodo(data) {
		this.setState({
			todoList: data.todoList
		});
	}


	render() {

		return(
			<div>
				<fieldset className="center-block form-group">
					<input
						type="text"
						id="new_todo_content"
						ref="new_todo_content"
						className="form-control"
						placeholder="new todo"
						value={this.state.newTodo}
						onChange={this.handleChangeNewTodo}
					/>
					<button
						onClick={this.handleClickRegisterButton}
						className="btn btn-primary"
					>
						Add New Todo
					</button>
				</fieldset>
				<ul className="list-group">
					{this.state.todoList.map((todo, index) => {
						return (
							<TodoComponent
								key={index}
								todo={todo}
								index={index}
								handleClickDeleteButton={this.handleClickDeleteButton}
								handleClickUpdateButton={this.handleClickUpdateButton}
							/>
						);
				  })}
				</ul>
			</div>
		);
	}

}
