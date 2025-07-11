const graphql = require('graphql')
const _ = require('lodash')
const {GraphQLObjectType, GraphQLString, GraphQLInt ,GraphQLSchema, GraphQLID} = graphql


//dummy data
var books = [
    {name: "Name of the wind", genre: "Fantasy", id: "1", authorId: '1'},
    {name: "The final empire", genre: "Fantasy", id: "2", authorId: '2'},
    {name: "The long Earth", genre: "sci-fi", id: "3", authorId: '3'}
]
var authors = [
    {name: 'Patrick rothwhatever', age: 44, id: '1'},
    {name: 'Brandon kebede', age: 55, id: '2'},
    {name: 'Terry chala', age: 66, id: '3'}
]


//schemas
//Booktype
const BookType = new GraphQLObjectType({
    name : "Book",
    fields : () => ({
        id: {type: GraphQLID},
        name : {type: GraphQLString},
        genre : {type : GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent)
                return _.find(authors, {id: parent.authorId})
            }
        }

    })
})

//Author type
const AuthorType = new GraphQLObjectType({
    name : "Author",
    fields : () => ({
        id: {type : GraphQLID},
        name: {type : GraphQLString},
        age: {type: GraphQLInt}
    })
})


//Root Qurey
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from the db or other sources
                // console.log(typeof(args.id))
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: {id : {type: GraphQLID }},
            resolve(parent, args){
                return _.find(authors, {id: args.id})
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})