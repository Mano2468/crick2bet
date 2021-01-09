import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Sports',
    url: '/sports',
    icon: 'icon-social-dribbble',
  },
  {
    name: "Users",
    url: '/users',
    icon: 'icon-people'
  },
  {
    name: "Setting",
    url: '/setting',
    icon: 'icon-settings',
    children:[
      {
        name: 'Message Setting',
        url: '/setting/message_setting',
      },
      {
        name: 'Match Setting',
        url: '/setting/match_setting',
      }
    ]
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },

  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },
  },

];
