import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema({
	products: {
        type: Array,
        default: []
    }

})

cartSchema.plugin(mongoosePaginate);
cartSchema.pre("find", function() {
	this.populate('products.product');
})
export const cartModel = mongoose.model(cartsCollection, cartSchema)

// friends: [{ type : ObjectId, ref: 'User' }],
