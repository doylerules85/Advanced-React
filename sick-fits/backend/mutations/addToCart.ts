/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { CartItem } from '../schemas/CartItem';
import { Session } from '../types';

import { CartItemCreateInput } from '../.keystone/schema-types';

async function addToCart(
    root: any,
    // destructure product id
    { productId }: { productId: string },
    // context
    context: KeystoneContext
): Promise<CartItemCreateInput> {
    console.log('adding to cart 🛒');

    // query current user see if signed in
    const sesh = context.session as Session;

    if (!sesh.itemId) {
        throw new Error('you must be logged in to do this');
    }
    // query the current users cart
    const allCartItems = await context.lists.CartItem.findMany({
        where: {
            user: {
                id: sesh.itemId,
            },
            product: {
                id: productId,
            },
        },
        resolveFields: 'id, quantity'
    });
    // destrucutre the first item in the allcartitems array and assign it existingCartItem
    const [existingCartItem] = allCartItems;
    if (existingCartItem) {
        console.log(existingCartItem);
        console.log(
            `There are already ${existingCartItem.quantity} items, increment by 1!`
        );
        // see if current item added is already in cart - if not add it, if yes increment by one
        return await context.lists.CartItem.updateOne({
            id: existingCartItem.id,
            data: { quantity: existingCartItem.quantity + 1 },
            resolveFields: false,
        });
    }
    // if there is no item in the cart - add it!
    return await context.lists.CartItem.createOne({
        data: {
            product: { connect: { id: productId } },
            user: { connect: { id: sesh.itemId } },
        },
        resolveFields: false,
    });
}

export default addToCart;
