import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Link} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import BookService from "../services/BookService";

function AddEdit({history, match}) {
    const { id } = match.params;
    const isAddMode = !id;

    const onSubmit = data => {
        console.log('data', data)
        return isAddMode ? createBook(data) : updateBook(id, data)
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required')
            .min(6,'title must be at least 6 characters'),
        description: Yup.string()
            .required('Description is required')
            .min(10,'description must be at least 10 characters'),
        year: Yup.number()
            .required('Year is required')
            .min(4 ,'year must be at max 4 characters'),
        pages: Yup.number()
            .required('Pages is required')
            .min(1, 'pages must be at min 0 pages'),
        language: Yup.string()
            .required('language is required'),
        publisher: Yup.string()
            .required('publisher is required'),
        price: Yup.number()
            .required('price is require')
            .min(0, 'price can not be 0'),
        stock: Yup.number()
            .required('stock is require')
            .min(0, 'stock can not be 0')
    })

    const { register, handleSubmit, reset, setValue,formState: {errors, isSubmitting} } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function createBook(data) {
        console.log(data)
        return BookService.create(data)
            .then((res) => {
                // alertService.success('User added', { keepAfterRouteChange: true });
                console.log('Book added', res)
                history.push('.');
            })
            // .catch(alertService.error);
    }

    function updateBook(id, data) {
        return BookService.update(id, data)
            .then((res) => {
                // alertService.success('User updated', { keepAfterRouteChange: true });
                console.log('Book updated')
                history.push('..');
            })
            // .catch(alertService.error);
    }

    const [book, setBook] = useState({})
    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            BookService.getById(id).then(res => {
                let book = res.data
                const fields = ['title', 'description', 'year', 'pages', 'language',
                'publisher', 'price','stock'];
                fields.forEach(field => setValue(field, book[field]));
                setBook(book);
            });
        }
    }, []);

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                <h1>{isAddMode ? 'Add Book' : 'Edit Book'}</h1>
                <div style={{textAlign:"left"}} className="mb-5">
                    <Form.Group as={Row} className="mb-3" controlId="formBasicTitle">
                        <Form.Label column sm="2">Title</Form.Label>
                        <Col sm="10">
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            name="title"
                            {...register("title")}  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            // onChange={handleInputChange}
                        />
                        <div className="invalid-feedback">{errors.title?.message}</div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicDescription">
                        <Form.Label column sm="2">Description</Form.Label>
                        <Col sm="10">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            {...register("description")}  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.description?.message}</div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicYear">
                        <Form.Label column sm="2">Year</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="number"
                                placeholder="Enter Year"
                                name="year"
                                {...register("year")} className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.year?.message}</div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicPages">
                        <Form.Label column sm="2">Pages</Form.Label>
                        <Col sm="3">
                            <Form.Control
                                type="number"
                                placeholder="Enter Pages"
                                name="pages"
                                {...register("pages")} className={`form-control ${errors.pages ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.pages?.message}</div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicLanguage">
                        <Form.Label column sm="2">Language</Form.Label>
                        <Col sm="3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Language"
                                name="language"
                                {...register("language")} className={`form-control ${errors.language ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.language?.message}</div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicPublisher">
                        <Form.Label column sm="2">Publisher</Form.Label>
                        <Col sm="3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Publisher"
                                name="publisher"
                                {...register("publisher")} className={`form-control ${errors.publisher ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.publisher?.message}</div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicPrice">
                        <Form.Label column sm="2">Price</Form.Label>
                        <Col sm="3">
                            <Form.Control
                                type="number"
                                placeholder="Rp-,"
                                name="price"
                                {...register("price")} className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.price?.message}</div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicStock">
                        <Form.Label column sm="2">Stock</Form.Label>
                        <Col sm="3">
                            <Form.Control
                                type="number"
                                placeholder="0"
                                name="stock"
                                {...register("stock")} className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">{errors.stock?.message}</div>
                        </Col>
                    </Form.Group>
                </div>
                <Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="btn btn-success"
                    >
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"/>}
                        Save
                    </Button>
                    <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                </Form.Group>
                {/*<Form.Group className="mb-3" controlId="formBasicYear">*/}
                {/*    <Form.Label>Year</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        type="number"*/}
                {/*        placeholder="Enter Year"*/}
                {/*        value={book.year}*/}
                {/*        name="year"*/}
                {/*        onChange={handleInputChange}*/}
                {/*    />*/}
                {/*</Form.Group>*/}
                {/*<Form.Group className="mb-3" controlId="formBasicPages">*/}
                {/*    <Form.Label>Pages</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        type="number"*/}
                {/*        placeholder="Enter Pages"*/}
                {/*        value={book.pages}*/}
                {/*        name="pages"*/}
                {/*        onChange={handleInputChange}*/}
                {/*    />*/}
                {/*</Form.Group>*/}
                {/*<Form.Group className="mb-3" controlId="formBasicLanguage">*/}
                {/*    <Form.Label>Language</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        type="text"*/}
                {/*        placeholder="Enter Language"*/}
                {/*        value={book.language}*/}
                {/*        name="language"*/}
                {/*        onChange={handleInputChange}*/}
                {/*    />*/}
                {/*</Form.Group>*/}
                {/*<Form.Group className="mb-3" controlId="formBasicPublisher">*/}
                {/*    <Form.Label>Publisher</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        type="text"*/}
                {/*        placeholder="Enter Publisher"*/}
                {/*        value={book.publisher}*/}
                {/*        name="publisher"*/}
                {/*        onChange={handleInputChange}*/}
                {/*    />*/}
                {/*</Form.Group>*/}
                {/*<Form.Group className="mb-3" controlId="formBasicPrice">*/}
                {/*    <Form.Label>Price</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        type="number"*/}
                {/*        placeholder="Enter Price"*/}
                {/*        value={book.price}*/}
                {/*        name="price"*/}
                {/*        onChange={handleInputChange}*/}
                {/*    />*/}
                {/*</Form.Group>*/}
                {/*<Form.Group className="mb-3" controlId="formBasicStock">*/}
                {/*    <Form.Label>Stock</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        type="number"*/}
                {/*        placeholder="Enter Stock"*/}
                {/*        value={book.stock}*/}
                {/*        name="stock"*/}
                {/*        onChange={handleInputChange}*/}
                {/*    />*/}
                {/*</Form.Group>*/}
            </Form>
            {/*<form onSubmit={handleSubmit(onSubmit)} onReset={reset}>*/}
            {/*    <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>*/}
            {/*    <div className="form-row">*/}
            {/*        <div className="form-group col-8">*/}
            {/*            <label>Title</label>*/}
            {/*            <input name="title" type="text" {...register("title")}  className={`form-control ${errors.title ? 'is-invalid' : ''}`}  />*/}
            {/*            <div className="invalid-feedback">{errors.title?.message}</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="form-group">*/}
            {/*        <button type="submit" disabled={isSubmitting} className="btn btn-primary">*/}
            {/*            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}*/}
            {/*            Save*/}
            {/*        </button>*/}
            {/*        <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </Container>
    );
}

export default AddEdit;
