import React from 'react'
import {gql, useQuery} from '@apollo/client'

const getAuthorsQuery = gql`
{
    authors{
        name
        age
    }
}

`
function AuthorList() {
    const {loading, error, data} = useQuery(getAuthorsQuery);
    if(loading) return <p>loading...</p>;
    if(error) return <p>Error: {error.message}</p>;
    return data.authors.map(({ name, age }) => (
        <div>
          <h3>{name}</h3>
          <p>{age}</p>
        </div>
      ));
    }
export default AuthorList;