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