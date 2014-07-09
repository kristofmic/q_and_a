(function(list) {

  var
    definitions;

  definitions = [
    '$scope',
    'qas',
    listController
  ];

  list.controller('listController', definitions);

  function listController($scope, qas) {
    $scope.qas = qas;
  }

})(window.ch.list);