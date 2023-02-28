import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorSelector } from "../redux/slices/author";
import { booksSelector, fetchBook } from "../redux/slices/book";
import { genreSelector } from "../redux/slices/genre";
import { publisherSelector } from "../redux/slices/publisher";

export const Home = () => {
    const dispatch = useDispatch();
    const books = useSelector(booksSelector.selectAll);
    const role = useSelector((state) => state.user.role);

    useEffect(() => {
        dispatch(fetchBook());
    }, [dispatch]);

    return (
        <div>
            <div className="content">
                <div
                    className="d-flex all-product-banner banner-all-bg"
                    id="#banner-all-bg"
                >
                    <div className="banner-detail" style={{ padding: "7.5em" }}>
                        <div className="tag">
                            <span>All products</span>
                        </div>
                        <div
                            className="banner-text"
                            style={{ paddingTop: "0", marginTop: "0" }}
                        >
                            <h2>All of our products</h2>
                        </div>
                    </div>
                    <div
                        className="banner-image-container"
                        style={{ height: "auto" }}
                    >
                        <div className="banner-images">
                            <div className="banner-image banner-img-bg">
                                <img src="https://github.com/wildman9x/GCH1002-Web301-Assignment-ShoppingCart/blob/Nghia/products/images/product5/img1pro5.jpeg?raw=true"></img>
                            </div>
                            <div className="banner-image banner-img-bg">
                                <img src="https://github.com/wildman9x/GCH1002-Web301-Assignment-ShoppingCart/blob/Nghia/products/images/product6/img2pro6.png?raw=true"></img>
                            </div>
                            <div className="banner-image banner-img-bg">
                                <img src="https://github.com/wildman9x/GCH1002-Web301-Assignment-ShoppingCart/blob/Nghia/products/images/product5/img1pro5.jpeg?raw=true"></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-list" data-per-row="3">
                    <div className="row">
                        {books?.map((book) => (
                            <RenderBook key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const RenderBook = ({ book }) => {
    const authors = useSelector((state) =>
        book?.authorsId?.map((author) =>
            authorSelector.selectById(state, author?.authorId)
        )
    );
    const genres = useSelector((state) =>
        book?.genresId?.map((genre) =>
            genreSelector.selectById(state, genre?.genreId)
        )
    );
    const publisher = useSelector((state) =>
        publisherSelector.selectById(state, book.publisherId)
    );

    return (
        <div className="col-xxl-4">
            <a className="product-item rollover" href="">
                <div className="product-item-container">
                    <figure className="figure product-item-image-container">
                        <img
                            className="img-fluid figure-img product-image"
                            src={book.image}
                        ></img>
                        <div className="product-item-status">
                            <span>In stock</span>
                        </div>
                    </figure>
                    <div className="product-item-info">
                        <div className="product-item-info">
                            <div className="product-item-info-header">
                                <div className="product-item-info-name">
                                    <span>{book.title}</span>
                                </div>
                                <div className="product-item-price">
                                    <span className="currency-sign">$</span>
                                    <span>{book.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};
