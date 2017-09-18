const BaseData = require('./base/base.data');
const validator = {
    isValid() {
        return true
    }
}
class CategoriesData extends BaseData {
    constructor(db) {
        super(db, { name: 'Category' }, validator);
    }

    filterByIsDone(isDone) {
        return this.filterBy({ isDone });
    }

}

module.exports = CategoriesData;
