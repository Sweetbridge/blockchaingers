import React from 'react'
import {Navbar, NavbarBrand, Container, Row, Col} from 'reactstrap'

const Verifier = ({name}) => (
  <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">SweetBridge</NavbarBrand>
    </Navbar>

    <Container>
      <Row>
        <Col xs="6">fields</Col>
        <Col xs="6">verification result</Col>
      </Row>
    </Container>
  </div>
)

export default Verifier
