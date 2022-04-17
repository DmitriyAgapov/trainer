import {config} from '@keystone-6/core';
import {statelessSessions} from '@keystone-6/core/session';
import {createAuth} from '@keystone-6/auth';
import {lists} from './schema';
import {PORT, DATABASE_URL, SESSION_MAX_AGE, SESSION_SECRET} from './config';
import { rules } from './schema/access';

// createAuth configures signin functionality based on the config below. Note this only implements
// authentication, i.e signing in as an item using identity and secret fields in a list. Session
// management and access control are controlled independently in the main keystone config.
const {withAuth} = createAuth({
    identityField: 'email',
    secretField: 'password',
    listKey: 'User',
    sessionData: `id name role {
    canManageContent
    canManageUsers
  }`,
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        itemData: {
            role: {
                create: {
                    name: 'Super User',
                    canManageContent: true,
                    canManageUsers: true,
                },
            },
        },
    },
});

// Stateless sessions will store the listKey and itemId of the signed-in user in a cookie.
// This session object will be made available on the context object used in hooks, access-control,
// resolvers, etc.
const session = statelessSessions({
    // maxAge: SESSION_MAX_AGE,
    // The session secret is used to encrypt cookie data (should be an environment variable)
    // secret: SESSION_SECRET,
    secret: SESSION_SECRET,
});

// We wrap our config using the withAuth function. This will inject all
// the extra config required to add support for authentication in our system.
export default withAuth(
    config({
        db: {
            provider: 'postgresql',
            // useMigrations: true,
            url: DATABASE_URL,
        },
        experimental: {
            enableNextJsGraphqlApiEndpoint: true,
            generateNextGraphqlAPI: true,
            generateNodeAPI: true,
        },

        // ui: {
        //     // Show the UI only for poeple who pass this test
        //     isAccessAllowed: ({ session }) => !!session,
        // },
        ui: { isAccessAllowed: rules.canUseAdminUI },
        files: {
            upload: 'local',
            local: {
                storagePath: 'public/files',
                baseUrl: '/files',
            },
        },
        images: {
            upload: 'local',
            local: {
                storagePath: 'public/images',
                baseUrl: '/images',
            },
        },
        server: {
            port: PORT,
            // extendExpressApp: (app, createContext) => {
            //     app.use('/rest', async (req, res, next) => {
            //         (req as any).context = await createContext(req, res);
            //         next();
            //     });
            //     app.get('/rest/stories', getStories);
            // },
            cors: {
                origin: [process.env.FRONTEND_URL!],
                credentials: true,
            },
            // extendExpressApp: (app, createContext) => {
            //     app.merge(next)
            // },
        },
        lists,
        // We add our session configuration to the system here.
        session,
    })
);
