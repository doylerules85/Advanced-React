import { createAuth } from '@keystone-next/auth';
import {
    withItemData,
    statelessSessions,
} from '@keystone-next/keystone/session';
import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';

const databseUrl =
    process.env.DATABASE_URL || 'mongodb://locahost/keystone-sick-fits-tut';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360,
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        // todo - roles
    },
});

export default withAuth(
    config({
        server: {
            cors: {
                origin: [process.env.FRONTEND_URL],
                credentials: true,
            },
        },
        db: {
            adapter: 'mongoose',
            url: databseUrl,
            async onConnect(keystone) {
                if (process.argv.includes('--seed-data')) {
                    await insertSeedData(keystone);
                }
            },
        },
        lists: createSchema({
            // schema items goe here
            User,
            Product,
            ProductImage,
        }),
        ui: {
            isAccessAllowed: ({ session }) => {
                console.log(session);
                return !!session?.data;
            },
        },
        session: withItemData(statelessSessions(sessionConfig), {
            // Graph QL Query Right Here
            User: 'id',
        }),
    })
);
