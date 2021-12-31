import React from 'react'
import './detail.css'

export default function DetailPage() {
  return (
    <div className="container">
      {/* Logo */}
      <h1 className="text-center mb-5" id="logo-page">
        Pokemon Dex
      </h1>

      {/* Detail a pokemon */}

      <div className="row mb-5">
        <div className="col-md-8">
          <img
            src="https://dummyimage.com/1400x800/dbdbdb/787878.png&text=Image+cap"
            className="img-fluid"
            alt="..."
          />
        </div>
        <div className="col-md-4">
          <h3>Pokemon name</h3>
          <p>Pokemon types: ...</p>
          <p>Pokemon base experience: ...</p>
          <p>
            <span>Width: ...</span>
            <span>Height: ...</span>
          </p>
          <p>Effect entries: ...</p>
        </div>
      </div>

      <hr className="mb-5" />
      <button className="btn btn-purple">Back home</button>
    </div>
  )
}
