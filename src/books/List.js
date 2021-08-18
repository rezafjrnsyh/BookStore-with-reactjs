import React, {useEffect, useState} from 'react';
import BookService from "../services/BookService";
import {Button, Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function List({match}) {
    const { path } = match;
    const [books, setBooks] = useState([]);

    useEffect(() => {
        retrieveBooks();
    }, []);

    const retrieveBooks = () => {
        BookService.getAll()
            .then((response) => {
                setBooks(response.data);
                console.log('data',response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const bookDelete = id => {
        console.log("called", id)
        BookService.deleteBook(id)
            .then((res) => {
                console.log('res',res)
                retrieveBooks()
            })
    };

    return (
        <div>
            <Container>
            <div style={{textAlign:"left"}}>
                <h1>Books</h1>
                <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Book</Link>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th width="5%">No</th>
                        <th width="10%">Title</th>
                        <th width="30%">Description</th>
                        <th width="5%">Year</th>
                        <th width="10%">Price</th>
                        <th width="5%">Stock</th>
                        <th width="5%">Purchase Amount</th>
                        <th width="10%"></th>
                    </tr>
                </thead>
                <tbody>
                {books && books.map((book, i) =>
                    <tr key={i}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td style={{textAlign:"justify"}}>{book.description}</td>
                        <td>{book.year}</td>
                        <td>{book.price}</td>
                        <td>{book.stock}</td>
                        <td>{book.purchaseAmount}</td>
                        <td style={{ whiteSpace: 'nowrap'}}>
                            <Link to={`${path}/edit/${book.id}`} className="btn btn-sm btn-primary">Edit</Link>
                            {book.purchaseAmount > 0 ? <button style={{marginLeft:'10px'}} onClick={() => bookDelete(book.id)} className="btn btn-sm btn-danger btn-delete-book" disabled={true}>
                                <span>Delete</span>
                            </button> :
                                <button style={{marginLeft:'10px'}} onClick={() => bookDelete(book.id)} className="btn btn-sm btn-danger btn-delete-book" >
                                    <span>Delete</span>
                                </button> }
                        </td>
                    </tr>
                )}
                {books && !books.length &&
                <tr>
                    <td colSpan="4" className="text-center">
                        <div className="p-2">No Books To Display</div>
                    </td>
                </tr>
                }
                </tbody>
            </Table>
            </Container>
        </div>
    );
}

export default List;
