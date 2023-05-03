import Book from './Book.js';
import Category from './Category.js';
import BookCategory from './BookCategory.js';
import CategoryLocation from './CategoryLocation.js';

Book.attach();
Category.attach();
BookCategory.attach();
CategoryLocation.attach();

Category.belongsToMany(Book, {through: BookCategory});

export {Book, Category, BookCategory, CategoryLocation };