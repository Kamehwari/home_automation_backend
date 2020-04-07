'use strict';


angular.module('homeAutomationApp')
    .controller('dashboardCtrl', ['$scope', '$rootScope', '$state', 'ngProgressFactory','registerService','commonService',
        function ($scope, $rootScope, $state, ngProgressFactory,registerService, commonService) {
            console.log("inside looooooooooooooooooooooo")
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $scope.buttonTextVisiblity = 'visible';
            
            // $scope.devices = [{
            //     "name":"Light",
            //     "status":"off",
            // },{
            //     "name":"Fridge",
            //     "status":"off",
            // },{
            //     "name":"TV",
            //     "status":"on"
            // },{
            //     "name":"TV",
            //     "status":"on"
            // }]

            registerService.getDevices($rootScope.email).then(result =>{
                console.log("////////", result.data.data.devices)
                if(result.data.data.status){
                    commonService.successToast(result.data.message);
                    $scope.devices = result.data.data.devices;
                    console.log("$scope.devices", $scope.devices)
                }else{
                    commonService.errorToast(result.data.data.error);
                }
            }).catch(error =>{
                console.log(error)
                commonService.errorToast('Something went wrong. Try later.');
            })               
            
            $scope.deleteDevice =(deviceId)=>{
                registerService.deleteDevice(deviceId).then(result =>{
                    console.log(result.data.data.status)
                    if(result.data.data.status){
                        commonService.successToast(result.data.message);
                        registerService.getDevices($rootScope.email).then(result =>{
                            if(result.data.data.status){
                                $scope.devices = result.data.data.devices;
                            }else{
                                commonService.errorToast(result.data.data.error);
                            }
                        })
                    }else{
                        commonService.errorToast(result.data.data.error);
                    }
                }).catch(error =>{
                    console.log(error)
                    commonService.errorToast('Something went wrong. Try later.');
                })  
            }

            $scope.updateDevice = (deviceId, state)=>{
                if(state == "on"){
                    state = "off"
                }else if(state=="off"){
                    state = "on"
                }
                registerService.updateDevice({"device_id":deviceId, "state":state}).then(result =>{
                    if(result.data.data.status){
                        commonService.successToast(result.data.message);
                        registerService.getDevices($rootScope.email).then(result =>{
                            if(result.data.data.status){
                                $scope.devices = result.data.data.devices;
                            }else{
                                commonService.errorToast(result.data.data.error);
                            }
                        })
                    }else{
                        commonService.errorToast(result.data.data.error);
                    }
                })
            }
        }
    ]);