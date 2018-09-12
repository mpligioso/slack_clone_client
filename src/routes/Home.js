import React from 'react';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';

// const Home = ({ data: { loading, allUsers } }) =>
//   // must use key when mapping through an array
//   (loading ? null : allUsers.map(user => <h1 key={user.id}>{user.email}</h1>));

const Home = ({ refetch }) => (
  <Query
    query={allUsersQuery}
    fetchPolicy={refetch ? 'cache-and-network' : 'cache-first'}
  >
    { ({ loading, data: { allUsers } }) =>
      (loading ? null : allUsers.map(user => <h1 key={user.id}>{user.email}</h1>))
    }
    </Query>
);


const allUsersQuery = gql`
{
  allUsers {
    id
    email
  }
}
`;

export default graphql(allUsersQuery)(Home);
