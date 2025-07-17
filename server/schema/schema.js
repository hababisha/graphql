const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')
const {GraphQLObjectType, GraphQLString, GraphQLInt ,GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull} = graphql


//dummy data
// var books = [
//     {name: "Name of the wind", genre: "Fantasy", id: "1", authorId: '1'},
//     {name: "The final empire", genre: "Fantasy", id: "2", authorId: '2'},
//     {name: "The long Earth", genre: "sci-fi", id: "3", authorId: '3'},
//     {name: "The hero of ages", genre: "sci-fi", id: "4", authorId: '2'},
//     {name: "The color of ages", genre: "sci-fi", id: "5", authorId: '3'},
// ]
// var authors = [
//     {name: 'Patrick rothwhatever', age: 44, id: '1'},
//     {name: 'Brandon kebede', age: 55, id: '2'},
//     {name: 'Terry chala', age: 66, id: '3'}
// ]


//schemas
//Booktype
const BookType = new GraphQLObjectType({
    name : "Book",
    fields : () => ({
        //This is inside a function because we can't call authorType if both are not inside a function
        id: {type: GraphQLID},
        name : {type: GraphQLString},
        genre : {type : GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent)
                // return _.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorId)
            }
        }

    })
})

//Author type
const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorId: parent.id });
            }
        }
    })
});



//Root Qurey
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        //Query a single book
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from the db or other sources
                // console.log(typeof(args.id))
                // return _.find(books, { id: args.id });
                return Book.findById(args.id)
            }
        },
        //query all books
        books: {
            type : new GraphQLList(BookType),
            resolve(parent, args){
                // return books
                return Book.find({})
            }
        },
        //Query a single author
        author: {
            type: AuthorType,
            args: {id : {type: GraphQLID }},
            resolve(parent, args){
                // return _.find(authors, {id: args.id})
                return Author.find(args.id)
            }
        },
        //query all authors
        authors: {
            type : new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors
                return Author.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        //add Author
        addAuthor : {
            type : AuthorType,
            args : {
                name : {type : new GraphQLNonNull(GraphQLString)},
                age: {type : new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age,
                })
                return author.save()
            }
        },
        //add Book
        addBook : {
            type : BookType,
            args : {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre : {type: new  GraphQLNonNull(GraphQLString)},
                authorId : {type : new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId : args.authorId
                })
                return book.save()
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})