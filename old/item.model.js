class Item{
    static isValid(model){
        return typeof model !== 'undefined' && model.text.length > 3 && typeof model.text === 'string'
    }

    get id(){
        return this._id;
    }

    static toViewModel(model){
        const viewModel = new Item();
        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });
        return viewModel;
    }
}

module.exports = Item;
