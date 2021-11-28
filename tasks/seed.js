const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const restaurants = data.shop;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  try {
    const res1 = await restaurants.create("Hoboken rest");
    console.log(res1);
  } catch (e) {
    console.log(e);
  }
  try {
    const res2 = await restaurants.create("om sai");
    console.log(res2);
  } catch (e) {
    console.log(e);
  }
  try {
    const res3 = await restaurants.create("famous indian restautrant");
    console.log(res3);
  } catch (e) {
    console.log(e);
  }
  try {
    const res4 = await restaurants.create("Sp. pizza room");
    console.log(res4);
  } catch (e) {
    console.log(e);
  }
  try {
    const res5 = await restaurants.create("Street Food");
    console.log(res5);
  } catch (e) {
    console.log(e);
  }


  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();