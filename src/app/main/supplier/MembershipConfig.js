// import React from 'react';
import {FuseLoadable} from '@fuse';
// import {Redirect} from 'react-router-dom';

export const MembershipConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/supplier',
            component: FuseLoadable({
                loader: () => import('./MembershipPage')
            })
        },
    ]
};
