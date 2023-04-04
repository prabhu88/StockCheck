import React from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import './sidebar.scss'
const Sidebar = ({ color, image, routes }) => {
    const location = useLocation();
    const activeRoute = (routeName) => {
        return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };
    return (
        <div className="sidebar" data-image={image} data-color={color}>
            <div
                className="sidebar-background"
                style={{
                    backgroundImage: "url(" + image + ")"
                }}
            /> 
            <div className="sidebar-wrapper">
                <div className="logo d-flex align-items-center justify-content-start">
                    <a href="https://github.com/prabhu88/StockCheck.git" className="simple-text logo-mini mx-1"  rel="noopener noreferrer" target="_blank">
                        <div className="logo-img">
                            StockCheck                            
                        </div>
                    </a>                    
                </div>
                <Nav>
                    {
                        routes.map((prop, key) => {
                            if (!prop.redirect)
                                return (
                                    <li
                                        className={
                                            prop.upgrade
                                                ? "active active-pro"
                                                : activeRoute(prop.layout + prop.path)
                                        }
                                        key={key}
                                    >
                                        <NavLink
                                            to={prop.layout + prop.path}
                                            className="nav-link"
                                            activeClassName="active"
                                        >
                                            <i className={prop.icon} />
                                            <p>{prop.name}</p>
                                        </NavLink>
                                    </li>
                                );
                            return null;
                        })
                    }
                </Nav>
            </div>
        </div>
    )
}

export default Sidebar

