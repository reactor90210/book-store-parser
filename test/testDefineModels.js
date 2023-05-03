const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('homestead',
    'homestead',
    'secret',
    {
        host: '192.168.56.56',
        dialect: 'mysql'
    });

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:  DataTypes.STRING,
    image:  DataTypes.STRING,
    price:  DataTypes.DOUBLE,
    discount:  DataTypes.INTEGER,
    in_stock:  DataTypes.TINYINT,
    description:  DataTypes.TEXT,
    information:  DataTypes.TEXT,
    created_at: {
        field: 'created_at',
        type:  DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        field: 'updated_at',
        type:  DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},{
    tableName: 'books',
    createdAt: "created_at",
    updatedAt: "updated_at"
});


const Category = sequelize.define('Category', { id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:  DataTypes.STRING,
    parent_id:  DataTypes.INTEGER,
    created_at: {
        field: 'created_at',
        type:  DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        field: 'updated_at',
        type:  DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    } }, {
    tableName: 'categories',
    createdAt: "created_at",
    updatedAt: "updated_at"
});

const BookCategory = sequelize.define('BookCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    book_id:  {
        field: 'book_id',
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'id'
        }
    },
    category_id: {
        field: 'category_id',
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    },
    created_at: {
        field: 'created_at',
        type:  DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        field: 'updated_at',
        type:  DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'book_category',
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true
});

Category.belongsToMany(Book, {
    through: BookCategory
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const book = await Book.create({
            title: "test book",
            image: "test.png",
            price: 100,
            discount: 30,
            description:'',
            information:''
        }, {returning: true});

        const category = await Category.create({
            name: "Test category",
            parent_id: null,
        }, {returning: true});

        await category.addBook(book, { through: BookCategory });

    } catch (error) {
        console.log(error)
    }
})();