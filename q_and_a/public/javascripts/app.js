
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
        controller: 'listController'
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

// public/javascripts/app/edit/edit_module.js
(function(ch, angular) {

  var
    dependencies;

  dependencies = [];

  ch.edit = angular.module('ch.Edit', dependencies);

})(window.ch, angular);

// public/javascripts/app/edit/edit_controller.js
(function(edit) {

  var
    definitions;

  definitions = [
    '$scope',
    editController
  ];

  edit.controller('editController', definitions);

  function editController($scope) {

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
    listController
  ];

  list.controller('listController', definitions);

  function listController($scope) {

  }

})(window.ch.list);

// public/javascripts/app/templates_module.js
angular.module('ch.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('edit.html',
    "<div class=\"row\"><div class=\"col-sm-12\"><h4>Edit</h4></div></div>"
  );


  $templateCache.put('list.html',
    "<div class=\"row\"><div class=\"col-sm-12\"><h4>List</h4></div></div>"
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