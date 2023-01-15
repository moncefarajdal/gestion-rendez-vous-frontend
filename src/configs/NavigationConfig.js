import {
  DashboardOutlined,
  UserOutlined,
  BulbOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [
  {
    key: 'home',
    path: `${APP_PREFIX_PATH}/home`,
    title: 'home',
    icon: DashboardOutlined,
    breadcrumb: true,
    submenu: []
  },
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
  },
  {
    key: 'technician',
    path: `${APP_PREFIX_PATH}/technician/calendar`,
    title: 'technician',
    icon: DashboardOutlined,
    breadcrumb: true,
    submenu: []
  },
]

const appsNavTree = [
  {
    key: 'apps',
    path: '',
    title: 'sidenav.apps',
    icon: AppstoreOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'apps-technician',
        path: `${APP_PREFIX_PATH}/admin/technician`,
        title: 'Techniciens',
        icon: BulbOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: 'apps-technicians-list',
            path: `${APP_PREFIX_PATH}/admin/technician/list-technician`,
            title: 'Techniciens List',
            icon: '',
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'apps-technicians-rdv',
            path: `${APP_PREFIX_PATH}/admin/technician/add-rdv-disponible`,
            title: 'RDVs Disponibles',
            icon: '',
            breadcrumb: false,
            submenu: []
          }
        ]
      },
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

const navigationConfig = [
  ...dashBoardNavTree,
  ...appsNavTree,
]

export default navigationConfig;
