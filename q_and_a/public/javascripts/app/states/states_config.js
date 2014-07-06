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