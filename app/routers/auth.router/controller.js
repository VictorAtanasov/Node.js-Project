class TodosController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('auth/sign-up');
    }
    getSignInForm(req, res) {
        return res.render('auth/sign-in')
    }
    signOut(req, res) {
        req.logout();
        return res.redirect('/');
    }

    signUp(req, res) {
        const bodyUser = req.body;
        if (req.files.file !== undefined){
            bodyUser.filename = req.files.file.filename;
            bodyUser.uuid = req.files.file.uuid;
        }
        this.data.users.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser === undefined) {
                    return this.data.users.create(bodyUser);
                } else {
                    throw 'The username is already teaken'
                }
            })
            .then((dbUser) => {
                return res.redirect('/auth/sign-in');
            })
            .catch((err) => {
                req.flash('error', err);
                return res.redirect('/auth/sign-up');
            });
    }
}

const init = (data) => {
    return new TodosController(data);
};

module.exports = { init };
