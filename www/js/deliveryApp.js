/**
 * Created by sming on 05/02/2017.
 */
angular.module("deliveryApp", ["ngRoute", 'ng-WdatePicker']).config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "delivery-order-list.html",
            controller : "deliveryOrderListCtrl"
        })
        .when("/photo", {
            templateUrl: "appCam.html"
        })
        .when("/deliveryOrder/:soNumber", {
            templateUrl : "order-delivery-details.html"
        })
        .when("/collectionOrderList", {
            templateUrl : "collection-order-list.html"
        })
        .when("/collectionOrder/:soNumber", {
            templateUrl : "order-collection-details.html"
        });
})
