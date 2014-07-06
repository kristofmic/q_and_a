
// public/javascripts/app/states/states_config.js
(function(ch, angular) {
  var
    dependencies,
    configDefinition;

  dependencies = [
    'ui.router'
  ];

  configDefinition = [
    '$stateProvider',
    '$urlRouterProvider',
    statesConfig
  ];

  ch.states = angular.module('ch.States', dependencies);
  ch.states.config(configDefinition);

  function statesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/list');

    $stateProvider
      .state('list', {
        url: '/list',
        templateUrl: 'list.html',
        controller: 'listController',
        resolve: {
          qas: ['qasFactory', function(qasFactory){
            return qasFactory.index();
          }]
        }
      })
      .state('edit', {
        url: '/edit',
        templateUrl: 'edit.html',
        controller: 'editController'
      });
  }

})(window.ch, angular);

// public/javascripts/app/nav/nav_module.js
(function(ch, angular) {

  var
    dependencies;

  dependencies = [];

  ch.nav = angular.module('ch.Nav', dependencies);

})(window.ch, angular);

// public/javascripts/app/nav/nav_directive.js
(function(nav) {

  var
    definitions;

  definitions = [
    navDirective
  ];

  nav.directive('chNav', definitions);

  function navDirective() {

    return {
      restrict: 'AC',
      link: linker,
      scope: {
        state: '@chNav'
      }
    };

    function linker(scope, element, attrs) {
      scope.$on('$stateChangeSuccess', setActiveNav);

      function setActiveNav(event, toState, toParams, fromState, fromParams) {
        if (toState.name === scope.state) {
          element.addClass('active');
        }
        else {
          element.removeClass('active');
        }
      }
    }

  }

})(window.ch.nav);

// public/javascripts/app/qas/qas_module.js
(function(ch, angular) {

  var
    dependencies;

  dependencies = [];

  ch.qas = angular.module('ch.QAs', dependencies);

})(window.ch, angular);

// public/javascripts/app/qas/qas_factory.js
(function(qas) {

  var
    definitions;

  definitions = [
    '$http',
    qasFactory
  ];

  qas.factory('qasFactory', definitions);

  function qasFactory($http) {

    return {
      create: create,
      index: index
    };

    function create(qa) {
      var
        httpPromise;

      httpPromise = $http.post('/qas', qa)
        .catch(logError);

      return httpPromise;
    }

    function index() {
      var
        httpPromise;

      httpPromise = $http.get('/qas')
        .then(function(res) {
          return res.data;
        })
        .catch(logError);

      return httpPromise;
    }

    function logError(err) {
      console.log('There was an error...');
      console.log('Status: ' + err.status);
      console.log('Message: ' + err.statusText);
      console.log(err.config);
    }
  }

})(window.ch.qas);

// public/javascripts/app/edit/edit_module.js
(function(ch, angular) {

  var
    dependencies;

  dependencies = [
    'ch.QAs'
  ];

  ch.edit = angular.module('ch.Edit', dependencies);

})(window.ch, angular);

// public/javascripts/app/edit/edit_controller.js
(function(edit) {

  var
    definitions;

  definitions = [
    '$scope',
    'qasFactory',
    editController
  ];

  edit.controller('editController', definitions);

  function editController($scope, qasFactory) {
    $scope.submit = submit;

    function submit() {
      qasFactory.create({
        question: $scope.question,
        answer: $scope.answer
      })
      .finally(clearForm);
    }

    function clearForm() {
      $scope.question = undefined;
      $scope.answer = undefined;
    }
  }

})(window.ch.edit);

// public/javascripts/app/list/list_module.js
(function(ch, angular){

  var
    dependencies;

  dependencies = [];

  ch.list = angular.module('ch.List', dependencies);

})(window.ch, angular);

// public/javascripts/app/list/list_controller.js
(function(list) {

  var
    definitions;

  definitions = [
    '$scope',
    'qas',
    listController
  ];

  list.controller('listController', definitions);

  function listController($scope, qas) {
    $scope.qas = qas;
  }

})(window.ch.list);

// public/javascripts/app/templates_module.js
angular.module('ch.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('edit.html',
    "<div class=\"row\"><div class=\"col-sm-12\"><form role=\"form\" name=\"editor\" ng-submit=\"submit()\"><div class=\"form-group\"><label for=\"question\">Question</label><input type=\"text\" class=\"form-control\" id=\"question\" placeholder=\"A question\" ng-required=\"true\" ng-model=\"question\"></div><div class=\"form-group\"><label for=\"answer\">Answer</label><textarea class=\"form-control\" id=\"answer\" placeholder=\"The answer\" ng-required=\"true\" rows=\"6\" ng-model=\"answer\"></textarea></div><button type=\"submit\" class=\"btn btn-default\">Save</button></form></div></div>"
  );


  $templateCache.put('list.html',
    "<div class=\"row\"><div class=\"col-sm-12\"><div class=\"panel panel-default\" ng-repeat=\"qa in qas\"><div class=\"panel-heading\"><h3 class=\"panel-title\">{{qa.question}}</h3></div><div class=\"panel-body\">{{qa.answer}}</div></div></div></div>"
  );


  $templateCache.put('nav.html',
    "<ul class=\"nav nav-tabs\"><li ch-nav=\"list\"><a ui-sref=\"list\">List</a></li><li ch-nav=\"edit\"><a ui-sref=\"edit\">Edit</a></li></ul>"
  );

}]);


// public/javascripts/app/main_module.js
(function(ch, angular) {

  var
    dependencies;

  dependencies = [
    'ch.States',
    'ch.Templates',
    'ch.Nav',
    'ch.List',
    'ch.Edit'
  ];

  ch.main = angular.module('ch.Main', dependencies);

})(window.ch, angular);