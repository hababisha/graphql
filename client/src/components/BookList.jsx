import React from 'react'
import { useQuery, gql } from '@apollo/client';


const getBooksQuery = gql`
    {
        books{
            name
            id
            genre
        }
    }
`

function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
  
    return data.books.map(({ name, id, genre }) => (
      <div key={id}>
        <h3>{name}</h3>
        <p>{genre}</p>
      </div>
    ));
  }

export default BookList