import React, { useEffect, useState } from 'react'
import './App.css';
import getPage from './api/content';
import ComparisonTool from './Components/ComparisonTool';

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
			<div className='loadingFrame'>
				<div className='loadingSpinner' />
			</div>
		);
	}

	return (
		<ComparisonTool data={data} />
	);
}

export default App;
