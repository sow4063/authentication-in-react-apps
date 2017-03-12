import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// props.onSubmit, props.onChange..
const SignUpForm = ({
  // processForm(event) {
  //   * prevent default action. in this case, action is the form submission event
  //   event.preventDefault();

  //   console.log('name: ', this.state.user.name);
  //   console.log('email: ', this.state.user.email);
  //   console.log('password: ', this.state.user.password);
  // }
  onSubmit,

  // changeUser(event) {
  //   const field = event.target.name;
  //   const user = event.target.user;
  //   user[field] = event.target.value;
  //
  //   this.setState = ({
  //     user
  //   });
  // }
  onChange,

  // {}
  errors,

  // { email: '', name: '', password: '' }
  user,
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Sign Up</h2>

      {errors.summary && <p className="err-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Name"
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          errorText={errors.password}
          onChange={onChange}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Create New Account" primary />
      </div>

      <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
    </form>
  </Card>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
