const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const restaurants = data.user;

async function main() {
  const db = await dbConnection();
 // await db.dropDatabase();

  try {
    const res1 = await restaurants.create("Parth Hirpara");
    console.log(res1);
  } catch (e) {
    console.log(e);
  }
  try {
    const res2 = await restaurants.create("vivek Borad ");
    console.log(res2);
  } catch (e) {
    console.log(e);
  }
  try {
    const res3 = await restaurants.create("Ujas Hirpara");
    console.log(res3);
  } catch (e) {
    console.log(e);
  }
  try {
    const res4 = await restaurants.create("Yash Padsala");
    console.log(res4);
  } catch (e) {
    console.log(e);
  }
  try {
    const res5 = await restaurants.create("Keval Gajera");
    console.log(res5);
  } catch (e) {
    console.log(e);
  }


  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();