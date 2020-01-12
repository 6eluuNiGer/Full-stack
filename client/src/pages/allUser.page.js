import React, {useContext} from 'react'
import {useHistory } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import classes from '../pages/allUser.page.css'
import { useState, useEffect } from "react";
import productService from './productService';

export const AllUserPage = () => {
  const [products, setproducts] = useState(null);
  useEffect(() => {
    if (!products) {
      getProducts();
    }
  })
  const getProducts = async () => {
    let res = await productService.getAll();
    console.log(res);
    setproducts(res);
  }
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }
  const renderProduct = product => {
    return (
      <table key={product._id} className="highlight" style={{ marginTop: "30px" }}>
        {/* <thead>
          <td>email</td>
          <td>ID</td>
        </thead> */},
        <tbody>
          <tr  key={product._id} className={classes.list__item}>
            <td className={classes.product__name}>{product.email}</td>
            <td className={classes.product__id}>{product._id}</td>
          </tr>
        </tbody>
      </table>
    );
  }
  return (
    <div>
      <div>
        <nav>
          <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
            <span className="brand-logo">Project</span>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="/" onClick={logoutHandler}>выйти</a></li>
            </ul>
          </div>
        </nav>
        {(products && products.length > 0) ? (
          products.map(product => renderProduct(product))
        ) : (
            <p>No products found</p>
          )}
      </div>
    </div>
  )
}
