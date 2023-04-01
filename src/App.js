import React, { useEffect, useState } from 'react'
import './App.css';
import getPage from './api/content';
import Grid from './Components/Grid';

const App = () => {
	// Handles the fetching of the data.
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([])

	useEffect(() => {
		// Loads the data
		getPage()
			.then(resp => {
				setData(resp.blocks[0].products)
				setIsLoading(false);
			})
			.catch(error => {
				console.log('Something went wrong: ' + error)
			})
	}, [])

	if (isLoading) {
		return (
			<div>
				Loading data
			</div>
		);
	}

	return (
		<Grid movieData={data} />
	);
}

export default App;
