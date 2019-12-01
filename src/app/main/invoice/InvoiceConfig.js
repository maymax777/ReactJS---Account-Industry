import {FuseLoadable} from '@fuse';
// import {Redirect} from 'react-router-dom';

export const InvoiceConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/createinvoice',
            component: FuseLoadable({
                loader: () => import('./InvoicePage')
            })
        },
    ]
};