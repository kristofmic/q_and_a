(function(ch) {

  var
    definitions;

  definitions = [
    '$scope',
    'auth',
    SignupController
  ];

  ch.main.controller('SignupController', definitions);

  function SignupController($scope, auth) {
    $scope.signup = signup;

    function signup() {
      auth.signup({
        email: $scope.email,
        password: $scope.password
      });
    }
  }

})(ch);