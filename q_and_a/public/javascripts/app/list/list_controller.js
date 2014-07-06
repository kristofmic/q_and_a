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