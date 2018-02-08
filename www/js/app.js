// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ion-datetime-picker'])

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
    // cache: false,
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
    // cache: false,
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.beranda', {
    // cache: false,
    url: '/beranda',
    views: {
      'menuContent': {
        templateUrl: 'templates/beranda.html',
        controller: 'berandaCtrl_s'
      }
    }
  })

  .state('app.detailberanda', {
    // cache: false,
    url: '/berandadetail',
    views: {
      'menuContent': {
        templateUrl: 'templates/berandadetail.html',
        controller: 'berandaCtrl_s'
      }
    }
  })

  .state('app.beranda_p', {
    // cache: false,
    url: '/beranda_p',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajartempl/beranda_p.html',
        controller: 'berandaCtrl'
      }
    }
  })

  .state('app.detailberanda_p', {
    // cache: false,
    url: '/berandadetail_p',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajartempl/berandadetail_p.html',
        controller: 'berandaCtrl'
      }
    }
  })

  .state('app.pengumuman', {
    // cache: false,
    url: '/pengumuman',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengumuman.html',
        controller: 'pengumumanCtrl'
      }
    }
  })

  .state('app.detailpengumuman', {
    // cache: false,
    url: '/detailpengumuman',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengumumandetail.html',
        controller: 'pengumumanCtrl'
      }
    }
  })

  .state('app.siswa', {
    // cache: false,
    url: '/siswa',
    views: {
      'menuContent': {
        templateUrl: 'templates/siswa.html',
        controller: 'siswaCtrl'
      }
    }
  })

  .state('app.detailsiswa', {
    // cache: false,
    url: '/detailsiswa',
    views: {
      'menuContent': {
        templateUrl: 'templates/siswadetail.html',
        controller: 'siswaCtrl'
      }
    }
  })


  .state('app.pengajar', {
    // cache: false,
    url: '/pengajar',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajar.html',
        controller: 'pengajarCtrl'
      }
    }
  })

  .state('app.detailpengajar', {
    // cache: false,
    url: '/detailpengajar',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajardetail.html',
        controller: 'pengajarCtrl'
      }
    }
  })

  .state('app.tugas', {
    // cache: false,
    url: '/tugas',
    views: {
      'menuContent': {
        templateUrl: 'templates/tugas.html',
        controller: 'tugasCtrl'
      }
    }
  })

  .state('app.detailtugas', {
    // cache: false,
    url: '/detailtugas',
    views: {
      'menuContent': {
        templateUrl: 'templates/tugasdetail.html',
        controller: 'tugasCtrl'
      }
    }
  })

  .state('app.addtugas', {
    // cache: false,
    url: '/addtugas',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajartempl/tugasadd.html',
        controller: 'addTugasCtrl'
      }
    }
  })

  .state('app.edittugas', {
    // cache: false,
    url: '/edittugas',
    views: {
      'menuContent': {
        templateUrl: 'templates/tugasedit.html',
        controller: 'tugaseditCtrl'
      }
    }
  })

  .state('app.jawabtugas', {
    // cache: false,
    url: '/jawabtugas',
    views: {
      'menuContent': {
        templateUrl: 'templates/tugasjawab.html',
        controller: 'tugasjawabCtrl'
      }
    }
  })

  .state('app.jawabtugasdetail', {
    // cache: false,
    url: '/jawabtugasdetail',
    views: {
      'menuContent': {
        templateUrl: 'templates/tugasjawabdetail.html',
        controller: 'tugasjawabCtrl'
      }
    }
  })

  .state('app.jawabupload', {
    // cache: false,
    url: '/jawabupload',
    views: {
      'menuContent': {
        templateUrl: 'templates/jawabupload.html'
        // controller: 'jawabuploadCtrl'
      }
    }
  })

  .state('app.jawabadd', {
    // cache: false,
    url: '/jawabadd',
    views: {
      'menuContent': {
        templateUrl: 'templates/jawabadd.html',
        controller: 'addJawabCtrl'
      }
    }
  })

  .state('app.tugas_p', {
    // cache: false,
    url: '/tugas_p',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajartempl/tugas_p.html',
        controller: 'tugasCtrl_p'
      }
    }
  })

  .state('app.detailtugas_p', {
    // cache: false,
    url: '/detailtugas_p',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajartempl/tugasdetail_p.html',
        controller: 'tugasCtrl_p'
      }
    }
  })

  .state('app.jawabtugas_p', {
    // cache: false,
    url: '/jawabtugas_p',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajartempl/tugasjawab_p.html',
        controller: 'tugasjawabCtrl_p'
      }
    }
  })

  .state('app.tugasupload', {
    // cache: false,
    url: '/tugasupload',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajartempl/tugasupload.html'
      }
    }
  })

  .state('app.materi', {
    // cache: false,
    url: '/materi',
    views: {
      'menuContent': {
        templateUrl: 'templates/materi.html',
        controller: 'materiCtrl'
      }
    }
  })

  .state('app.detailmateri', {
    // cache: false,
    url: '/detailmateri',
    views: {
      'menuContent': {
        templateUrl: 'templates/materidetail.html',
        controller: 'materiCtrl'
      }
    }
  })

  .state('app.materikomen', {
    // cache: false,
    url: '/materikomen',
    views: {
      'menuContent': {
        templateUrl: 'templates/materikomen.html',
        controller: 'materikomenCtrl'
      }
    }
  })

  .state('app.komenadd', {
    // cache: false,
    url: '/komenadd',
    views: {
      'menuContent': {
        templateUrl: 'templates/komenadd.html',
        controller: 'addkomenCtrl'
      }
    }
  })

  .state('app.materi_p', {
    // cache: false,
    url: '/materi_p',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajartempl/materi_p.html',
        controller: 'materiCtrl_p'
      }
    }
  })

  .state('app.detailmateri_p', {
    // cache: false,
    url: '/detailmateri_p',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajartempl/materidetail_p.html',
        controller: 'materiCtrl_p'
      }
    }
  })
  //
  // .state('app.materikomen', {
  //   url: '/materikomen',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/materikomen.html',
  //       controller: 'materikomenCtrl'
  //     }
  //   }
  // })

  .state('app.addmateri', {
    // cache: false,
    url: '/addmateri',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajartempl/materiadd.html',
        controller: 'addMateriCtrl'
      }
    }
  })

  .state('app.biodata', {
    // cache: false,
    url: '/biodata',
    views: {
      'menuContent': {
        templateUrl: 'templates/biodata.html',
        controller: 'bioCtrl'
      }
    }
  })

  .state('app.biodata_p', {
    // cache: false,
    url: '/biodata_p',
    views: {
      'menuContent': {
        templateUrl: 'templates/pengajartempl/biodata_p.html',
        controller: 'bioCtrl_p'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
