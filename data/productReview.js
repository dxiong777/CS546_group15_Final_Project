const { ObjectId } = require('mongodb');
const mongoCollections = require("../config/mongoCollections");
const reviewForProduct = mongoCollections.reviewForProduct;
const productsForSearch = mongoCollections.productsForSearch;
const commentForProduct = mongoCollections.commentForProduct;

const exportedMethods =  {
    async addReview(productId, userId, reviewText, rating) {
        if (!productId || (typeof productId != "string")) throw "product ID must be given as a string";
        if (!userId || (typeof userId != "string")) throw "user ID must be given as a string";
        if (!reviewText || (typeof reviewText != "string")) throw "review text must be given as a string";
        if (!rating || (typeof rating != "number") || (rating < 1) || (rating > 5)) throw "rating must be given as a number from 1 to 5";

        const reviewCollection = await reviewForProduct();
        let newReview = {
            productId,
            userId,
            reviewText,
            rating,
            comments: []
        }

        const alreadyReviewed = await reviewCollection.findOne({ 
            $and: [{
                productId: productId
            }, {
                userId: userId
            }]
        });
        if (alreadyReviewed) throw "This user already reviewed this product";
        const insertInfo = await reviewCollection.insertOne(newReview);
        const objIdForProduct = ObjectId.createFromHexString(productId);
        const productCollection = await productsForSearch();
        
        if (insertInfo.insertedCount === 0) {
            throw 'Could not add new Review';
        } else {
            //Add the review id to the restaurant
            const updatedInfo = await productCollection.updateOne({ _id: objIdForProduct }, { $push: { reviews: String(newReview._id) } });
            if (updatedInfo.modifiedCount === 0) {
                throw 'Could not update Product Collection with Review Data!';
            }
        }

        const newId = insertInfo.insertedId;
        const newIDString = String(newId);
        const review = await this.getReview(newIDString);
        return review;
    },

    async getReview(id) {
        if (!id) throw "id must be given";
        if (typeof(id) === "string") id = ObjectId.createFromHexString(id);
        const reviewCollection = await reviewForProduct();
        const review = await reviewCollection.findOne({ _id: id});
        if (!review) throw "review with that id does not exist";
        return review;
    },

    async getAllReviews() {
        const reviewCollection = await reviewForProduct();
        const reviewList = await reviewCollection.find({}).toArray();
        if (reviewList.length === 0) throw "no reviews in the collection";
        return reviewList;
    },

    async updateReview(id, updatedReview) {
        if (typeof(id) === "string") id = ObjectId.createFromHexString(id);
        const reviewCollection = await reviewForProduct();
        const updatedReviewData = {};
        if (updatedReview.reviewText) {
            updatedReviewData.reviewText = updatedReview.reviewText;
        }

        if (updatedReview.rating) {
            updatedReviewData.rating = updatedReview.rating;
        }
        // console.log(updatedReviewData);
        await reviewCollection.updateOne({_id: id}, {$set: updatedReviewData});
        return await this.getReview(id);
    },

    async removeReview(id) {
        if (!id) throw "id must be given";
        const reviewcollection = await reviewForProduct();
        const { ObjectId } = require('mongodb');
        const objRevId = ObjectId.createFromHexString(id);
        const reviewSearch = await reviewcollection.findOne({_id: objRevId});
        const commentList = reviewSearch.comments;
        if (reviewSearch === null){
            throw 'No Review with id - ' + id;
        }
        if (commentList.length != 0) {
            for (var j = 0; j < commentList.length; j++){
                try {
                    const commentCollection = await commentForProduct();
                    const { ObjectId } = require('mongodb');
                    const objCommentId = ObjectId.createFromHexString(commentList[j]);
                    const deletionInfoForComment = await commentCollection.removeOne({_id: objCommentId});
                
                    if (deletionInfoForComment.deletedCount === 0) {
                        throw `Could not delete Comment with id of ${commentList[j]}`;
                    }
                } catch (e) {
                    throw 'Could not Delete Comment while deleting Review!';
                }
            }
        }
            try {
                const productCollection = await productsForSearch();
                const { ObjectId } = require('mongodb');
                const objResId = ObjectId.createFromHexString(reviewSearch.restaurantId);
                const deletionInfoForReviewFromProduct = await productCollection.updateOne({ _id: objResId }, { $pull: { reviews: String(id) } });
                
                if (deletionInfoForReviewFromProduct.deletedCount === 0) {
                    throw `Could not delete Review with id of ${id}`;
                }
            } catch (e) {
                throw `Could not delete Review from Restaurant while Deleting Review!`;
            }
            const deletionInfoForReview = await reviewcollection.removeOne({_id: objRevId});
            if (deletionInfoForReview.deletedCount === 0) {
                throw `Could not delete Review with id of ${objRevId}`;
            }
            return true;
        }
}

module.exports = exportedMethods;
