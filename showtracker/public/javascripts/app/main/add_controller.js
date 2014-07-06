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