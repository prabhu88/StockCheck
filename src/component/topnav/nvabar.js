import React from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar, Container,Button } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {LOGOUT} from '../../redux/actionTypes'
import routes from '../../routes'
import './navbar.scss'
const Topnav = () => {
    const location = useLocation()
    const dispatch = new useDispatch()
    const mobileSidebarToggle = (e) => {
        e.preventDefault();
        document.documentElement.classList.toggle("nav-open");
        var node = document.createElement("div");
        node.id = "bodyClick";
        node.onclick = function () {
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle("nav-open");
        };
        document.body.appendChild(node);
    };
    const getBrandText = () => {
        for (let i = 0; i < routes.length; i++) {
            if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
                return routes[i].name;
            }
        }
        return "";
    };
    const logout = (e) => {        
        e.preventDefault()
        dispatch({type:LOGOUT})
    }
    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container fluid>
                <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
                    <Button
                        variant="dark"
                        className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
                        onClick={mobileSidebarToggle}
                    >
                        <i className="fas fa-ellipsis-v"></i>
                    </Button>
                    <Navbar.Brand
                        href="#home"
                        onClick={(e) => e.preventDefault()}
                        className="mr-2 "
                    >
                        {getBrandText()}
                    </Navbar.Brand>
                </div>                
                <div className=" right">
                    <button onClick={logout} >
                    Logout
                    </button>
                </div>
            </Container>
        </Navbar>
    )
}
export default Topnav;