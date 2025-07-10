const graphql = require('graphql')
const _ = require('lodash')
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql

const BookType = new GraphQLObjectType({
    name : "Book",
    fields : () => ({
        id: {type: GraphQLString},
        name : {type: GraphQLString},
        genre : {type : GraphQLString},

    })
})

//dummy data
var books = [
    {name: "Name of the wind", genre: "Fantasy", id: "1"},
    {name: "The final empire", genre: "Fantasy", id: "2"},
    {name: "The long Earth", genre: "sci-fi", id: "3"}
]

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                //code to get data from the db or other sources
                return _.find(books, { id: args.id });
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})