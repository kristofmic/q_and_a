
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
        controller: 'ListController'
      });
  }

})(window.ch, angular);

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
    listController
  ];

  list.controller('ListController', definitions);

  function listController($scope) {
    console.log('hello world');
  }

})(window.ch.list);

// public/javascripts/app/templates_module.js
angular.module('ch.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('list.html',
    "<p>hello world</p>"
  );

}]);


// public/javascripts/app/main_module.js
(function(ch, angular) {

  var
    dependencies;

  dependencies = [
    'ch.States',
    'ch.Templates',
    'ch.List'
  ];

  ch.main = angular.module('ch.Main', dependencies);

})(window.ch, angular);