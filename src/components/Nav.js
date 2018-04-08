import React from 'react'
import { Navbar, NavbarBrand} from 'reactstrap'
import logo from '../assets/logo.svg'
const Nav = () => (
  <Navbar color="light" light expand="md">
    <NavbarBrand href="/">
      <img src={logo} />
    </NavbarBrand>
  </Navbar>
)
export default Nav
