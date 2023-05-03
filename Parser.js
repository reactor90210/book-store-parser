class Parser{
    constructor(dom) {
        this.$ = dom;
    }

    singleCategories(selector){
        let resultArr = [];

        [...selector].forEach( item => {
            resultArr.push(this.$(item).text());
        });

        return resultArr;
    }

    parentCategories(selector, parentSelector){
        let resultArr = [];

        [...selector].forEach(item => {
            let parent = this.$(item).find( parentSelector ).text();
            let childHtml = this.$(item).find('ul li');

            resultArr[parent] = [];

            [...childHtml].forEach( item => {
                resultArr[parent].push(this.$(item).text());
            })
        });

        return resultArr;
    }

    parseBooks(selector){
        let resultArr = [];

        [...selector].forEach(item => {
            let itemObj = this.$(item);

            let discountVal = itemObj.find('.discount > span:first').text();
            let priceVal = itemObj.find('span:last').text();

            let discount = (discountVal) ? parseInt(discountVal.replaceAll('%', '')) : null;
            let price = (priceVal) ? priceVal.replaceAll('$','') : null;

            let book = {
                'discount': discount,
                'image': itemObj.find('img').attr('src').replace(/\\/g,'/').replace(/.*\//, ''),
                'title': itemObj.find('p').text(),
                'price': parseInt(price),
                'description': '',
                'information': '',
            };

            resultArr.push(book);
        });

        return resultArr;
    }
}
export default Parser;
