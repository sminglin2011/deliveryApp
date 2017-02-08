/**
 * Created by sming on 05/02/2017.
 */
angular.module("deliveryApp").controller("deliveryOrderListCtrl", function($scope, $http, $filter) {
    $scope.vehicleList = [];
    $http.get("http://ews-web.servebbs.com:8090/ewsoft/deliveryAppLogin").then(function(response){$scope.vehicleList = response.data})
    $scope.deliveryOrderList = [];
    $scope.collectionOrderList = [];
    $http.get("http://ews-web.servebbs.com:8090/ewsoft/fetchOrderDeliveryList?vehicleNo="+$scope.vehicle)
        .then(function (response) {if(response.data != null && response.data != '')$scope.deliveryOrderList=response.data });
    $http.get("http://ews-web.servebbs.com:8090/ewsoft/fetchOrderCollectionList?vehicleNo="+$scope.vehicle)
        .then(function (response) {if(response.data != null && response.data != '')$scope.collectionOrderList=response.data });
})