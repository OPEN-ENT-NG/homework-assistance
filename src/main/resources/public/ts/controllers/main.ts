import {idiom, model, ng, template} from 'entcore';
import rights from "../rights";

export const mainController = ng.controller('MainController', ['$scope', 'route',
    ($scope, route) => {
    $scope.structure = {
        id: '',
        name: ''
    };

    route({
        home: () => {
            template.open('main', `containers/home`);
        }
    });

    $scope.lang = idiom;
    $scope.template = template;

    $scope.safeApply = function (fn?) {
        const phase = $scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            $scope.$apply(fn);
        }
    };

    $scope.hasRight = function (right: string) {
        return model.me.hasWorkflow(rights.workflow[right]);
    };

}]);
