import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';

// SignUpForm 컴포넌트를 처리할 컨테이너
class SignUpPage extends React.Component {

  /**
   * Class constructor.
   */
 constructor(props) {
   super(props);

  // set the initial component state
  this.state = {
    errors: {},
    user: {
      email: '',
      name: '',
      password: ''
    }
  };

  this.processForm = this.processForm.bind(this);
  this.changeUser = this.changeUser.bind(this);
 }

 /**
  * Change the user object
  *
  * @param {object} event - the javascript event object
  */
  changeUser(event) {
    const field = event.target.name;
    const user = event.target.user;
    user[field] = event.target.value;

    this.setState = ({
      user
    });
  }

  /**
   * Process the form
   *
   * @param {object} event - the javascript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    console.log('name: ', this.state.user.name);
    console.log('email: ', this.state.user.email);
    console.log('password: ', this.state.user.password);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        error={this.state.errors}
        user={this.state.user}
      />
    );
  };

};

export default SignUpPage;
