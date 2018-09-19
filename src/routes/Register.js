import React from 'react';
import {
  Message,
  Container,
  Header,
  Input,
  Button,
} from 'semantic-ui-react';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends React.Component {
  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  onChange = (event) => {
    const { name, value } = event.target;
    // name = "username"
    this.setState({ [name]: value });
  };

  onSubmit = async () => {
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
    });

    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password },
    });

    const { ok, errors } = response.data.register;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      // empty object to hold error messages
      errors.forEach(({ path, message }) => {
        // setting our state to reflect the error message
        err[`${path}Error`] = message;
        // err ['passwordError'] = 'too short..';
      });
      // console.log(err)

      this.setState(err);
    }


    console.log(response);
  };

  render() {
    const {
      username,
      email,
      password,
      usernameError,
      emailError,
      passwordError,
    } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }


    return (
      // !!'' => equates to false, !'' => true, '' => false
      <Container text>
        <Header as="h2">Register</Header>
        <Input onChange={this.onChange} error={!!usernameError} value={username} placeholder="Username" name="username" fluid />
        <Input onChange={this.onChange} error={!!emailError} value={email} placeholder="Email" name="email" fluid />
        <Input onChange={this.onChange} error={!!passwordError} value={password} type="password" placeholder="Password" name="password" fluid />
        <Button onClick={this.onSubmit}>Submit</Button>
        {(usernameError || emailError || passwordError) ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        ) : null }
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password){
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);
