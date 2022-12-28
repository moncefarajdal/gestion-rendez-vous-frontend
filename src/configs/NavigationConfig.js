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
    path: '',
    title: 'Clients',
    icon: UserOutlined,
    breadcrumb: true,
    submenu: [
      {
        key: 'apps-ecommerce',
        path: `${APP_PREFIX_PATH}/client`,
        title: 'Clients',
        icon: UserOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: 'apps-ecommerce-productList',
            path: `${APP_PREFIX_PATH}/client`,
            title: 'Clients List',
            icon: '',
            breadcrumb: true,
            submenu: []
          },
        ]
      }
    ]
  }
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
          key: 'apps-technicians-add',
          path: `${APP_PREFIX_PATH}/admin/technician/add-technician`,
          title: 'Add a Technicien',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    },
    {
      key: 'apps-succursales',
      path: `${APP_PREFIX_PATH}/admin/succursale`,
      title: 'Succursale',
      icon: BulbOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'apps-succursales-list',
          path: `${APP_PREFIX_PATH}/admin/succursale/list-succursale`,
          title: 'Succursales List',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'apps-succursales-add',
          path: `${APP_PREFIX_PATH}/admin/succursale/add-succursale`,
          title: 'Add a Succursale',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'apps-succursales-edit',
          path: `${APP_PREFIX_PATH}/admin/succursale/edit-succursale`,
          title: 'Edit a Succursale',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    }
  ]
}]

const navigationConfig = [
  ...dashBoardNavTree,
  ...appsNavTree
]

export default navigationConfig;
