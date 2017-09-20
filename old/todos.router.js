const { Router } = require('express')

const attachTo = (app, data) => {

    const router = new Router();
    
    router
        .get('/', (req, res) => {
             return data.todos.getAll()
                .then((todos) => {
                    return res.render('todos/all', {
                        context: todos
                    });
                });
        })
        .get('/form', (req, res) => {
            return res.render('todos/form', {
                context: {
                    categories: ['actions'],
                }
            });
        })
        .post('/', (req, res) => { 
            const todo = req.body;
            //validate todo
            let dbTodo = null;
            return data.todos.create(todo)
                .then((_dbTodo) => {
                    dbTodo = _dbTodo;
                    return data.categories.filterBy({
                        name: todo.category
                    })
                })
                .then(([category]) => {
                    const categoryTodo = {
                        text: todo.text,
                        isDone: todo.isDone,
                        _id: dbTodo.ops[0]._id
                    }
                    if(!category){
                        category = {
                            name: todo.category,
                            todos: [categoryTodo],
                        }
                        return data.categories.create(category)
                    } else{
                        category.todos.push(categoryTodo);
                        return data.categories.updateById(category);
                    }
                })
                .then(() => {
                    return res.redirect('/todos');
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/todos/form');
                });
        });
    
    app.use('/todos', router);
}

module.exports = { attachTo };
