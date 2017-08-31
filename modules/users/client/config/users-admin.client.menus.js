'use strict';

// Configuring the Articles module
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users'
    });
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Specialties',
      state: 'specialties.list'
    });
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Tarjetas',
      state: 'tarjetas.list'
    });
  }
]);
