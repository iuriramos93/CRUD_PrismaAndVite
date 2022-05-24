import {
    Link,
    Routes,
    Route,


} from 'react-router-dom'

import Home from './pages/Home'
import Pessoa from './pages/Pessoa';
function Rotas() {

    return (

        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pessoa' element={<Pessoa />} />
        </Routes>
    );



}

export { Rotas }