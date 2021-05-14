/* eslint-disable */
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';
import { Session } from '../types';

// typescript set up for token
interface Arguments {
    token: string
}

async function checkout(
    root: any,
    // destructure the token from the arguments interface
    { token }: Arguments,
    // context
    context: KeystoneContext
): Promise<OrderCreateInput> {
    // 1 - make sure signed in
    const userId = context.session.itemId;
    if (!userId) {
        throw new Error('hey!  you need to be signed in!');
    }
    // graphql highlight helper
    const graphql = String.raw;
    // query the user
    const user = await context.lists.User.findOne({
        where: { id: userId },
        resolveFields: graphql`
            id
            name
            email
            cart{
                id
                quantity
                product{
                    name
                    price
                    description
                    id
                    photo{
                        id
                        image{
                            id
                            publicUrlTransformed
                        }
                    }
                }
            }
        `
    });
    console.dir(user, { depth: null })
    // 2 - calculate total price for their order
    const cartItems = user.cart.filter(cartItem => cartItem.product)
    const amount = cartItems.reduce(function (tally: number, cartItem: CartItemCreateInput) {
        return tally + cartItem.quantity * cartItem.product.price
    }, 0);
    console.log(amount)
    // 3 - create the charge with stripe library
    const charge = await stripeConfig.paymentIntents.create({
        amount,
        currency: 'USD',
        confirm: true,
        payment_method: token
    }).catch(err => {
        console.log(err);
        throw new Error(err.message);
    });
    console.log(charge);
    // 4 - convert cartItems to orderItems
    const orderItems = cartItems.map(cartItem => {
        const orderItem = {
            name: cartItem.product.name,
            description: cartItem.product.description,
            price: cartItem.product.price,
            quantity: cartItem.quantity,
            photo: { connect: { id: cartItem.product.photo.id } },
        }
        return orderItem;
    })
    // 5 - create the order and return it
    const order = await context.lists.Order.createOne({
        data: {
            total: charge.amount,
            charge: charge.id,
            items: { create: orderItems },
            user: { connect: { id: userId } }
        }
    });
    // clean up any old cart items
    const cartItemsId = user.cart.map(cartItem => cartItem.id);
    await context.lists.CartItem.deleteMany({
        ids: cartItemsId
    });
    return order;
}

export default checkout;
