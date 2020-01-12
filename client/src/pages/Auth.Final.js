import React, { useContext } from 'react'
import classes from '../pages/Auth.Final.css'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export const AuthFinal = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    const goHandler = event => {
        event.preventDefault()
        history.push('/alluser/:id')
    }
    return (
        <div>
            <nav>
                <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
                    <span className="brand-logo">Project</span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {/* <li><a href="/alluser/:id" onClick={setListHandler}>Список</a></li> */}
                        <li><a href="/" onClick={logoutHandler}>выйти</a></li>
                    </ul>
                </div>
            </nav>
            <div className="row ">
                <div className="col s6 offset-s3 ">
                    <div className="card white darken-1" style={{ marginTop: '30px' }}>
                        <div className="card-content white-text">
                            <span className="card-title blue-text center">Thanks you</span>
                        </div>
                        <div className="dashboard" >
                            <button
                                className="bbb"
                                onClick={goHandler}
                            >
                                Go to Dashboard
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
