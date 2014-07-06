(function(window, angular) {

  var
    ch = window.ch = window.ch || {},
    moduleDependencies,
    configDefinition;

  moduleDependencies = [
    'ui.router',
    'ch.Navbar',
    'ch.Templates',
    'ch.Main'
  ];

  ch.showtracker = angular.module('ch.Showtracker', moduleDependencies);

  configDefinition = [
    '$stateProvider',
    '$urlRouterProvider',
    config
  ];

  ch.showtracker.config(configDefinition);

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('main', {
        views: {
          '': {
            templateUrl: 'main.html',
            controller: 'MainController'
          },
          'navbar@main': { templateUrl: 'navbar.html' }
        },
        abstract: true
      })
      .state('main.home', {
        url: '/home',
        templateUrl: 'home.html',
        controller: 'HomeController'
      })
      .state('main.shows', {
        url: '/shows/:id',
        templateUrl: 'detail.html',
        controller: 'DetailController'
      })
      .state('main.login', {
        url: '/login',
        templateUrl: 'login.html',
        controller: 'LoginController'
      })
      .state('main.signup', {
        url: '/signup',
        templateUrl: 'signup.html',
        controller: 'SignupController'
      })
      .state('main.add', {
        url: '/add',
        templateUrl: 'add.html',
        controller: 'AddController'
      });
  }

})(window, angular);