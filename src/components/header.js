import React from 'react'
import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
            <LinkContainer to="/">
                <Navbar.Brand>Toko Buku</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/books">
                        <Nav.Link>Book</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav className="mr-auto">
                    <LinkContainer to="/members">
                        <Nav.Link>Users</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
            <Button variant={"danger"}>Logout</Button>
            </Container>
        </Navbar>
    )
}

export default header
