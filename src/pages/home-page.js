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
      <div className="row">
        <div className="col-lg-3 col-md-4 mt-4">
          <div className="card">
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
              <a href="#!" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-4 mt-4">
          <div className="card">
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
              <a href="#!" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-4 mt-4">
          <div className="card">
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
              <a href="#!" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-4 mt-4">
          <div className="card">
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
              <a href="#!" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-4 mt-4">
          <div className="card">
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
              <a href="#!" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-4 mt-4">
          <div className="card">
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
              <a href="#!" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
