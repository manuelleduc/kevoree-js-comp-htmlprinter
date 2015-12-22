var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {ConsolePrinter}
 */
var WebPrinter = AbstractComponent.extend({
    toString: 'WebPrinter',

    construct: function () {
        this.line = undefined;
        this.onInput = function () { /* noop */ };
    },

    in_input: function (msg) {
        this.line = msg;
        this.onInput();
    },

    uiController: function () {
        return ['$scope', '$timeout', '$sce', 'instance', function ($scope, $timeout, instance) {
            $scope.line = instance.line;
            self.explicitlyTrustedHtml = $sce.trustAsHtml($scope.line);

            instance.onInput = function () {
                $timeout(function () {
                    $scope.line = instance.line;
                    self.explicitlyTrustedHtml = $sce.trustAsHtml($scope.line);
                });
            };
        }];
    }
});

module.exports = WebPrinter;
