import React from 'react';
import loader from "../../assets/images/gif/loader_gif.gif"

function Loader() {
  return (
    <>
      <div className="custom-loadingWrapper"><img src={loader} style={{width:'105px'}} class="gif" alt="loader" /></div>
    </>
  )
}

export default Loader