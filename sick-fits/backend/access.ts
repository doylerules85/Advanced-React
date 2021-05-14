import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

// at simple access control is either YES or NO

export function isSignedIn({ session }: ListAccessArgs) {
    return !!session;
}

const generatedPermissions = Object.fromEntries(
    permissionsList.map((permission) => [
        permission,
        function ({ session }: ListAccessArgs) {
            return !!session?.data.role?.[permission];
        },
    ])
);

// check if someone meets the criteria -  yes or no
export const permissions = {
    ...generatedPermissions,
};

// Rule Based Permissions functions
// rules can be booleans or a filter that limits which products that can be CRUD
export const rules = {
    canManageProducts({ session }: ListAccessArgs) {
        if (!isSignedIn({ session })) {
            return false;
        }
        // do they have permissions to manage the products
        if (permissions.canManageProducts({ session })) {
            return true;
        }
        // if not do they own the item?
        return { user: { id: session.itemId } };
    },
    canReadProducts({ session }: ListAccessArgs) {
        if (!isSignedIn({ session })) {
            return false;
        }
        if (permissions.canManageProducts({ session })) {
            return true;
        }
        return { status: 'AVAILABLE' };
    },
    canOrder({ session }: ListAccessArgs) {
        // do they have permissions to manage the products
        if (permissions.canManageCart({ session })) {
            return true;
        }
        // check if user is not signed in
        if (!isSignedIn({ session })) {
            return false;
        }
        // if not do they own the item?
        return { user: { id: session.itemId } };
    },
    canManageOrderItems({ session }: ListAccessArgs) {
        if (!isSignedIn({ session })) {
            return false;
        }
        // do they have permissions to manage the products
        if (permissions.canManageCart({ session })) {
            return true;
        }
        // if not do they own the item?
        return { order: { user: { id: session.itemId } } };
    },
    canManageUsers({ session }: ListAccessArgs) {
        // check if user is not signed in
        if (!isSignedIn({ session })) {
            return false;
        }
        // do they have permissions to manage the products
        if (permissions.canManageUsers({ session })) {
            return true;
        }
        // if not - they can only update themselves
        return { id: session.itemId };
    },
};
