var AbstractComponent = require('kevoree-entities').AbstractComponent;

/**
 * Kevoree component
 * @type {ConsolePrinter}
 */
var ConsolePrinter = AbstractComponent.extend({
    toString: 'ConsolePrinter',

    construct: function () {
        this.lines = [];
        this.onInput = function () { /* noop */ };
    },

    in_input: function (msg) {
        var line = this.getName() + '>' + msg;
        this.lines.push(msg);
        console.log(line);
        this.onInput();
    },

    uiController: function () {
        return ['$scope', '$timeout', 'instance', function ($scope, $timeout, instance) {
            $scope.lines = instance.lines;

            instance.onInput = function () {
                $timeout(function () {
                    $scope.lines = instance.lines;
                });
            };
        }];
    }
});

module.exports = ConsolePrinter;
