const { Router } = require('express');

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
    .post('/', (req, res) => {
        const post = req.body;
        return data.posts.create(post)
            .then((dbPost) => {
                return res.redirect('/posts/' + dbPost.ops[0]._id);
            })
    });

    app.use('/posts', router);
}

module.exports = { attachTo };