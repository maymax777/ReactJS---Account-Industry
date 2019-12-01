import {FuseLoadable} from '@fuse';
// import {Redirect} from 'react-router-dom';

export const bankwithdrawConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/bankwithdraw',
            component: FuseLoadable({
                loader: () => import('./bankwithdrawPage')
            })
        },
    ]
};


