const fs = require('fs');
const path = require('path');


const attachTo = (app, data) => {


    app.get('/', (req, res) => {
        return data.posts.getAll()
            .then((posts) => {
                return res.render('home', {
                    context: posts
                });
            });
    });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });

    app.get('*', (req, res) => {
        return res.send('<h1>Not found</h1>', 404)
    })
}

module.exports = { attachTo };
