const APIVersion = 'v2/'
const basePath = '/api/'
const originURL = window.location.origin

let baseUrl = 'http://127.0.0.1:3000/api/v1/' 
angular
    .module('homeAutomationApp', [
        'ngAnimate',
        'ngCookies',
        'ngProgress',
        'ui.router',
        'treasure-overlay-spinner',
        'ngMaterial',
        'ngMessages',
        'ngMap',
        'ui.sortable',
        'infinite-scroll',
        'naif.base64',
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$qProvider', '$httpProvider', '$provide', '$locationProvider', '$logProvider',
        function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $qProvider, $httpProvider, $provide, $locationProvider, $logProvider) {
            console.log("inside config")
            $mdThemingProvider.theme('success-toast');
            $mdThemingProvider.theme('error-toast');
            $qProvider.errorOnUnhandledRejections(false);
            // $httpProvider.interceptors.push('interceptor');
            const register = {
                title: 'Register',
                name: 'register',
                url: '/register',
                controller: 'registerCtrl',
                templateUrl: 'views/registration.html',
                data : {
                    authorisation : false,
                    role : 'user',
                    showLoader : false
                },
            };
            const login = {
                title: 'Login',
                name: 'login',
                url: '/login',
                controller: 'loginCtrl',
                data : {
                    authorisation : false,
                    role : 'user',
                    showLoader : true
                },
                templateUrl: 'views/login.html'
            };

            const dashboard = {
                title: 'Dashboard',
                name: 'dashboard',
                url: '/dashboard',
                controller: 'dashboardCtrl',
                data : {
                    authorisation : false,
                    role : 'user',
                    showLoader : true
                },
                templateUrl: 'views/dashboard.html'
            };
            const addDevice = {
                title: 'addDevice',
                name: 'addDevice',
                url: '/addDevice',
                controller: 'addDeviceCtrl',
                data : {
                    authorisation : false,
                    role : 'user',
                    showLoader : true
                },
                templateUrl: 'views/addDevice.html'
            };
            $stateProvider.state(login);
            $stateProvider.state(register);
            $stateProvider.state(dashboard);
            $stateProvider.state(addDevice);
        }
    ])