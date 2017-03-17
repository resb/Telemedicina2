(function () {
  'use strict';

  angular
    .module('mains')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('mains', {
        abstract: true,
        url: '/mains',
        template: '<ui-view/>'
      })
      .state('mains.list', {
        url: '',
        templateUrl: 'modules/mains/client/views/list-mains.client.view.html',
        controller: 'MainsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Mains List'
        }
      })
      .state('mains.create', {
        url: '/create',
        templateUrl: 'modules/mains/client/views/form-main.client.view.html',
        controller: 'MainsController',
        controllerAs: 'vm',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mains Create'
        }
      })
      .state('mains.edit', {
        url: '/:mainId/edit',
        templateUrl: 'modules/mains/client/views/form-main.client.view.html',
        controller: 'MainsController',
        controllerAs: 'vm',
        resolve: {
          mainResolve: getMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Main {{ mainResolve.name }}'
        }
      })
      .state('mains.view', {
        url: '/:mainId',
        templateUrl: 'modules/mains/client/views/view-main.client.view.html',
        controller: 'MainsController',
        controllerAs: 'vm',
        resolve: {
          mainResolve: getMain
        },
        data: {
          pageTitle: 'Main {{ mainResolve.name }}'
        }
      })
      .state('mains.emergencia', {
        url: '/emergencia',
        templateUrl: 'modules/mains/client/views/form-main.client.view.html',
        controller: 'MainsController',
        controllerAs: 'vm',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Emergencia'
        }
      })
      .state('mains.citas', {
        url: '/citaVirtual',
        templateUrl: 'modules/mains/client/views/form-citas.client.view.html',
        controller: 'MainsController',
        controllerAs: 'vm',
         resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mis Citas Vituales'
        }
      })
      .state('mains.informacion', {
        url: '/informacion',
        templateUrl: 'modules/mains/client/views/form-datos-generales.client.view.html',
        controller: 'MainsController',
        controllerAs: 'vm',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Informacion'
        }
      })
      .state('mains.atencion', {
        url: '/atencion',
        templateUrl: 'modules/mains/client/views/form-atencion.client.view.html',
        controller: 'MainsController',
        controllerAs: 'vm',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mis Citas Vituales'
        }
      })
      .state('mains.atencionCita', {
        url: '/atencionCita',
        templateUrl: 'modules/mains/client/views/form-atencion-cita.client.view.html',
         controller: 'MainsController',
        controllerAs: 'vm',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mis Citas Vituales'
        }
      })
      .state('mains.tarjeta', {
        url: '/registrarTarjeta',
        templateUrl: 'modules/mains/client/views/form-tarjeta.client.view.html',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mis Citas Vituales'
        }
      })
      .state('mains.alergia', {
        url: '/alergias',
        templateUrl: 'modules/mains/client/views/form-alergias.client.view.html',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mis Citas Vituales'
        }
      })
      .state('mains.habitos', {
        url: '/habitos',
        templateUrl: 'modules/mains/client/views/form-habitos.client.view.html',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mis Citas Vituales'
        }
      })
      .state('mains.enfermedades', {
        url: '/enfermedades',
        templateUrl: 'modules/mains/client/views/form-enfermedades.client.view.html',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mis Citas Vituales'
        }
      })
      .state('mains.tratamientos', {
        url: '/tratamientos',
        templateUrl: 'modules/mains/client/views/form-tratamientos.client.view.html',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mis Citas Vituales'
        }
      })
      .state('mains.operaciones', {
        url: '/operaciones',
        templateUrl: 'modules/mains/client/views/form-operaciones.client.view.html',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mis Citas Vituales'
        }
      })
      .state('mains.historial', {
        url: '/registrarTarjeta',
        templateUrl: 'modules/mains/client/views/form-historia.client.view.html',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mis Citas Vituales'
        }
      })
      .state('mains.atencionpopup', {
        url: '/atencionEspera',
        templateUrl: 'modules/mains/client/views/form-atencion-popup.client.view.html',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mis Citas Vituales'
        }
      })
      .state('mains.editarCita', {
        url: '/editarCita',
        templateUrl: 'modules/mains/client/views/form-editar-cita.client.view.html',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mis Citas Vituales'
        }
      })
      .state('mains.editarPopup', {
        url: '/editarPopup',
        templateUrl: 'modules/mains/client/views/form-editar-popup.client.view.html',
        resolve: {
          mainResolve: newMain
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Mis Citas Vituales'
        }
      });

  }

  getMain.$inject = ['$stateParams', 'MainsService'];

  function getMain($stateParams, MainsService) {
    return MainsService.get({
      mainId: $stateParams.mainId
    }).$promise;
  }

  newMain.$inject = ['MainsService'];

  function newMain(MainsService) {
    return new MainsService();
  }
}());
