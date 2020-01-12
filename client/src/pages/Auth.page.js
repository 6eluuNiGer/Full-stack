import React, { useState, useEffect, useContext,} from 'react'
import classes from '../pages/Auth.page.css'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/authContext'


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: '',

    })
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    useEffect(() => {
        window.M.updateTextFields()
    }, [])


    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })

    }                             //змінні параметри обробляють// // event обертка 
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) { }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
            message(data.message)
        } catch (e) { }
    }
    return (
        <div className="row ">
            <div className="col s6 offset-s3 ">
                <div className="card white darken-1 ">
                    <div className="card-content white-text">
                        <span className="card-title blue-text center">SingUp</span>

                        <div className="container_bar">

                            <div className="progress-bar">
                                <div className="shadow"></div>
                            </div>
                        </div>
                        <div className="input-field ">
                            <input
                                placeholder="placeholder"
                                id="email"
                                type="text"
                                name="email"
                                /*  onBlur ={this.ProgressChange} */
                                onChange={changeHandler}/* this.handelChange */
                            />
                            <label htmlFor="email">EMAIL IS REQUIRED</label>
                        </div>
                        <div className="input-field ">
                            <input
                                placeholder="placeholder"
                                id="password"
                                type="password"
                                name="password"
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">PASSWORD</label>
                        </div>
                        <div className="card-action">
                            <button
                                className="btn "
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                Registation
                            </button>
                            <button
                                className="btn"
                                disabled={loading}
                                onClick={loginHandler}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
