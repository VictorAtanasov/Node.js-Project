class BaseData {
    constructor(db, ModelClass, validator){
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    filterBy(props){
        return this.collection.find(props)
            .toArray();
    }

    getAll(){
        return this.collection.find()
            .toArray();
    }

    create(model){
        if (!this._isModelValid(model)){
            return Promise.reject('Validation failed!');
        }
        return this.collection.insert(model);
    }

    updateById(model) {
        return this.collection.updateOne({
            _id: model._id,
        }, model);
    }

    _isModelValid(model){
        return this.validator.isValid(model);
    }

    _getCollectionName(){
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseData;