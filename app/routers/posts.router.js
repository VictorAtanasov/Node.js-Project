const { Router } = require('express');
const ObjectId = require('mongodb').ObjectID;

const attachTo = (app, data) => {

    const router = new Router();

    router
    .get('/', (req, res) => {
         return data.posts.getAll()
            .then((posts) => {
                return res.render('posts/all', {
                    context: posts
                });
            });
    })
    .get('/form', (req, res) => {
        return res.render('posts/form');
    })
    .get('/categories', (req, res) => {
        return data.categories.getAll()
            .then((category) => {
                return res.render('posts/categories', {
                    context: category
                })
            })
    })
    .get('/categories/:id', (req, res) => {
        const catName = req.params.id;
        return data.categories.filterBy({
            'name': catName
        })
            .then((catPost) => {
                catPost.forEach((posts) => {
                    return res.render('posts/category', {
                        context: posts.posts
                    })
                })
            })
    })
    .get('/:id', (req, res) => {
        const id = req.params.id;
        return data.posts.filterBy({
            '_id': ObjectId(id)
        })
            .then((post) => {
                return res.render('posts/detail', {
                    context: post
                })
            })
    })
    .post('/', (req, res) => {
        const post = req.body;
        let date = data.posts.getDate();
        if (req.files.file !== undefined){
            post.filename = req.files.file.filename;
            post.uuid = req.files.file.uuid;
        }
        post.date = date;
        post.user = req.user.username;
        let dbPost = null;
        return data.posts.create(post)
            .then((_dbPost) => {
                dbPost = _dbPost;
                return data.categories.filterBy({
                    name: post.category
                })
            })
            .then(([category]) => {
                const categorypost = {
                    title: post.title,
                    text: post.text,
                    _id: dbPost.ops[0]._id
                }
                if(!category){
                    category = {
                        name: post.category,
                        posts: [categorypost],
                    }
                    return data.categories.create(category)
                } else{
                    category.posts.push(categorypost);
                    return data.categories.updateById(category);
                }
            })
            .then(() => {
                return res.redirect('/posts');
            })
    });

    app.use('/posts', router);
}

module.exports = { attachTo };