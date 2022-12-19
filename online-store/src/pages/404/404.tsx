import React from 'react';
import '../404/404.css';
// import errorImg from '../../assets/images/error.png';

function Error() {
  return (
    <div className="error-page">
      <figure className="error-wrapper">
        <img
          className="error-image"
          src="https://www.pngkey.com/png/detail/212-2123376_erreur-404-png-error-404.png"
          alt="404"
        />
        <figcaption className="error-description text">Oops! Page not Found</figcaption>
      </figure>
    </div>
  );
}
export { Error };
