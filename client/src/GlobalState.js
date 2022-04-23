import React, { createContext, useState, useEffect } from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'

import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false);


    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin');
        const atoken=localStorage.getItem('accesstoken');
        
        if (firstLogin) {
            
            const refreshToken = async () => {
                
                const res = await axios.post('http://localhost:5000/bazar/refresh_token',{
                    accesstoken:atoken
                }).then((res)=>{
                    console.log(res);
                    console.log("success!!");
                    console.log("New Token :",res.data.accesstoken);
                    console.log("flag :",res.data.accesstoken);
                    // UserAPI(token);
                    setToken(res.data.accesstoken);
                }).catch((err)=>{
                    console.log(err);
                })
                
                

                

                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    }, [])



    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}