const { reviews } = require('../config/mongoCollections');
const connection = require('../config/mongoConnections');
const data = require('../data');

const productForSearch = data.productSearch;
const reviewForProduct = data.productReview;
const user = data.user;

const main = async () => {
    const db = await connection.getDb();
    await db.dropDatabase();

    const P1 = await productForSearch.addProductForSearch('Product1', 'This is product1', 'Very good', '11.2', 20, '2021-10-20', '2021-12-21');
    const P2 = await productForSearch.addProductForSearch('Product2', 'This is product2', 'Very good', '13', 10, '2021-08-20', '2021-12-21');
    const P3 = await productForSearch.addProductForSearch('Product3', 'This is product3', 'Very good', '14', 35, '2021-09-20', '2021-12-21');
    const P4 = await productForSearch.addProductForSearch('Product4', 'This is product4', 'Very good', '22', 40, '2021-10-30', '2021-12-21');
    const P5 = await productForSearch.addProductForSearch('Product5', 'This is product5', 'Very good', '33', 50, '2021-06-12', '2021-12-21');

    const U1 = await user.create('Anna', 'Joe', 'a@g.com', 'address1', 'city1', '11111', '123456');
    const U2 = await user.create('Anshul', 'Kitty', 'an@g.com', 'address2', 'city2', '22222', '123456');
    const U3 = await user.create('Kamil', 'Smith', 'k@g.com', 'address3', 'city3', '33333', '123456');
    const U4 = await user.create('Michael', 'White', 'm@g.com', 'address4', 'city4', '44444', '123456');
    const U5 = await user.create('Jessica', 'James', 'j@g.com', 'address5', 'city5', '55555', '123456');
    const U6 = await user.create('Ava', 'Ruth', 'av@g.com', 'address6', 'city6', '66666', '123456');
    const U7 = await user.create('Ella', 'Wey', 'el@g.com', 'address7', 'city7', '77777', '123456');
    const U8 = await user.create('Joe', 'Carter', 'joe@g.com', 'address8', 'city8', '88888', '123456');
    const U9 = await user.create('Lucy', 'Mosh', 'l@g.com', 'address9', 'city9', '99999', '123456');
    const U10 = await user.create('Jack', 'Nicky', 'jac@g.com', 'address1', 'city1', '11111', '123456');
    
    console.log(String(P1));
    const review1ForP1 = await reviewForProduct.addReview(String(P1._id), String(U1._id), "Amazing Product! But can improve.", 4);

    const review2ForP1 = await reviewForProduct.addReview(String(P1._id), String(U2._id), "Loved the Pizza!", 5);
    const review1ForP2 = await reviewForProduct.addReview(String(P2._id), String(U3._id), "Amazing Product! But can improve.", 4);

    const review2ForP2 = await reviewForProduct.addReview(String(P2._id), String(U4._id), "Loved the Curries!", 5);

    const review1ForP3 = await reviewForProduct.addReview(String(P3._id), String(U5._id), "Amazing Product! But can improve.", 4);

    const review1ForP4 = await reviewForProduct.addReview(String(P4._id), String(U7._id), "Amazing Product! But can improve.", 4);


    const review1ForP31 = await reviewForProduct.addReview(String(P3._id), String(U4._id), "Really Bad Experience", 1);
    const review1ForP41 = await reviewForProduct.addReview(String(P4._id), String(U3._id), "Bad Experience!", 1);
    const review1ForP51 = await reviewForProduct.addReview(String(P5._id), String(U2._id), "Slurpy!", 5);
    const review1ForP21 = await reviewForProduct.addReview(String(P2._id), String(U1._id), "Good prices", 3);

    console.log('Done seeding database for Product Collection!');
	await db.serverConfig.close();
}

main().catch(error => {
    console.log(error);
});