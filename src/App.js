import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import {RoutesApp} from './RoutesApp'
import ScrollToTop from './ScrollToTop'

const App  = () => {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
		  <ScrollToTop />
		
			<RoutesApp/>				
		
		</BrowserRouter>
   					
	)
}

export default App