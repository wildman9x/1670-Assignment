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
      
      <section className="welcome gradient home-welcome">
		<div className="welcome-messaging">
			<h2>Hand-made</h2>
			<a data-bss-hover-animate="pulse" className="button" style="width: 255px;" href="#">Shop with us</a>
		</div>
		<div className="diagonal-line pattern">
			<svg width='4' height='4' viewbox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'>
				<g fill='##212121' fill-opacity='0.7' fill-rule='evenodd'><path d='M5 0h1L0 6V5zM6 5v1H5z'/></g>
			</svg>
		</div>

		<div className="welcome-image"><img src=""> </img></div>
	</section>
  <div className="content">
		<div className="d-flex all-product-banner" style="background: linear-gradient(140deg, rgb(222, 199, 178) 20%, rgb(255, 169, 122) 70%);">
			<div className="banner-detail" style="padding: 7.5em;">
				<div className="tag">
					<span>All products</span>
				</div>
				<div className="banner-text" style="padding-top: 0;margin-top: 0;">
					<h2>All of our products</h2>
				</div>
			</div>
			<div className="banner-image-container" style="height:auto">
				<div className="banner-images">
					<div className="banner-image"><img src="" style="background: linear-gradient(140deg, rgb(222, 199, 178) 20%, rgb(255, 169, 122) 70%);     height: 100%;     width: 100%;"></img></div>
					<div className="banner-image"><img src="" style="background: linear-gradient(140deg, rgb(222, 199, 178) 20%, rgb(255, 169, 122) 70%);     height: 100%;     width: 100%;"></img></div>
					<div className="banner-image"><img src="" style="background: linear-gradient(140deg, rgb(222, 199, 178) 20%, rgb(255, 169, 122) 70%);     height: 100%;     width: 100%;"></img></div>
				</div>
			</div>
		</div>
		<div
			className="product-list" data-per-row="3">

			
			<div className="row">
				

					<div className="col-xxl-4">
						<a className="product-item rollover" href="">
							<div className="product-item-container">
								<figure className="figure product-item-image-container"><img className="img-fluid figure-img product-image" src=""></img>
									<div className="product-item-status">
										<span>Pre-order</span>
									</div>
								</figure>
								<div className="product-item-info">
									<div className="product-item-info-header">
										<div className="product-item-info-name">
											<span>Name</span>
										</div>
										<div className="product-item-price">
											<span className="currency-sign">$</span>
											<span>23</span>
										</div>
									</div>
								</div>
							</div>
						</a>
					</div>
					

				
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
    <tr>
      <td>{book.title}</td>
      <td>
        <img
          style={{
            height: "200px",
            objectFit: "cover",
          }}
          src={book.image}
          alt={book.title}
        />
      </td>
      <td>
        {authors?.map((author) => {
          return (
            <a key={author?.id} href={`/author/${author.id}`}>
              {author?.firstName} {author.lastName}{" "}
            </a>
          );
        })}
      </td>
      <td>
        {genres?.map((genre) => {
          return (
            <a key={genre.id} href={`/genre/${genre.id}`}>
              {genre.name}
            </a>
          );
        })}
      </td>
      <td>
        <a href={`/publisher/${publisher?.id}`}>{publisher?.name}</a>
      </td>
      <td>{book.publishDate}</td>
      <td>
        <a href={`/book/${book.id}`}>Details</a>
      </td>
    </tr>
  );
};
