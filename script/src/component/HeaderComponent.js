'use strict';

import React from 'react';


export default class HeaderComponent extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return(
			<header>
				<h1 className="display-1">BellTreeFlux Sample Todo application</h1>
				<ul>
					<li><a href="https://github.com/jsuzuki20120311/bell-tree-flux" target="_blank">GitHub bell-tree-flux</a></li>
					<li><a href="https://github.com/jsuzuki20120311/bell-tree-flux-sample" target="_blank">GitHub bell-tree-flux-sample</a></li>
				</ul>
			</header>
		);
	}
}