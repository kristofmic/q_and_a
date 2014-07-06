(function(window, angular) {

  var
    ch = window.ch = window.ch || {};

  ch.navbar = angular.module('ch.Navbar', []);

}(window, angular));
(function() {

  ch.navbar.directive('chNav', [function() {

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

  }]);

}(ch));
(function(window, angular) {

  var
    ch = window.ch = window.ch || {},
    moduleDependencies;

  moduleDependencies = [
    'ngResource',
    'drahak.alerts'
  ];

  ch.main = angular.module('ch.Main', moduleDependencies);

})(window, angular);
(function(ch) {

  var
    definitions;

  definitions = [
    '$resource',
    show
  ];

  ch.main.factory('show', definitions);

  function show($resource) {

    return $resource('/api/shows/:_id');

  }

})(ch);
(function(ch) {

  var
    definitions;

  definitions = [
    '$http',
    subscription
  ];

  ch.main.factory('subscription', definitions);

  function subscription($http) {

    return {
      subscribe: function(show, user) {
        return $http.post('/api/subscribe', { showId: show._id, userId: user._id });
      },
      unsubscribe: function(show, user) {
        return $http.post('/api/unsubscribe', { showId: show._id, userId: user._id });
      }
    };

  }

})(ch);
(function(ch) {

  var
    definitions;

  definitions = [
    '$scope',
    '$http',
    '$alert',
    AddController
  ];

  ch.main.controller('AddController', definitions);

  function AddController($scope, $http, $alert) {
    $scope.addShow = addShow;

    function addShow() {
      $http.post('/api/shows', { showName: $scope.showName })
        .success(function() {
          $scope.showName = '';
          $alert('TV show has been added.');
        });
    }
  }

})(ch);
(function(ch) {

  var
    definitions;

  definitions = [
    '$scope',
    '$rootScope',
    '$stateParams',
    'show',
    'subscription',
    DetailController
  ];

  ch.main.controller('DetailController', definitions);

  function DetailController($scope, $rootScope, $stateParams, show, subscription) {
    show.get({ _id: $stateParams.id }, onAfterGet);

    function onAfterGet(show) {
      $scope.show = show;

      $scope.isSubscribed = function() {
        return $scope.show.subscribers.indexOf($rootScope.currentUser._id) !== -1;
      };

      $scope.subscribe = function() {
        subscription.subscribe(show, $rootScope.currentUser).success(function() {
          $scope.show.subscribers.push($rootScope.currentUser._id);
        });
      };

      $scope.unsubscribe = function() {
        subscription.unsubscribe(show, $rootScope.currentUser).success(function() {
          var index = $scope.show.subscribers.indexOf($rootScope.currentUser._id);
          $scope.show.subscribers.splice(index, 1);
        });
      };

      $scope.nextEpisode = show.episodes.filter(function(episode) {
        return new Date(episode.firstAired) > new Date();
      })[0];
    }
  }

})(ch);
(function(ch) {

  var
    definitions;

  definitions = [
    '$scope',
    'show',
    HomeController
  ];

  ch.main.controller('HomeController', definitions);

  function HomeController($scope, show) {
    $scope.alphabet = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z'];

    $scope.genres = ['Action', 'Adventure', 'Animation', 'Children', 'Comedy',
      'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Food',
      'Home and Garden', 'Horror', 'Mini-Series', 'Mystery', 'News', 'Reality',
      'Romance', 'Sci-Fi', 'Sport', 'Suspense', 'Talk Show', 'Thriller',
      'Travel'];

    $scope.headingTitle = 'Top 12 Shows';

    $scope.shows = show.query();

    $scope.filterByGenre = filterByGenre;

    $scope.filterByAlphabet = filterByAlphabet;

    function filterByGenre(genre) {
      $scope.shows = show.query({ genre: genre });
      $scope.headingTitle = genre;
    }

    function filterByAlphabet(char) {
      $scope.shows = show.query({ alphabet: char });
      $scope.headingTitle = char;
    };
  }

})(ch);
(function(ch) {

  var
    definitions;

  definitions = [
    '$scope',
    LoginController
  ];

  ch.main.controller('LoginController', definitions);

  function LoginController($scope) {
  }

})(ch);
(function(ch) {

  var
    definitions;

  definitions = [
    '$scope',
    MainController
  ];

  ch.main.controller('MainController', definitions);

  function MainController($scope) {
  }

})(ch);
(function(ch) {

  var
    definitions;

  definitions = [
    '$scope',
    SignupController
  ];

  ch.main.controller('SignupController', definitions);

  function SignupController($scope) {
  }

})(ch);
angular.module('ch.Templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('add.html',
    "<div alerts=\"\"></div><div class=\"container\"><div class=\"panel panel-default\"><div class=\"panel-heading\">Add TV Show</div><div class=\"panel-body\"><form method=\"post\" ng-submit=\"addShow()\" name=\"addForm\" class=\"form-inline\"><div class=\"form-group\"><input class=\"form-control\" type=\"text\" name=\"showName\" ng-model=\"showName\" placeholder=\"Enter TV show name\" autofocus></div><button class=\"btn btn-primary\" type=\"submit\">Add</button></form></div></div></div>"
  );


  $templateCache.put('detail.html',
    "<div class=\"container\"><div class=\"panel panel-default\"><div class=\"panel-body\"><div class=\"media\"><div class=\"pull-left\"><img class=\"media-object img-rounded\" ng-src=\"{{show.poster}}\"><div class=\"text-center\" ng-if=\"currentUser\"><div ng-show=\"!isSubscribed()\"><button ng-click=\"subscribe()\" class=\"btn btn-block btn-success\"><span class=\"glyphicon glyphicon-plus\"></span> Subscribe</button></div><div ng-show=\"isSubscribed()\"><button ng-click=\"unsubscribe()\" class=\"btn btn-block btn-danger\"><span class=\"glyphicon glyphicon-minus\"></span> Unsubscribe</button></div></div><div class=\"text-center\" ng-show=\"!currentUser\"><a class=\"btn btn-block btn-primary\" href=\"#/login\">Login to Subscribe</a></div></div><div class=\"media-body\"><h2 class=\"media-heading\">{{show.name}} <span class=\"pull-right text-danger\">{{show.rating}}</span></h2><h4 ng-show=\"show.status === 'Continuing'\"><span class=\"glyphicon glyphicon-calendar text-danger\"></span> {{show.airsDayOfWeek}} <em>{{show.airsTime}}</em> on {{show.network}}</h4><h4 ng-show=\"show.status === 'Ended'\">Status: <span class=\"text-danger\">Ended</span></h4><p>{{show.overview}}</p></div></div></div></div><div class=\"alert alert-info\" ng-show=\"nextEpisode\">The next episode starts {{nextEpisode.firstAired}}.</div><div class=\"panel panel-default\"><div class=\"panel-heading\"><span class=\"glyphicon glyphicon-play\"></span> Episodes</div><div class=\"panel-body\"><div class=\"episode\" ng-repeat=\"episode in show.episodes\"><h4>{{episode.episodeName}} <small>Season {{episode.season}}, Episode {{episode.episodeNumber}}</small></h4><p><span class=\"glyphicon glyphicon-calendar\"></span> {{episode.firstAired | date: 'short'}}</p><p>{{episode.overview}}</p></div></div></div></div>"
  );


  $templateCache.put('home.html',
    "<div class=\"jumbotron\"><div class=\"container\"><ul class=\"alphabet\"><li ng-repeat=\"char in alphabet\"><span ng-click=\"filterByAlphabet(char)\">{{char}}</span></li></ul><ul class=\"genres\"><li ng-repeat=\"genre in genres\"><span ng-click=\"filterByGenre(genre)\">{{genre}}</span></li></ul></div></div><div class=\"container\"><div class=\"panel panel-default\"><div class=\"panel-heading\">{{headingTitle}}<div class=\"pull-right\"><input class=\"search\" type=\"text\" ng-model=\"query.name\" placeholder=\"Search...\"></div></div><div class=\"panel-body\"><div class=\"row show-list\"><div class=\"col-xs-4 col-md-3\" ng-repeat=\"show in shows | filter:query | orderBy:'rating':true\"><a ui-sref=\"main.shows({ id: show._id })\"><img class=\"img-rounded\" ng-src=\"{{show.poster}}\" width=\"100%\"></a><div class=\"text-center\"><a href=\"/shows/{{show._id}}\">{{show.name}}</a><p class=\"text-muted\">Episodes: {{show.episodes.length}}</p></div></div></div></div></div></div>"
  );


  $templateCache.put('login.html',
    "<div class=\"container\"><div class=\"row\"><div class=\"center-form panel\"><div class=\"panel-body\"><h2 class=\"text-center\">Login</h2><form method=\"post\" ng-submit=\"login()\" name=\"loginForm\"><div class=\"form-group\"><input class=\"form-control input-lg\" type=\"text\" name=\"email\" ng-model=\"email\" placeholder=\"Email\" required autofocus></div><div class=\"form-group\"><input class=\"form-control input-lg\" type=\"password\" name=\"password\" ng-model=\"password\" placeholder=\"Password\" required></div><button type=\"submit\" ng-disabled=\"loginForm.$invalid\" class=\"btn btn-lg btn-block btn-success\">Sign In</button></form></div></div></div></div>"
  );


  $templateCache.put('main.html',
    "<div ui-view=\"navbar\"></div><div ui-view=\"\"></div>"
  );


  $templateCache.put('signup.html',
    "<div class=\"container\"><br><div class=\"row\"><div class=\"center-form panel\"><form method=\"post\" ng-submit=\"signup()\" name=\"signupForm\"><div class=\"panel-body\"><h2 class=\"text-center\">Sign up</h2><div class=\"form-group\" ng-class=\"{ 'has-success' : signupForm.email.$valid && signupForm.email.$dirty, 'has-error' : signupForm.email.$invalid && signupForm.email.$dirty }\"><input class=\"form-control input-lg\" type=\"email\" id=\"email\" name=\"email\" ng-model=\"email\" placeholder=\"Email\" required autofocus><div class=\"help-block text-danger\" ng-if=\"signupForm.email.$dirty\" ng-messages=\"signupForm.email.$error\"><div ng-message=\"required\">Your email address is required.</div><div ng-message=\"email\">Your email address is invalid.</div></div></div><div class=\"form-group\" ng-class=\"{ 'has-success' : signupForm.password.$valid && signupForm.password.$dirty, 'has-error' : signupForm.password.$invalid && signupForm.password.$dirty }\"><input class=\"form-control input-lg\" type=\"password\" name=\"password\" ng-model=\"password\" placeholder=\"Password\" required><div class=\"help-block text-danger\" ng-if=\"signupForm.password.$dirty\" ng-messages=\"signupForm.password.$error\"><div ng-message=\"required\">Password is required.</div></div></div><div class=\"form-group\" ng-class=\"{ 'has-success' : signupForm.confirmPassword.$valid && signupForm.confirmPassword.$dirty, 'has-error' : signupForm.confirmPassword.$invalid && signupForm.confirmPassword.$dirty }\"><input class=\"form-control input-lg\" type=\"password\" name=\"confirmPassword\" ng-model=\"confirmPassword\" repeat-password=\"password\" placeholder=\"Confirm Password\" required><div class=\"help-block text-danger my-special-animation\" ng-if=\"signupForm.confirmPassword.$dirty\" ng-messages=\"signupForm.confirmPassword.$error\"><div ng-message=\"required\">You must confirm password.</div><div ng-message=\"repeat\">Passwords do not match.</div></div></div><button type=\"submit\" ng-disabled=\"signupForm.$invalid\" class=\"btn btn-lg btn-block btn-primary\">Create Account</button></div></form></div></div></div>"
  );


  $templateCache.put('navbar.html',
    "<div class=\"navbar navbar-default navbar-static-top\" role=\"navigation\" bs-navbar=\"\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"/\"><span class=\"glyphicon glyphicon-film\"></span> Show<strong>Tracker</strong></a></div><ul class=\"nav navbar-nav\"><li ch-nav=\"main.home\"><a ui-sref=\"main.home\">Home</a></li><li ch-nav=\"main.add\"><a ui-sref=\"main.add\">Add</a></li></ul><ul class=\"nav navbar-nav pull-right\" ng-if=\"!currentUser\"><li ch-nav=\"main.login\"><a ui-sref=\"main.login\">Login</a></li><li ch-nav=\"main.signup\"><a ui-sref=\"main.signup\">Sign up</a></li></ul><ul class=\"nav navbar-nav pull-right\" ng-if=\"currentUser\"><li class=\"navbar-text\" ng-bind=\"currentUser.email\"></li><li><a href=\"javascript:void(0)\" ng-click=\"logout()\">Logout</a></li></ul></div>"
  );

}]);

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