(function(ch) {

  var
    definitions;

  definitions = [
    '$scope',
    'auth',
    LoginController
  ];

  ch.main.controller('LoginController', definitions);

  function LoginController($scope, auth) {
    $scope.login = function() {
      auth.login({
        email: $scope.email,
        password: $scope.password
      });
    };
  }

})(ch);