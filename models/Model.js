import {
    Sequelize,
    Model as SequelizeModel,
    DataTypes,
    Op} from 'sequelize';
import database from '../Database.js';

/**
 * Model base class.
 */
export default class Model extends SequelizeModel {

    /**
     * Returns the table name.
     * This must be defined in a subclass.
     */
    static get table() {
        return 'table name';
    }

    /**
     * Returns the columns of the table.
     * This must be defined in a subclass.
     */
    static get attributes() {
        return {};
    }

    /**
     * Returns the data type of the column.
     *
     * @see https://sequelize.org/v5/manual/data-types.html
     */
    static get DataTypes() {
        return DataTypes;
    }

    /**
     * Sequelize provides several operators.
     *
     * @see https://sequelize.org/master/manual/model-querying-basics.html#operators
     */
    static get Op() {
        return Op;
    }

    /**
     * Attach a model to your application to make it available.
     *
     * @return {Model}
     */
    static attach() {
        super.init(this.attributes, {
            modelName: this.table,
            sequelize: database,
            freezeTableName: true,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            underscored: true
        });
        this.association();
        return this;
    }

    /**
     * Define table associations.
     *
     * @see https://sequelize.org/master/manual/assocs.html
     * @return {void}
     */
    static association() {
        // Define association in subclass
    }

    /**
     * Returns data that matches the ID.
     *
     * @param  {number}          id
     * @return {Promise<Object>}
     */
    static async findById(id) {
        return super.findOne({
            where: { id },
            raw: true
        });
    }
}