(function() {
	'use strict';

	var alerts = angular.module('drahak.alerts', []);
	alerts.value('alertsTTL', false);
	alerts.factory('$alert', ['$rootScope', function($rootScope) {

		/**
		 * @param {String} message
		 * @param {String} type
		 * @param {ng.$rootScope.Scope} scope
		 * @constructor
		 */
		var Alert = function(message, type, scope) {
			this.type = type || 'success';
			this.message = message;

			this._scope = scope;
			this._scope.$broadcast('$alert:add', this);
		};

		/**
		 * Removes alert
		 * @returns {Alert} self
		 */
		Alert.prototype.remove = function() {
			this._scope.$broadcast('$alert:remove', this);
			return this;
		};

		var AlertFactory = function(message, type) {
			return new Alert(message, type, $rootScope);
		};

		AlertFactory.removeAll = function() {
			$rootScope.$broadcast('$alert:remove');
		};

		return AlertFactory;
	}]);

	alerts.directive('alerts', ['alertsTTL', function(alertsTTL) {
		return {
			scope: {},
			replace: true,
			restrict: 'AE',
			templateUrl: 'drahak/alerts.html',
			link: function(scope) {

				/** @type {Array.<Alert>} */
				scope.alerts = [];

				/** @type {{ ttl: Number }} */
				scope.options = {
					ttl: alertsTTL
				};

				/**
				 * Close alert
				 * @param {Number} index
				 */
				scope.close = function(index) {
					scope.alerts.splice(index, 1);
				};

				scope.$on('$alert:add', function(evt, alert) {
					scope.alerts.push(alert);
				});
				scope.$on('$alert:remove', function(evt, alert) {
					if (!alert) {
						scope.alerts.length = 0;
					} else {
						scope.close(scope.alerts.indexOf(alert));
					}
				});
			}
		}
	}]);

	alerts.directive('alert', ['$timeout', function($timeout) {
		return {
			scope: {
				close: '&',
				type: '@',
				ttl: '@'
			},
			replace: true,
			transclude: true,
			restrict: 'AE',
			templateUrl: 'drahak/alert.html',
			link: function(scope) {
				if (scope.ttl > 0) {
					$timeout(scope.close, scope.ttl);
				}
			}
		}
	}]);

})();