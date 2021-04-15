import { text, password, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const User = list({
    // access:
    // ui
    fields: {
        name: text({ isRequired: true }),
        email: text({ isRequired: true, isUnique: true }),
        password: password(),

        // adding the cart relationship
        cart: relationship({
            // relationship with cart and user
            ref: 'CartItem.user',
            many: true,
            ui: {
                createView: { fieldMode: 'hidden' },
                itemView: { fieldMode: 'read' },
            },
        }),
        // to do add roles and orders
        orders: relationship({ ref: 'Order.user', many: true }),
    },
});
