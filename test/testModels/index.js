import Book from "./Book.js";
import Category from "./Category.js";
import BookCategory from "./BookCategory.js";

Category.belongsToMany(Book, {through: BookCategory});

export { Category, Book, BookCategory };