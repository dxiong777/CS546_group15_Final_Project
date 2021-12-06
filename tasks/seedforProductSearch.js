const connection = require('../config/mongoConnection');
const data = require('../data/');

const productForSearch = data.productForSearch;
const commentForProduct = data.commentForProduct;

const main = async () => {
    const db = await connection();
    await db.dropDatabase();

    const P1 = await productForSearch.addProductForSearch('Product1', 'This is product1', 'Very good', 11.2, 20, '2021-10-20', '2021-12-21');
    const P2 = await productForSearch.addProductForSearch('Product2', 'This is product2', 'Very good', 13, 10, '2021-08-20', '2021-12-21');
    const P3 = await productForSearch.addProductForSearch('Product3', 'This is product3', 'Very good', 14, 35, '2021-09-20', '2021-12-21');
    const P4 = await productForSearch.addProductForSearch('Product4', 'This is product4', 'Very good', 22, 40, '2021-10-30', '2021-12-21');
    const P5 = await productForSearch.addProductForSearch('Product5', 'This is product5', 'Very good', 33, 50, '2021-6-12', '2021-12-21');

    console.log('Done seeding database for Product Collection!');
	await db.serverConfig.close();
}

main().catch(error => {
    console.log(error);
});