import {FuseLoadable} from '@fuse';
// import {Redirect} from 'react-router-dom';

export const CustomerConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/customer',
            component: FuseLoadable({
                loader: () => import('./CustomerPage')
            })
        },
    ]
};