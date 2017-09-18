const itemsData = require('./items.data');
const CategoriesData = require('./categories.data');
const TodosData = require('./todos.data');
const PostsData = require('./posts.data')

const init = (db) => {
    return Promise.resolve({
        items: new itemsData(db),
        todos: new TodosData(db),
        categories: new CategoriesData(db),
        posts: new PostsData(db)
    });
};

module.exports = { init };