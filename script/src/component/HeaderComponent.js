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
			</header>
		);
	}
}