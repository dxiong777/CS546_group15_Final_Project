const mongoCollections = require("../config/mongoCollections");
const bcrypt = require('bcrypt');
const saltRounds = 16;
const shopkeeper = mongoCollections.shopkeeper;
module.exports = {
 async createShopkeeper(shopId, ShopName, username, ownerFirstname, ownerLastname, Address, email, pincode, password, phoneNumber){
        const shopkeeperCollections = await shopkeeper();
        const hashed_pass = await bcrypt.hash(password, saltRounds);
        let lower = username.toLowerCase();
        let newShopkeeper = {
            shopId : shopId,
            ShopName : ShopName,
            username : lower,
            ownerFirstname : ownerFirstname,
            ownerLastname : ownerLastname,
            Address : Address,
            email : email,
            pincode : pincode,
            password : hashed_pass,
            phoneNumber : phoneNumber
        }
        const duplicateUser = await shopkeeperCollections.findOne({username : username});
        if(duplicateUser !== null)
        throw 'There is already an user containing the same username';
        const insertInfo = await shopkeeperCollections.insertOne(newShopkeeper);
        if(insertInfo.insertedCount === 0)
        throw 'Could not create user';
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

    async updateShopkeeper(shopId, ShopName, username, ownerFirstname, ownerLastname, Address, email, pincode, password, phoneNumber){
        const UpdateInfo = await this.get(shopId);
        let updated_hash = await bcrypt.hash(password, saltRounds);
        let updatedLower = username.toLowerCase();
        let shopkeeper_update = {
            ShopName : ShopName,
            username : updatedLower,
            ownerFirstname : ownerFirstname,
            ownerLastname : ownerLastname,
            Address : Address,
            email : email,
            pincode : pincode,
            password : updated_hash,
            phoneNumber : phoneNumber
        }
        const shopkeeperCollections = await shopkeeper();
        const UpdateInfo = await shopkeeperCollections.updateOne( 
            {shopId : ObjectId(shopId)},
            {$set : shopkeeper_update}
        );
        if(!UpdateInfo.matchedCount && !UpdateInfo.modifiedCount)
        throw 'Updation failed';
        return await this.get(shopId);
    },
    async removeShop(shopId){
        const removeId = new ObjectId(shopId);
        const ShopName = await this.get(shopId);
        const shopkeeperCollections = await shopkeeper();
        const deleteInfo = await shopkeeperCollections.deleteOne({shopId : removeId});
        if(deleteInfo.deletedCount === 0)
        throw `Could not delete the shop with ${shopId}`;
        return `${ShopName['shopName']} deleted successfully`;
    }
}