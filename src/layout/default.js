import React, { useRef,useEffect } from 'react'
import { Route, Switch,useLocation,useHistory } from 'react-router-dom'
import { useSelector } from "react-redux"

import Sidebar from '../component/sidebar/sidebar'
import routes from '../routes'
import TopNav from '../component/topnav/nvabar'
const Layout = (props) => {  
  const location = useLocation();  
  const navigate = useHistory()
  const {isLoggedIn,user} = useSelector(state => state.auth)
  useEffect(() => {
    let checkLogin = (isLoggedIn,error,user) => {            
        if(!isLoggedIn && (user != null || typeof user != undefined)){
            navigate.push('/login')                    
        }         
    }
    checkLogin(isLoggedIn,user);
    return () => {
        checkLogin = undefined
    }
}, [ isLoggedIn, user,navigate])
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  useEffect(() => {
    const  pathname = location.pathname;    
    if ( pathname.indexOf("Dashboard") > -1) {      
      
    } else {      
      
    }
  }, [location]);
  const mainPanel = useRef(null)
  return (
    <>
      <div className="wrapper">
        <Sidebar routes={routes}  color="purple" />
        <div className="main-panel" ref={mainPanel}>
          <TopNav />
          <div className="content">
            <Switch>
              {getRoutes(routes)}
            </Switch>
          </div>
        </div>
      </div>
    </>
  )
}
export default Layout