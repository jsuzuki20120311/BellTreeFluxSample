'use strict';

import React from 'react';
import BellTreeFlux from '../lib/bell-tree-flux';
import Constant from '../common/Constant';


export default class TodoComponent extends React.Component {


	constructor(props) {
		super(props);
		this.state = {};
		this.handleChangeTodo = this.handleChangeTodo.bind(this);
		this.handleClickDeleteButton = this.handleClickDeleteButton.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete= this.onDelete.bind(this);
		BellTreeFlux.Dispatcher.getDispatcher().register(Constant.ACTION_TYPE.UPDATE_TODO, this.onUpdate);
		BellTreeFlux.Dispatcher.getDispatcher().register(Constant.ACTION_TYPE.DELETE_TODO, this.onDelete);
	}


	componentDidMount() {
		this.setState({
			todo: this.props.todo
		});
	}


	componentWillUnmount() {
		BellTreeFlux.Dispatcher.getDispatcher().remove(Constant.ACTION_TYPE.UPDATE_TODO, this.onUpdate);
		BellTreeFlux.Dispatcher.getDispatcher().remove(Constant.ACTION_TYPE.DELETE_TODO, this.onDelete);
	}


	handleChangeTodo(event) {
		event.preventDefault();
		const index = this.props.index;
		const todo = event.target.value;
		this.props.handleClickUpdateButton(index, todo);
	}


	handleClickDeleteButton() {
		this.props.handleClickDeleteButton(this.props.index);
	}


	onUpdate(data) {
		this.setState({
			todo: data.todoList[this.props.index]
		});
	}


	onDelete(data) {
		this.setState({
			todo: data.todoList[this.props.index]
		});
	}


	render() {
		return(
			<li className="list-group-item">
				<div className="row">
					<div className="col-lg-10">
						<input
							type="text"
							ref="todo_input"
							className="form-control"
							onChange={this.handleChangeTodo}
							value={this.state.todo}
						/>
					</div>
					<div className="col-lg-2">
						<button
							className="btn btn-danger"
							onClick={this.handleClickDeleteButton}
						>
							Delete
						</button>
					</div>
				</div>
			</li>
		);
	}

}
