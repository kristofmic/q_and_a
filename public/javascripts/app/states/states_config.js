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