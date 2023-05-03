class DataHelper{
    static locationMap = {
        'header':1,
        'featured':2,
        'aside':3,
        'footer':4
    };

    static  prepareDataSingle(arrayCats, location = null){
        return  arrayCats.reduce((allCats, cat) => {
            return [
                ...allCats,
                {name: cat,
                    location_id: location ? this.locationMap[location] : location}
            ];
        }, []);
    }

    static prepareDataParent(arrayCats, location = null){
        const allKeys = Object.keys(arrayCats);

        return allKeys.reduce((allCats, cat) => {
            let subCats = arrayCats[cat];
            return [
                ...allCats,
                {name: cat,
                    location_id: this.locationMap[location],
                    subCategories: this.prepareDataSingle(subCats)}
            ];
        }, []);
    }
}

export default DataHelper;
