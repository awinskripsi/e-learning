// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl',

    resolve :{
     "check":function($location){
       if(sessionStorage.getItem('loggedin_id')){
         $location.path('/beranda');
       }else{
         $location.path('/login');
       }
     }
   }

  })

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.beranda', {
    url: '/beranda',
    views: {
      'menuContent': {
        templateUrl: 'templates/beranda.html',
        controller: 'berandaCtrl_s'
      }
    }
  })

  .state('app.detailberanda', {
    url: '/berandadetail',
    views: {
      'menuContent': {
        templateUrl: 'templates/berandadetail.html',
        controller: 'berandaCtrl_s'
      }
    }
  })

  .state('app.beranda_p', {
    url: '/beranda_p',
    views: {
      'menuContent': {
        templateUrl: 'templates/beranda_p.html',
        controller: 'berandaCtrl'
      }
    }
  })

  .state('app.detailberanda_p', {
    url: '/berandadetail_p',
    views: {
      'menuContent': {
        templateUrl: 'templates/berandadetail_p.html',
        controller: 'berandaCtrl'
      }
    }
  })

  .state('app.pengumuman', {
    url: '/pengumuman',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengumuman.html',
        controller: 'pengumumanCtrl'
      }
    }
  })

  .state('app.detailpengumuman', {
    url: '/detailpengumuman',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengumumandetail.html',
        controller: 'pengumumanCtrl'
      }
    }
  })

  .state('app.siswa', {
    url: '/siswa',
    views: {
      'menuContent': {
        templateUrl: 'templates/siswa.html',
        controller: 'siswaCtrl'
      }
    }
  })

  .state('app.detailsiswa', {
    url: '/detailsiswa',
    views: {
      'menuContent': {
        templateUrl: 'templates/siswadetail.html',
        controller: 'siswaCtrl'
      }
    }
  })

  .state('app.pengajar', {
    url: '/pengajar',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajar.html',
        controller: 'pengajarCtrl'
      }
    }
  })

  .state('app.detailpengajar', {
    url: '/detailpengajar',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajardetail.html',
        controller: 'pengajarCtrl'
      }
    }
  })

  .state('app.tugas', {
    url: '/tugas',
    views: {
      'menuContent': {
        templateUrl: 'templates/tugas.html',
        controller: 'tugasCtrl'
      }
    }
  })

  .state('app.detailtugas', {
    url: '/detailtugas',
    views: {
      'menuContent': {
        templateUrl: 'templates/tugasdetail.html',
        controller: 'tugasCtrl'
      }
    }
  })

  .state('app.addtugas', {
    url: '/addtugas',
    views: {
      'menuContent': {
        templateUrl: 'templates/tugasadd.html',
        controller: 'addTugasCtrl'
      }
    }
  })

  .state('app.edittugas', {
    url: '/edittugas',
    views: {
      'menuContent': {
        templateUrl: 'templates/tugasedit.html',
        controller: 'tugaseditCtrl'
      }
    }
  })

  .state('app.jawabtugas', {
    url: '/jawabtugas',
    views: {
      'menuContent': {
        templateUrl: 'templates/tugasjawab.html',
        controller: 'tugasjawabCtrl'
      }
    }
  })

  .state('app.jawabtugasdetail', {
    url: '/jawabtugasdetail',
    views: {
      'menuContent': {
        templateUrl: 'templates/tugasjawabdetail.html',
        controller: 'tugasjawabCtrl'
      }
    }
  })

  .state('app.jawabadd', {
    url: '/jawabadd',
    views: {
      'menuContent': {
        templateUrl: 'templates/jawabadd.html',
        controller: 'addJawabCtrl'
      }
    }
  })

  .state('app.tugas_p', {
    url: '/tugas_p',
    views: {
      'menuContent': {
        templateUrl: 'templates/tugas_p.html',
        controller: 'tugasCtrl_p'
      }
    }
  })

  .state('app.detailtugas_p', {
    url: '/detailtugas_p',
    views: {
      'menuContent': {
        templateUrl: 'templates/tugasdetail_p.html',
        controller: 'tugasCtrl_p'
      }
    }
  })

  .state('app.jawabtugas_p', {
    url: '/jawabtugas_p',
    views: {
      'menuContent': {
        templateUrl: 'templates/tugasjawab_p.html',
        controller: 'tugasCtrl'
      }
    }
  })

  .state('app.materi', {
    url: '/materi',
    views: {
      'menuContent': {
        templateUrl: 'templates/materi.html',
        controller: 'materiCtrl'
      }
    }
  })

  .state('app.detailmateri', {
    url: '/detailmateri',
    views: {
      'menuContent': {
        templateUrl: 'templates/materidetail.html',
        controller: 'materiCtrl'
      }
    }
  })

  .state('app.addmateri', {
    url: '/addmateri',
    views: {
      'menuContent': {
        templateUrl: 'templates/materiadd.html',
        controller: 'materiCtrl'
      }
    }
  })

  .state('app.biodata', {
    url: '/biodata',
    views: {
      'menuContent': {
        templateUrl: 'templates/biodata.html'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
