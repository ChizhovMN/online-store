import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import './formCard.css';

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  handleInputFocus = (e: Event) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <form>
          <div className="form-group">
            <small>Name on card:</small>

            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              pattern="[a-z A-Z-]+"
              required
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <div className="form-group">
            <small>Card Number:</small>

            <input
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              maxLength="16"
              required
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>

          <div className="form-group">
            <small>Expiration Date:</small>

            <input
              type="tel"
              name="expiry"
              className="form-control"
              placeholder="Valid Thru"
              pattern="\d\d/\d\d"
              required
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <div className="form-group">
            <small>CVC:</small>
            <br />
            <input
              type="tel"
              name="cvc"
              className="form-control"
              placeholder="CVC"
              pattern="\d{3}"
              required
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <div className="form-actions">
            <button className='formBtn'>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}