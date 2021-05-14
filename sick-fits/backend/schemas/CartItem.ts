import { integer, relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const CartItem = list({
    access: {
        create: isSignedIn,
        read: rules.canOrder,
        update: rules.canOrder,
        delete: rules.canOrder,
    },
    ui: {
        listView: {
            initialColumns: ['product', 'quantity', 'user'],
        },
    },
    fields: {
        quantity: integer({
            defaultValue: 1,
            isRequired: true,
        }),
        // create relationships
        product: relationship({ ref: 'Product' }),
        // creating the user and cart relationship
        user: relationship({ ref: 'User.cart' }),
    },
});
