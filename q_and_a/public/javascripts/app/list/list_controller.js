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