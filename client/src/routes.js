import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthFinal } from '../src/pages/Auth.Final'
import { AuthPage } from '../src/pages/Auth.page'
import { AllUserPage } from '../src/pages/allUser.page'


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                {/* <Route path="/links" exact>
                    <AuthPage />
                </Route> */}
                <Route path="/authfinal" exact>                                  {/* 2page */}
                    <AuthFinal />
                </Route>
                <Route path="/alluser/:id" >                                      {/* allUser.page */}
                    <AllUserPage />
                </Route>
                {/* <Redirect to="/links" /> */}
                <Redirect to="authfinal" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact >                                               {/* 1-st paga. auth */}
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}