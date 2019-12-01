import {FuseLoadable} from '@fuse';
// import {Redirect} from 'react-router-dom';

export const taxConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/taxsetup',
            component: FuseLoadable({
                loader: () => import('./taxPage')
            })
        },
    ]
};

