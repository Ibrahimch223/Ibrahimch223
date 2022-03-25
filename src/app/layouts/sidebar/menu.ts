import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        badge: {
            variant: 'info',
            text: 'MENUITEMS.DASHBOARDS.BADGE',
        },
        subItems: [
            {
                id: 3,
                label: 'MENUITEMS.DASHBOARDS.LIST.DEFAULT',
                link: '/dashboard',
                parentId: 2
            },
            {
                id: 4,
                label: 'MENUITEMS.DASHBOARDS.LIST.SAAS',
                link: '/dashboards/saas',
                parentId: 2
            },
            {
                id: 5,
                label: 'MENUITEMS.DASHBOARDS.LIST.CRYPTO',
                link: '/dashboards/crypto',
                parentId: 2
            },
            {
                id: 6,
                label: 'MENUITEMS.DASHBOARDS.LIST.BLOG',
                link: '/dashboards/blog',
                parentId: 2
            },
        ]
    },
    {
        id: 7,
        isLayout: true
    },
    {
        id: 8,
        label: 'MENUITEMS.APPS.TEXT',
        isTitle: true
    },
    {
        id: 10,
        label: 'ORDERS',
        icon: 'bx bx-cart-alt',
        link: '/views/list-orders',
    },
    {
        id: 11,
        label: 'Planing',
        icon: 'bx-calendar',
        link: '/views/planing',
    },
    {
        id: 12,
        label: 'Deliveryman',
        icon: 'bx-calendar',
        link: '/views/list-deliveryman',
    },
    {
        id: 13,
        label: 'Customers',
        icon: 'bx-calendar',
        link: '/views/list-customers',
    },
    {
        id: 14,
        label: 'Payment',
        icon: 'bx-calendar',
        link: '/views/list-payment',
    },
    {
        id: 15,
        label: 'Vehicle',
        icon: 'bx-calendar',
        link: '/views/list-vehicle',
    },
    {
        id: 16,
        label: 'Category',
        icon: 'bx-calendar',
        link: '/views/list-category',
    },
    {
        id: 17,
        label: 'Permission',
        icon: 'bx-calendar',
        link: '/views/permission',
    },
    {
        id: 18,
        label: 'Role',
        icon: 'bx-calendar',
        link: '/views/list-role',
    },
    {
        id: 19,
        label: 'Users',
        icon: 'bx-calendar',
        link: '/views/list-users',
    }
    
];

