import React from 'react';
import {
  Container,
  Header,
  Input,
  Button,
} from 'semantic-ui-react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Login extends React.Component {
  constructor(props) {
    super(props);

    // set initial state
    extendObservable(this, {
      email: '',
      password: '',
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  }

  onSubmit = async () => {
    const { email, password } = this;

    const response = await this.props.mutate({
      variables: { email, password },
    });
    console.log(response);

    const {
      ok,
      token,
      refreshToken,
      errors,
    } = response.data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      // redirect to homepage
      this.props.history.push('/');
    } else {
      const err = {};

      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.setState(err);
    }
  }

  render() {
    const { email, password } = this;


    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Input onChange={this.onChange} value={email} placeholder="Email" name="email" fluid />
        <Input onChange={this.onChange} value={password} type="password" placeholder="Password" name="password" fluid />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password){
      ok,
      token,
      refreshToken,
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));
