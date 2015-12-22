var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {ConsolePrinter}
 */
var ConsolePrinter = AbstractComponent.extend({
    toString: 'ConsolePrinter',

    construct: function () {
        this.line = undefined;
        this.onInput = function () { /* noop */ };
    },

    in_input: function (msg) {
        var line = this.getName() + '>' + msg;
        this.line = msg;
        console.log(line);
        this.onInput();
    },

    uiController: function () {
        return ['$scope', '$timeout', 'instance', function ($scope, $timeout, instance) {
            $scope.line = instance.line;

            instance.onInput = function () {
                $timeout(function () {
                    $scope.line = instance.line;
                });
            };
        }];
    }
});

module.exports = ConsolePrinter;
