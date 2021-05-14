import { text, password, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { permissions, rules } from '../access';

export const User = list({
    access: {
        create: true,
        read: rules.canManageUsers,
        update: rules.canManageUsers,
        // rules is either checked permission OR yourself.
        // only people with the permission can delete themselves.
        delete: permissions.canManageUsers,
    },
    ui: {
        hideCreate: (args) => !permissions.canManageUsers({ args }),
        hideDelete: (args) => !permissions.canManageUsers({ args }),
    },
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
        role: relationship({
            ref: 'Role.assignedTo',
            many: true,
            access: {
                create: permissions.canManageUsers,
                update: permissions.canManageUsers,
            },
        }),
        products: relationship({
            ref: 'Product.user',
            many: true,
        }),
    },
});
