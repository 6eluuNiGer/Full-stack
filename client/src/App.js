import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/authContext'



function App() {
  
  const { token, login, logout, userId } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)   //flug 2 page       
  return (
    
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      
      <Router>
        <div className="container">
          {routes}
        </div>

      </Router>
    </AuthContext.Provider>
  )
}

export default App
