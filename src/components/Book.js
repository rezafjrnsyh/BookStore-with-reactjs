import React, { useState, useEffect } from "react";
import BookService from "../services/BookService";
import {Form, Button, Row, Table, Col, Container} from "react-bootstrap";

const Book = ({setValid}) => {
  const initialBookState = {
    title: "",
    desc: "",
    year: 0,
    pages: 0,
    language: "",
    publisher: "",
    price: 0,
    stock: 0,
  };
  const [book, setBook] = useState(initialBookState);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // retrieveBooks();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setBook({
      ...book,
      [name]: value,
    });
  };

  const saveBook = () => {
    var data = {
      title: book.title,
      desc: book.desc,
      year: parseInt(book.year),
      pages: parseInt(book.pages),
      language: book.language,
      publisher: book.publisher,
      price: parseInt(book.price),
      stock: parseInt(book.stock),
    };

    BookService.create(data)
      .then((res) => {
          if(res.status = 201) {
              setBook({
                  ...book
              })
              // retrieveBooks()
          }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1>Books</h1>
      <Container>
      <Row>
        <Col
          sm={10} md={11}
          style={{
            marginLeft: "10px",
            marginTop: "10px",
          }}
        >
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>Year</th>
                <th>Price</th>
                <th width="200px">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, i) => {
                console.log(book.id)
                return (
                  <tr key={i}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.desc}</td>
                    <td>{book.year}</td>
                    <td>{book.price}</td>
                    <td> <Button onClick={()=>bookDelete(book.id)}>Delete</Button> <Button>Edit</Button> </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        {/*<Col*/}
        {/*  sm={{*/}
        {/*    span: 4,*/}
        {/*    offset: 1,*/}
        {/*  }}*/}
        {/*  style={{ marginTop: "10px" }}*/}
        {/*>*/}
        {/*  <Form style={{border: '2px solid #d3daff '}}>*/}
        {/*    <Form.Group className="mb-3" controlId="formBasicTitle">*/}
        {/*      <Form.Label>Title</Form.Label>*/}
        {/*      <Form.Control*/}
        {/*        type="text"*/}
        {/*        placeholder="Enter title"*/}
        {/*        value={book.title}*/}
        {/*        name="title"*/}
        {/*        onChange={handleInputChange}*/}
        {/*      />*/}
        {/*    </Form.Group>*/}
        {/*    <Form.Group*/}
        {/*      className="mb-3"*/}
        {/*      controlId="formBasicDesc"*/}
        {/*    >*/}
        {/*      <Form.Label>Description</Form.Label>*/}
        {/*      <Form.Control*/}
        {/*        as="textarea"*/}
        {/*        rows={3}*/}
        {/*        value={book.desc}*/}
        {/*        name="desc"*/}
        {/*        onChange={handleInputChange}*/}
        {/*      />*/}
        {/*    </Form.Group>*/}
        {/*    <Form.Group className="mb-3" controlId="formBasicYear">*/}
        {/*      <Form.Label>Year</Form.Label>*/}
        {/*      <Form.Control*/}
        {/*        type="number"*/}
        {/*        placeholder="Enter Year"*/}
        {/*        value={book.year}*/}
        {/*        name="year"*/}
        {/*        onChange={handleInputChange}*/}
        {/*      />*/}
        {/*    </Form.Group>*/}
        {/*    <Form.Group className="mb-3" controlId="formBasicPages">*/}
        {/*      <Form.Label>Pages</Form.Label>*/}
        {/*      <Form.Control*/}
        {/*        type="number"*/}
        {/*        placeholder="Enter Pages"*/}
        {/*        value={book.pages}*/}
        {/*        name="pages"*/}
        {/*        onChange={handleInputChange}*/}
        {/*      />*/}
        {/*    </Form.Group>*/}
        {/*    <Form.Group className="mb-3" controlId="formBasicLanguage">*/}
        {/*      <Form.Label>Language</Form.Label>*/}
        {/*      <Form.Control*/}
        {/*        type="text"*/}
        {/*        placeholder="Enter Language"*/}
        {/*        value={book.language}*/}
        {/*        name="language"*/}
        {/*        onChange={handleInputChange}*/}
        {/*      />*/}
        {/*    </Form.Group>*/}
        {/*    <Form.Group className="mb-3" controlId="formBasicPublisher">*/}
        {/*      <Form.Label>Publisher</Form.Label>*/}
        {/*      <Form.Control*/}
        {/*        type="text"*/}
        {/*        placeholder="Enter Publisher"*/}
        {/*        value={book.publisher}*/}
        {/*        name="publisher"*/}
        {/*        onChange={handleInputChange}*/}
        {/*      />*/}
        {/*    </Form.Group>*/}
        {/*    <Form.Group className="mb-3" controlId="formBasicPrice">*/}
        {/*      <Form.Label>Price</Form.Label>*/}
        {/*      <Form.Control*/}
        {/*        type="number"*/}
        {/*        placeholder="Enter Price"*/}
        {/*        value={book.price}*/}
        {/*        name="price"*/}
        {/*        onChange={handleInputChange}*/}
        {/*      />*/}
        {/*    </Form.Group>*/}
        {/*    <Form.Group className="mb-3" controlId="formBasicStock">*/}
        {/*      <Form.Label>Stock</Form.Label>*/}
        {/*      <Form.Control*/}
        {/*        type="number"*/}
        {/*        placeholder="Enter Stock"*/}
        {/*        value={book.stock}*/}
        {/*        name="stock"*/}
        {/*        onChange={handleInputChange}*/}
        {/*      />*/}
        {/*    </Form.Group>*/}

        {/*    <Button*/}
        {/*      variant="primary"*/}
        {/*      type="submit"*/}
        {/*      onClick={saveBook}*/}
        {/*      className="btn btn-success"*/}
        {/*    >*/}
        {/*      Submit*/}
        {/*    </Button>*/}
        {/*  </Form>*/}
        {/*</Col>*/}
      </Row>
      </Container>
    </div>
  );
};

export default Book;
