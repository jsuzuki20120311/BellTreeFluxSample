'use strict';

// LICENSE: MIT

/**
 * Dispatcherクラス
 */

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dispatcher = function () {
	_createClass(Dispatcher, null, [{
		key: 'getDispatcher',


		/**
   * Dispatcherインスタンスを取得します。
   * @returns {Dispatcher}
   */
		value: function getDispatcher() {
			if (!Dispatcher.instance) {
				Dispatcher.instance = new Dispatcher();
			}
			return Dispatcher.instance;
		}

		/**
   * コンストラクタ
   */

	}]);

	function Dispatcher() {
		_classCallCheck(this, Dispatcher);

		this.handlers = {};
	}

	/**
  * DispatcherにStoreオブジェクトを設定します。<br>
  * 設定するStoreオブジェクトはemitメソッドを実装していなくてはなりません。
  * @param store {Object}
  */


	_createClass(Dispatcher, [{
		key: 'setStore',
		value: function setStore(store) {
			if (!store) {
				throw new Error('Illegal argument.');
			}
			if (typeof store.emit !== 'function') {
				throw new Error('Illegal argument. Store must implement the emit method.');
			}
			this.store = store;
		}

		/**
   * キー(actionType)とそれに対応するコールバック関数(function)を設定します。
   * @param actionType {string}
   * @param callback {function}
   */

	}, {
		key: 'register',
		value: function register(actionType, callback) {
			if (typeof actionType !== 'string') {
				throw new Error('Illegal argument. Action type must be string.');
			}
			if (typeof callback !== 'function') {
				throw new Error('Illegal argument. Action type must be function.');
			}
			if (!this.handlers[actionType]) {
				this.handlers[actionType] = [];
			}
			var index = this.handlers[actionType].indexOf(callback);
			if (index !== -1) {
				return;
			}
			this.handlers[actionType].push(callback);
		}

		/**
   * キー(actionType)で登録されたコールバック関数(function)を削除します。
   * @param actionType {string}
   * @param callback {function}
   */

	}, {
		key: 'remove',
		value: function remove(actionType, callback) {
			if (typeof actionType !== 'string') {
				throw new Error('Illegal argument. Action type must be string.');
			}
			if (typeof callback !== 'function') {
				throw new Error('Illegal argument. Action type must be function.');
			}
			var index = this.handlers[actionType].indexOf(callback);
			if (index === -1) {
				return;
			}
			this.handlers[actionType].splice(index, 1);
		}

		/**
   * 第一引数に与えられたオブジェクトの actionType でもって、<br>
   * register メソッドで事前に設定されたcallback関数を実行します。
   * @param payload {Object}
   */

	}, {
		key: 'dispatch',
		value: function dispatch(payload) {
			if (!payload) {
				throw new Error('Illegal argument. Payload does not exist.');
			}
			if (typeof payload.actionType !== 'string') {
				throw new Error('Illegal argument. Action type of payload must be string.');
			}
			if (!this.handlers[payload.actionType]) {
				return;
			}
			for (var i = 0; i < this.handlers[payload.actionType].length; i++) {
				var handler = this.handlers[payload.actionType][i];
				this.store.emit(handler, payload);
			}
		}
	}]);

	return Dispatcher;
}();

exports.default = Dispatcher;
;