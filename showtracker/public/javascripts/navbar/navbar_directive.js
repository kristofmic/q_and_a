(function() {

  ch.navbar.directive('chNav', [function() {

    return {
      restrict: 'AC',
      link: linker,
      scope: {
        state: '@chNav'
      }
    };

    function linker(scope, element, attrs) {
      scope.$on('$stateChangeSuccess', setActiveNav);

      function setActiveNav(event, toState, toParams, fromState, fromParams) {
        if (toState.name === scope.state) {
          element.addClass('active');
        }
        else {
          element.removeClass('active');
        }
      }
    }

  }]);

}(ch));