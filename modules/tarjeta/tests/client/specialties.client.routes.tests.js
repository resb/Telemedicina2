(function () {
  'use strict';

  describe('Specialties Route Tests', function () {
    // Initialize global variables
    var $scope,
      SpecialtiesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _SpecialtiesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      SpecialtiesService = _SpecialtiesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('specialties');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/specialties');
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
          SpecialtiesController,
          mockSpecialty;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('specialties.view');
          $templateCache.put('modules/specialties/client/views/view-specialty.client.view.html', '');

          // create mock Specialty
          mockSpecialty = new SpecialtiesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Specialty Name'
          });

          // Initialize Controller
          SpecialtiesController = $controller('SpecialtiesController as vm', {
            $scope: $scope,
            specialtyResolve: mockSpecialty
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:specialtyId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.specialtyResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            specialtyId: 1
          })).toEqual('/specialties/1');
        }));

        it('should attach an Specialty to the controller scope', function () {
          expect($scope.vm.specialty._id).toBe(mockSpecialty._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/specialties/client/views/view-specialty.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          SpecialtiesController,
          mockSpecialty;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('specialties.create');
          $templateCache.put('modules/specialties/client/views/form-specialty.client.view.html', '');

          // create mock Specialty
          mockSpecialty = new SpecialtiesService();

          // Initialize Controller
          SpecialtiesController = $controller('SpecialtiesController as vm', {
            $scope: $scope,
            specialtyResolve: mockSpecialty
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.specialtyResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/specialties/create');
        }));

        it('should attach an Specialty to the controller scope', function () {
          expect($scope.vm.specialty._id).toBe(mockSpecialty._id);
          expect($scope.vm.specialty._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/specialties/client/views/form-specialty.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          SpecialtiesController,
          mockSpecialty;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('specialties.edit');
          $templateCache.put('modules/specialties/client/views/form-specialty.client.view.html', '');

          // create mock Specialty
          mockSpecialty = new SpecialtiesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Specialty Name'
          });

          // Initialize Controller
          SpecialtiesController = $controller('SpecialtiesController as vm', {
            $scope: $scope,
            specialtyResolve: mockSpecialty
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:specialtyId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.specialtyResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            specialtyId: 1
          })).toEqual('/specialties/1/edit');
        }));

        it('should attach an Specialty to the controller scope', function () {
          expect($scope.vm.specialty._id).toBe(mockSpecialty._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/specialties/client/views/form-specialty.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
