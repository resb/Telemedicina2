(function () {
  'use strict';

  describe('Mains Route Tests', function () {
    // Initialize global variables
    var $scope,
      MainsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _MainsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      MainsService = _MainsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('mains');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/mains');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          MainsController,
          mockMain;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('mains.view');
          $templateCache.put('modules/mains/client/views/view-main.client.view.html', '');

          // create mock Main
          mockMain = new MainsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Main Name'
          });

          // Initialize Controller
          MainsController = $controller('MainsController as vm', {
            $scope: $scope,
            mainResolve: mockMain
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:mainId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.mainResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            mainId: 1
          })).toEqual('/mains/1');
        }));

        it('should attach an Main to the controller scope', function () {
          expect($scope.vm.main._id).toBe(mockMain._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/mains/client/views/view-main.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          MainsController,
          mockMain;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('mains.create');
          $templateCache.put('modules/mains/client/views/form-main.client.view.html', '');

          // create mock Main
          mockMain = new MainsService();

          // Initialize Controller
          MainsController = $controller('MainsController as vm', {
            $scope: $scope,
            mainResolve: mockMain
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.mainResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/mains/create');
        }));

        it('should attach an Main to the controller scope', function () {
          expect($scope.vm.main._id).toBe(mockMain._id);
          expect($scope.vm.main._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/mains/client/views/form-main.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          MainsController,
          mockMain;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('mains.edit');
          $templateCache.put('modules/mains/client/views/form-main.client.view.html', '');

          // create mock Main
          mockMain = new MainsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Main Name'
          });

          // Initialize Controller
          MainsController = $controller('MainsController as vm', {
            $scope: $scope,
            mainResolve: mockMain
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:mainId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.mainResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            mainId: 1
          })).toEqual('/mains/1/edit');
        }));

        it('should attach an Main to the controller scope', function () {
          expect($scope.vm.main._id).toBe(mockMain._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/mains/client/views/form-main.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
