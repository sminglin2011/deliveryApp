/**
 * Created by sming on 05/02/2017.
 */

angular.module("deliveryApp").controller("deliveryOrderController", function($scope, $http, $routeParams, $document) {
    $scope.deliveryOrder = {};
    if (typeof ($routeParams.soNumber) != "undefined" && $routeParams.soNumber != '') {
        $http.get("http://ews-web.servebbs.com:8090/ewsoft/fetchOrderDelivery?soNumber=" + $routeParams.soNumber)
            .then(function(response){$scope.deliveryOrder = response.data; });
    }
    $scope.saveSign = function() {
        var datapair = $("#signature").jSignature("getData", "svgbase64")
        console.log(datapair);
        var i = new Image()
        i.src = "data:" + datapair[0] + "," + datapair[1]
        $(i).appendTo($("#img")) // append the image (SVG) to DOM.
    }
    $scope.saveCollectionSign = function() {
        var datapair = $("#signature").jSignature("getData", "svgbase64")
        console.log(datapair);
    }
    $scope.clearSign = function() {
        $("#signature").jSignature("clear");
    }

})