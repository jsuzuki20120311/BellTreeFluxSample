import React from 'react';

import HeaderComponent from './HeaderComponent';
import ContentComponent from './ContentComponent';


export default class AppComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<HeaderComponent />
				<ContentComponent />
			</div>
		);
	}
}
