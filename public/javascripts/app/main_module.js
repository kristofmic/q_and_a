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