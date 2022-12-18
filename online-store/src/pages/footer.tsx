import React from 'react';
import '../styles/footer.css';
import github from '../assets/icons/github.svg';
import rss from '../assets/icons/rss.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="github-wrapper">
          <a
            href="https://github.com/ChizhovMN"
            className="github-link link"
            target="_blank"
            rel="noreferrer"
          >
            <img className="github-image" src={github} alt="github" />
          </a>
          <a
            href="https://github.com/burningDoc"
            className="github-link link"
            target="_blank"
            rel="noreferrer"
          >
            <img className="github-image" src={github} alt="github" />
          </a>
        </div>
        <div className="year">© 2023</div>
        <div className="rss-wrapper">
          <a
            href="https://rs.school/js/"
            className="rss-link link"
            target="_blank"
            rel="noreferrer"
          >
            <img className="rss-image" src={rss} alt="RSS SCHOOL" />
          </a>
        </div>
      </div>
    </footer>
  );
}
export { Footer };
