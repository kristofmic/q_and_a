(function(edit) {

  var
    definitions;

  definitions = [
    '$scope',
    'qasFactory',
    editController
  ];

  edit.controller('editController', definitions);

  function editController($scope, qasFactory) {
    $scope.submit = submit;

    function submit() {
      qasFactory.create({
        question: $scope.question,
        answer: $scope.answer
      })
      .finally(clearForm);
    }

    function clearForm() {
      $scope.question = undefined;
      $scope.answer = undefined;
    }
  }

})(window.ch.edit);