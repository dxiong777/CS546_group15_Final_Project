const mongoCollections = require("../config/mongoCollections");
const bcrypt = require('bcrypt');
const saltRounds = 16;
const shopkeeper = mongoCollections.shopkeeper;
module.exports = {
 async createShopkeeper(ShopName, username, ownerFirstname, ownerLastname, Address, email, pincode, phoneNumber, password){
        const shopkeeperCollections = await shopkeeper();
        const hashed_pass = await bcrypt.hash(password, saltRounds);
        let lower = username.toLowerCase();
        let newShopkeeper = {
            ShopName : ShopName,
            username : lower,
            ownerFirstname : ownerFirstname,
            ownerLastname : ownerLastname,
            Address : Address,
            email : email,
            pincode : pincode,
            phoneNumber : phoneNumber,
            password : hashed_pass,
        }
        const duplicateUser = await shopkeeperCollections.findOne({username : username});
        if(duplicateUser !== null)
        throw 'There is already an user containing the same username';
        const insertInfo = await shopkeeperCollections.insertOne(newShopkeeper);
        if(insertInfo.insertedCount === 0)
        throw 'Could not create user';
        // const new_id = insertInfo.insertedId;
        // const shopkeepers = await this.get(new_id.toString());
      //  return shopkeepers
        return {userInsterted : true};

    },
    async checkShopkeeper(username, password){
        const shopkeeperCollections = await shopkeeper();
        const findShopKeeper = await shopkeeperCollections.findOne({username : username});
        if(findShopKeeper === null){
            throw 'Either the username or password is incorrect';
        }
        let comparedPass = false;
        try{
            comparedPass = await bcrypt.compare(password, findShopKeeper.password);
            if(comparedPass === true)
            return {authenticated : true};
            else
            throw 'Either the username or password is incorrect';
        }
        catch(e){
            console.log(e);
        }
    },

    async updateShopkeeper(id, ShopName, username, ownerFirstname, ownerLastname, email, password, phoneNumber){
        const UpdateInfo = await this.get(id);
        let updated_hash = await bcrypt.hash(password, saltRounds);
        let updatedLower = username.toLowerCase();
        let shopkeeper_update = {
            ShopName : ShopName,
            username : updatedLower,
            ownerFirstname : ownerFirstname,
            ownerLastname : ownerLastname,
            email : email,
            password : updated_hash,
            phoneNumber : phoneNumber
        }
        const shopkeeperCollections = await shopkeeper();
        const UpdatedInfo = await shopkeeperCollections.updateOne( 
            {id : ObjectId(id)},
            {$set : shopkeeper_update}
        );
        if(!UpdatedInfo.matchedCount && !UpdatedInfo.modifiedCount)
        throw 'Updation failed';
        return await this.get(id);
    },
    async removeShop(id){
        const removeId = new ObjectId(id);
        const ShopName = await this.get(id);
        const shopkeeperCollections = await shopkeeper();
        const deleteInfo = await shopkeeperCollections.deleteOne({id : removeId});
        if(deleteInfo.deletedCount === 0)
        throw `Could not delete the shop with ${id}`;
        return `${ShopName['shopName']} deleted successfully`;
    }
}