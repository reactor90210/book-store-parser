import Parser from "./Parser.js";
import DataHelper from "./DataHelper.js";
import fs from "fs";
import * as htmlparser2 from "htmlparser2";
import * as cheerio from "cheerio";
import { Book, Category, BookCategory, CategoryLocation } from './models/index.js';
import database from './Database.js';
import winston from "winston";

const buffer  = fs.readFileSync("index.html");
const content = buffer.toString();
const dom = htmlparser2.parseDocument(content);
const $ = cheerio.load(dom);

const header = $(".main-nav li");
const aside = $("aside ul");
const featured = $(".product-list__nav li");
const footer = $("#list-of-themes div");

const booksHtml = $(".product-list__best-sellers > div:not(#page-number)");

let parser = new Parser($);

const headerCategories = parser.singleCategories(header);
const featuredCategories = parser.singleCategories(featured);
const asideCategories = parser.parentCategories(aside, '.list-title');
const footerCategories = parser.parentCategories(footer, 'h3');
const parsedBooks = parser.parseBooks(booksHtml);

const reducedHeader = DataHelper.prepareDataSingle(headerCategories, 'header');
const reducedFeatured = DataHelper.prepareDataSingle(featuredCategories, 'featured');
const reducedAside = DataHelper.prepareDataParent(asideCategories, 'aside');
const reducedFooter = DataHelper.prepareDataParent(footerCategories, 'footer');

const arrCategories = [reducedHeader, reducedFeatured, reducedAside, reducedFooter];
const mergedCategories = arrCategories.reduce((totalArray, array) => {
    return totalArray.concat(array);
}, []);


const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'test.log' })
    ]
});

//logger.log({
//    level: 'info',
//    items: parser.parseBooks(booksHtml)
//});

(async () => {
    const t = await database.transaction();

    try {
        const books = await Book.bulkCreate(parsedBooks, {returning: true, transaction: t});

        for (const item of mergedCategories) {
            const createdCategory = await Category.create(item, { transaction: t });

            if(item.location_id !==null ){
               await CategoryLocation.create({'category_id': createdCategory.id,
                    'location_id': item.location_id,}, { transaction: t });
            }

            if(item.hasOwnProperty('subCategories')){
                for (const subItem of item.subCategories) {
                    subItem.parent_id = createdCategory.id;
                   await Category.create(subItem, { transaction: t });
                }
            }
        }

        await t.commit();

        const bestSeller = await Category.findOne({ where: { name: 'Best Sellers' } });
        await bestSeller.addBooks(books, { through: BookCategory });

    } catch (error) {
        console.log(error)

        await t.rollback();

    }
})();