import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'
export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({          //Записуєм в локасторадж tokenn and id
            userId: id, token: jwtToken
        }))
    }, [])
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)                        // ОЧищаємо локал  
    }, [])
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))    // якщо в локалі є пользователь 
        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])
    return { login, logout, token, userId }
}