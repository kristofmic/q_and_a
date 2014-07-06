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