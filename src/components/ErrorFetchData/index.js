import React from 'react'

import errorFetchDataImage from 'assets/images/error-fetch-data.png'

export default function ErrorFetchData() {
  return (
    <div className="container d-flex justify-content-center align-items-center text-center">
      <div>
        <img src={errorFetchDataImage} alt={'error fetch data'} />
        <h1>Aaaah! Something went wrong</h1>
        <p>Brace yourself till we get the error fixed.</p>
        <p>You may also refresh the page or try again later.</p>
      </div>
    </div>
  )
}
