'use strict';


angular.module('homeAutomationApp')
    .controller('registerCtrl', ['$scope', '$rootScope', '$state', 'ngProgressFactory','registerService','commonService',
        function ($scope, $rootScope, $state, ngProgressFactory,registerService, commonService) {
            console.log("inside looooooooooooooooooooooo")
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $scope.buttonTextVisiblity = 'visible';
            
            $scope.registration = () => {
                console.log("inside regstration")
                const obj = {
                    'first_name': $scope.first_name,
                    'last_name': $scope.last_name,
                    'email': $scope.email,
                    'password': $scope.password
                };
                registerService.register(obj).then(result =>{
                    console.log("")
                    commonService.successToast('Registration Successfull');
                    $state.go('dashboard');
                }).catch(error =>{
                    console.log(error)
                    commonService.errorToast('Something went wrong. Try later.');
                })
            }
        }
    ]);