import { Link } from 'react-router-dom'

import styles from './styles.module.css'

function Navbar() {
    return (
        <>
            <nav className={styles.navigation}>
                <ul>
                    <li>
                        <Link to='/' >Home</Link>
                    </li>
                    <li>
                        <Link to='/andress' >Endereço</Link>
                    </li>

                </ul>


            </nav>
        </>)


}
export default Navbar;