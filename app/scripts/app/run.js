angular.module('homeAutomationApp')
    .run(['$rootScope', '$state',  '$window',
        function ($rootScope, $state, $window) {

            // if(window.location.hostname == "localhost"){
            //     window['ga-disable-UA-96244170-1'] = true;
            // }
            
            // $window.ga('create', 'UA-96244170-1', 'auto');
            
            // $window.addEventListener("online", () => {
            //     $("#checkInternet").hide();
            // }, true);

            // $window.addEventListener("offline", () => {
            //     $("#checkInternet").show();
            // }, true);

            // $rootScope.$on('tokenexpired', () => {
            //     if(userStore.isUserDataPresent){
            //         commonService.errorToast("Session expired. Please login again.")
            //     }
            //     headerService.logoutProceedToken(false);
            //     userStore.clear();
            // });

            // $rootScope.$on('reloadpage',() => {
            //     if(!$state.current.name != 'update'){
            //         $state.go('update');
            //     }
            // })

            // $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
            //     angular.element('.v2-app').css('opacity', '1');
            //     angular.element('.loaderClass').removeClass('loadCQ');

            //     $rootScope.stateName = toState.name;
            //     if (window.location.origin.includes("wealthquotient")) {
            //         document.title = 'WealthQuotient - ' + toState.title;
            //     } else {
            //         document.title = 'CapitalQuotient - ' + toState.title;
            //     }
            //     $window.ga('send', 'pageview', $state.current.name);
            // });

            // $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
            //     if(toState.data && toState.data.showLoader){
            //         angular.element('.v2-app').css('opacity', '0');
            //         angular.element('.loaderClass').addClass('loadCQ');
            //     }else if (fromState.url.includes('v2')){
            //         angular.element('.v2-app').css('opacity', '0');
            //         angular.element('.loaderClass').addClass('loadCQ');
            //     }
            //     if((!toState.data || !toState.data.authorisation) && toState.name !="update"){
            //         userStore.clear();
            //         headerService.clearCookies();
            //     }else if(toState.data && !authenticationService.isAuthorised(toState.data)){
            //         if(toState.data.role == 'user'){
            //             userStore.clear();
            //             headerService.logoutProceedToken(false);
            //         }else{
            //             userStore.clear();
            //             adminService.logoutProceedToken();
            //         }
            //         return
            //     }
            // });

            $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
                $state.go("update")
            })

        }
    ])