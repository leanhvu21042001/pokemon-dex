import React from 'react'
import './home.css'

export default function HomePage() {
  return (
    <div className="container-fluid">
      {/* Logo */}
      <h1 className="text-center mb-5" id="logo-page">
        Pokemon Dex
      </h1>
      {/* ! Search Form*/}
      <form id="form-search" className="mb-5">
        <label htmlFor="SearchPokemon" className="form-label">
          Search pokemon
        </label>
        <input
          type="text"
          className="form-control"
          id="SearchPokemon"
          aria-describedby="SearchPokemon"
        />
      </form>

      {/* List Carts Of Pokemon */}
      <div className="row mb-5" id="list-of-pokemon">
        <div className="col-xl-3 col-lg-4 col-md-6 mt-4">
          <div className="card card-pokemon">
            <img
              src="https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#!" className="btn btn-purple">
                Go somewhere
              </a>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6 mt-4">
          <div className="card card-pokemon">
            <img
              src="https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#!" className="btn btn-purple">
                Go somewhere
              </a>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6 mt-4">
          <div className="card card-pokemon">
            <img
              src="https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#!" className="btn btn-purple">
                Go somewhere
              </a>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6 mt-4">
          <div className="card card-pokemon">
            <img
              src="https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#!" className="btn btn-purple">
                Go somewhere
              </a>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6 mt-4">
          <div className="card card-pokemon">
            <img
              src="https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#!" className="btn btn-purple">
                Go somewhere
              </a>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6 mt-4">
          <div className="card card-pokemon">
            <img
              src="https://dummyimage.com/180x120/dbdbdb/787878.png&text=Image+cap"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#!" className="btn btn-purple">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="row" id="pokemon-pagination">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a
                className="page-link"
                href="#!"
                tabIndex="-1"
                aria-disabled="true"
              >
                Previous
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#!">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#!">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#!">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#!">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
