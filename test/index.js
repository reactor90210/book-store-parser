import { Book, Category, BookCategory } from './testModels/index.js';

(async () => {
    try {
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