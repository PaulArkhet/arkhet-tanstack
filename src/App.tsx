/*
Author: Paul Kim, Vitor Akiyama, Selina Park
Date: September 16, 2024
Version: 0.0.1
Detail: App for Arkhet
*/

import './App.css';
import { Router } from './router';
import { RouterProvider } from 'react-router-dom';

function App() {
    const router = Router();

    return <RouterProvider router={router} />;
}

export default App;
