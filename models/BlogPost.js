const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
    title: String,
    body: String,
    username: String,
    datePosted: {
        type: Date,
        default: new Date()
    }
})

const BlogPost = mongoose.model('blogposts', BlogPostSchema)
module.exports = BlogPost