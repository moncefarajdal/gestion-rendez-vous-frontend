import {
  DashboardOutlined,
  UserOutlined,
  BulbOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const adminDash = [
  {
    key: 'admin',
    path: '',
    title: 'Admin Panel',
    icon: AppstoreOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'admin-technician',
        path: `${APP_PREFIX_PATH}/admin/technician`,
        title: 'Gestion techniciens',
        icon: BulbOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: 'admin-technicians-list',
            path: `${APP_PREFIX_PATH}/admin/technician/list-technician`,
            title: 'Techniciens List',
            icon: '',
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'admin-technicians-rdv',
            path: `${APP_PREFIX_PATH}/admin/technician/add-rdv-disponible`,
            title: 'RDVs Disponibles',
            icon: '',
            breadcrumb: false,
            submenu: []
          }
        ]
      }
    ]
  },
]

const superAdminDash = [
  {
    key: 'apps',
    path: '',
    title: 'sidenav.apps',
    icon: AppstoreOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'apps-succursale',
        path: `${APP_PREFIX_PATH}/super-admin/succursale`,
        title: 'Succursales',
        icon: BulbOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: 'apps-succursales-list',
            path: `${APP_PREFIX_PATH}/super-admin/succursale/list-succursale`,
            title: 'Succursales List',
            icon: '',
            breadcrumb: false,
            submenu: []
          }
        ]
      },
      {
        key: 'apps-admin',
        path: `${APP_PREFIX_PATH}/super-admin/admin`,
        title: 'Admins',
        icon: BulbOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: 'apps-admins-list',
            path: `${APP_PREFIX_PATH}/super-admin/admin/list-admin`,
            title: 'Admins List',
            icon: '',
            breadcrumb: false,
            submenu: []
          }
        ]
      },
    ]
  },
]

const technicienDash = [
  {
    key: 'technicien',
    path: '',
    title: 'Technicien Panel',
    icon: AppstoreOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'technicien',
        path: `${APP_PREFIX_PATH}/technician/calendar`,
        title: 'Calendrier',
        icon: DashboardOutlined,
        breadcrumb: true,
        submenu: []
      }
    ]
  }
]

const clientDash = [
  {
    key: 'client',
    path: `${APP_PREFIX_PATH}/client/booking`,
    title: 'Booking',
    icon: AppstoreOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: 'apps-ecommerce',
        path: `${APP_PREFIX_PATH}/client/booking`,
        title: 'Rendez-vous',
        icon: UserOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: 'apps-ecommerce-productList',
            path: `${APP_PREFIX_PATH}/client`,
            title: 'Booking',
            icon: '',
            breadcrumb: true,
            submenu: []
          },
          {
            key: 'apps-ecommerce-calendar',
            path: `${APP_PREFIX_PATH}/calendar`,
            title: 'Calendrier',
            icon: '',
            breadcrumb: true,
            submenu: []
          }
        ]
      }
    ]
  }
]

// const dashBoardNavTree = [
//   {
//     key: 'home',
//     path: `${APP_PREFIX_PATH}/home`,
//     title: 'home',
//     icon: DashboardOutlined,
//     breadcrumb: true,
//     submenu: []
//   },
//   {
//     key: 'client',
//     path: `${APP_PREFIX_PATH}/client/booking`,
//     title: 'Booking',
//     icon: AppstoreOutlined,
//     breadcrumb: true,
//     submenu: [
//       {
//         key: 'apps-ecommerce',
//         path: `${APP_PREFIX_PATH}/client/booking`,
//         title: 'Rendez-vous',
//         icon: UserOutlined,
//         breadcrumb: true,
//         submenu: [
//           {
//             key: 'apps-ecommerce-productList',
//             path: `${APP_PREFIX_PATH}/client`,
//             title: 'Booking',
//             icon: '',
//             breadcrumb: true,
//             submenu: []
//           },
//           {
//             key: 'apps-ecommerce-calendar',
//             path: `${APP_PREFIX_PATH}/calendar`,
//             title: 'Calendrier',
//             icon: '',
//             breadcrumb: true,
//             submenu: []
//           }
//         ]
//       }
//     ]
//   },
//   {
//     key: 'technician',
//     path: `${APP_PREFIX_PATH}/technician/calendar`,
//     title: 'technician',
//     icon: DashboardOutlined,
//     breadcrumb: true,
//     submenu: []
//   },
// ]

// const appsNavTree = [
//   {
//     key: 'apps',
//     path: '',
//     title: 'sidenav.apps',
//     icon: AppstoreOutlined,
//     breadcrumb: false,
//     submenu: [
//       {
//         key: 'apps-technician',
//         path: `${APP_PREFIX_PATH}/admin/technician`,
//         title: 'Techniciens',
//         icon: BulbOutlined,
//         breadcrumb: true,
//         submenu: [
//           {
//             key: 'apps-technicians-list',
//             path: `${APP_PREFIX_PATH}/admin/technician/list-technician`,
//             title: 'Techniciens List',
//             icon: '',
//             breadcrumb: false,
//             submenu: []
//           },
//           {
//             key: 'apps-technicians-rdv',
//             path: `${APP_PREFIX_PATH}/admin/technician/add-rdv-disponible`,
//             title: 'RDVs Disponibles',
//             icon: '',
//             breadcrumb: false,
//             submenu: []
//           }
//         ]
//       },
//       {
//         key: 'apps-succursale',
//         path: `${APP_PREFIX_PATH}/super-admin/succursale`,
//         title: 'Succursales',
//         icon: BulbOutlined,
//         breadcrumb: true,
//         submenu: [
//           {
//             key: 'apps-succursales-list',
//             path: `${APP_PREFIX_PATH}/super-admin/succursale/list-succursale`,
//             title: 'Succursales List',
//             icon: '',
//             breadcrumb: false,
//             submenu: []
//           }
//         ]
//       },
//       {
//         key: 'apps-admin',
//         path: `${APP_PREFIX_PATH}/super-admin/admin`,
//         title: 'Admins',
//         icon: BulbOutlined,
//         breadcrumb: true,
//         submenu: [
//           {
//             key: 'apps-admins-list',
//             path: `${APP_PREFIX_PATH}/super-admin/admin/list-admin`,
//             title: 'Admins List',
//             icon: '',
//             breadcrumb: false,
//             submenu: []
//           }
//         ]
//       },
//     ]
//   },
// ]

let navigate = []
let role

if (localStorage.getItem('userRole') !== null) {
  role = localStorage.getItem('userRole')
} else {
  role = 'ADMIN'
}

if (role === 'SUPER_ADMIN') {
  navigate = [
    ...superAdminDash
  ]
} else if (role === 'ADMIN') {
  navigate = [
    ...adminDash
  ]
} else if (role === 'CLIENT') {
  navigate = [
    ...clientDash
  ]
} else if (role === 'TECHNICIEN') {
  navigate = [
    ...technicienDash
  ]
} else {
  navigate = [
    ...adminDash
  ]
}

// const navigationConfig = [
//   ...dashBoardNavTree,
//   ...appsNavTree,
// ]

export default navigate;
