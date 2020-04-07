'use strict';


angular.module('homeAutomationApp')
    .controller('loginCtrl', ['$scope', '$rootScope', '$state', 'ngProgressFactory','registerService','commonService',
        function ($scope, $rootScope, $state, ngProgressFactory,registerService, commonService) {
            console.log("inside looooooooooooooooooooooo")
            $scope.buttonTextVisiblity = 'visible';
            
            $scope.login = () => {
                $rootScope.pageAnimationClass = 'slideNext';
                $scope.overlayActive = true;
                $scope.buttonTextVisiblity = 'hidden';
                $scope.progressbar = ngProgressFactory.createInstance();
                $scope.progressbar.start();
                console.log("scope value", $scope)
                const obj = {
                    'email': $scope.email,
                    'password': $scope.password
                };
                registerService.login(obj).then(result =>{
                    console.log("////////", result.data.data.status, result.data.data.data._id)
                    if(result.data.data.status){
                        commonService.successToast(result.data.message);
                        $rootScope.email = $scope.email
                        $rootScope.user_id = result.data.data.data._id
                        $state.go('dashboard');
                    }else{
                        commonService.errorToast(result.data.data.error);
                    }
                }).catch(error =>{
                    console.log(error)
                    commonService.errorToast('Something went wrong. Try later.');
                })               
            }
        }
    ]);