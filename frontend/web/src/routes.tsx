import {
    Link,
    Routes,
    Route,


} from 'react-router-dom'

import Home from './pages/Home'
import Pessoa from './pages/Pessoa';
import Endereco from './pages/Endereco'



function Rotas() {

    return (

        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pessoa' element={<Pessoa />} />
            <Route path='/andress' element={<Endereco />} />
        </Routes>
    );



}

export { Rotas }