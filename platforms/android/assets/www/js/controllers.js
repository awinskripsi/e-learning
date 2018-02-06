angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  //pembagian beranda berdasarkan level
  $scope.beranda = false;
  if( sessionStorage.getItem('loggedin_level') === 'Siswa'){$scope.beranda = true;}
  $scope.beranda_p = false;
  if( sessionStorage.getItem('loggedin_level') === 'Pengajar'){$scope.beranda_p = true;}

  //pembagian tugas berdasarkan level
  $scope.tugas = false;
  if( sessionStorage.getItem('loggedin_level') === 'Siswa'){$scope.tugas = true;}
  $scope.tugas_p = false;
  if( sessionStorage.getItem('loggedin_level') === 'Pengajar'){$scope.tugas_p = true;}

  //pembagian materi berdasarkan level
  $scope.materi = false;
  if( sessionStorage.getItem('loggedin_level') === 'Siswa'){$scope.materi = true;}
  $scope.materi_p = false;
  if( sessionStorage.getItem('loggedin_level') === 'Pengajar'){$scope.materi_p = true;}

console.log('akses level =>', sessionStorage.getItem('loggedin_level'));
})

.controller('loginCtrl', function($scope,$http,$ionicPopup,$state,$ionicHistory){
    $scope.user = {}; //declare the object user

    $scope.login = function(){
        if ($scope.user.name && $scope.user.password){
            str="http://localhost/api_elearning/login.php?username="+$scope.user.name+"&password="+$scope.user.password;
            $http.get(str)
            .success(function(response){ //ji2ka login berhasil

              console.log(response);

             $scope.user_details = response[0];

                sessionStorage.setItem('loggedin_id', $scope.user_details.login_id);
                sessionStorage.setItem('loggedin_siswa', $scope.user_details.siswa_id);
                sessionStorage.setItem('loggedin_pengajar', $scope.user_details.pengajar_id);
                sessionStorage.setItem('loggedin_level', $scope.user_details.level);
                sessionStorage.setItem('loggedin_nis', $scope.user_details.nis);
                sessionStorage.setItem('loggedin_nama', $scope.user_details.nama);
                sessionStorage.setItem('loggedin_jenis_kelamin', $scope.user_details.jenis_kelamin);
                sessionStorage.setItem('loggedin_tempat_lahir', $scope.user_details.tempat_lahir);
                sessionStorage.setItem('loggedin_tgl_lahir', $scope.user_details.tgl_lahir);
                sessionStorage.setItem('loggedin_agama', $scope.user_details.agama);
                sessionStorage.setItem('loggedin_alamat', $scope.user_details.alamat);
                sessionStorage.setItem('loggedin_tahun_masuk', $scope.user_details.tahun_masuk);
                sessionStorage.setItem('loggedin_kelas', $scope.user_details.kelas_id);

               console.log('akses level =>', sessionStorage.getItem('loggedin_level'));

                $ionicPopup.alert({
                    title:"Login Successfull",
                    template:'<p style="text-align: center;">Halooo, admin '+$scope.user_details.nama+'</p>'
                });

                $ionicHistory.nextViewOptions({
                    disableAnimate : true,
                    disableBack : true
                });

                if ($scope.user_details.level === 'Pengajar'){
                  $state.go('app.beranda_p', [], {location: "replace", reload: true});
                }
                else if($scope.user_details.level === 'Siswa')  {
                  $state.go('app.beranda', [], {location: "replace", reload: true});
                }


            }).error(function(){
                var alertPopup = $ionicPopup.alert({
                    title: 'Login Failed',
                    template:'<p style="text-align:center;">Incorrect Username and Password</p>'
                });
                console.log(str);
            })
        }else {
            $ionicPopup.alert({
                title: 'WOW',
                template:'<p style="text-align:center;">Username and Password must be filled</p>'
            });
        }
    };
})

.controller('berandaCtrl', function($scope, $state, $ionicPopup, $http) {

  $scope.pengajar_id = sessionStorage.getItem('loggedin_pengajar');


  $http.get('http://localhost/api_elearning/getberanda_p.php?pengajar_id='+$scope.pengajar_id)
  .then(function(response){
    console.log(response);
    $scope.beranda = response.data;
  })

  $scope.detail=function(hari_nama, jam_mulai, jam_selesai, nama_mapel, nama, nama_kelas){
    sessionStorage.setItem('hari_nama', hari_nama);
    sessionStorage.setItem('jam_mulai', jam_mulai);
    sessionStorage.setItem('jam_selesai', jam_selesai);
    sessionStorage.setItem('nama_mapel', nama_mapel);
    sessionStorage.setItem('nama', nama);
    sessionStorage.setItem('nama_kelas', nama_kelas);
    $state.go('app.detailberanda_p',{},{reload:true});
  }
  angular.element(document).ready(function(){
    $scope.hari_nama = sessionStorage.getItem('hari_nama');
    $scope.jam_mulai = sessionStorage.getItem('jam_mulai');
    $scope.jam_selesai = sessionStorage.getItem('jam_selesai');
    $scope.nama_mapel = sessionStorage.getItem('nama_mapel');
    $scope.nama = sessionStorage.getItem('nama');
    $scope.nama_kelas = sessionStorage.getItem('nama_kelas');
  })
})

.controller('berandaCtrl_s', function($scope, $state, $ionicPopup, $http) {

  $scope.kelas_id = sessionStorage.getItem('loggedin_kelas');

  $http.get('http://localhost/api_elearning/gethari.php')
  .then(function(response){
    console.log('data hari',response);
    $scope.hari = response.data;
  })

  $scope.detail=function(hari_id, hari_nama, jam_mulai, jam_selesai, nama_mapel, nama, nama_kelas){
    // sessionStorage.setItem('id_pengumuman', pengumuman_id);
    sessionStorage.setItem('hari_id', hari_id);
    sessionStorage.setItem('jam_mulai', jam_mulai);
    sessionStorage.setItem('jam_selesai', jam_selesai);
    sessionStorage.setItem('nama_mapel', nama_mapel);
    sessionStorage.setItem('nama', nama);
    sessionStorage.setItem('nama_kelas', nama_kelas);
    $state.go('app.detailberanda',{},{reload:true});
  }
  angular.element(document).ready(function(){
    // $scope.pengumuman_id = sessionStorage.getItem('id_pengumuman');
    $scope.hari_id = sessionStorage.getItem('hari_id');

    $http.get('http://localhost/api_elearning/getberanda_s.php?kelas_id='+$scope.kelas_id+'&hari_id='+$scope.hari_id)
    .then(function(response){

      $scope.beranda_s = response.data;
      console.log('jadwal',$scope.beranda_s);

    })

    console.log('jadwal',$scope.beranda_s);

  })
})

// .controller('kelasCtrl', function($scope, $state, $ionicPopup, $http) {


.controller('pengumumanCtrl', function($scope, $state, $ionicPopup, $http) {
  $http.get('http://localhost/api_elearning/getpengumuman.php')
  .then(function(response){
    $scope.pengumuman = response.data;
  })
  $scope.detail=function(pengumuman_id, judul, konten, tgl_tam, file){
    sessionStorage.setItem('id_pengumuman', pengumuman_id);
    sessionStorage.setItem('judul', judul);
    sessionStorage.setItem('konten', konten);
    sessionStorage.setItem('tgl_tam', tgl_tam);
    sessionStorage.setItem('file', file);
    $state.go('app.detailpengumuman',{},{reload:true});
  }
  angular.element(document).ready(function(){
    $scope.pengumuman_id = sessionStorage.getItem('id_pengumuman');
    $scope.judul = sessionStorage.getItem('judul');
    $scope.konten = sessionStorage.getItem('konten');
    $scope.tgl_tam = sessionStorage.getItem('tgl_tam');
    $scope.file = sessionStorage.getItem('file');
  })
})

.controller('siswaCtrl', function($scope, $state, $ionicPopup, $http) {
  $http.get('http://localhost/api_elearning/getsiswa.php')
  .then(function(response){
    $scope.siswa = response.data;
  })

  $scope.detail=function(nis, nama, jenis_kelamin, tempat_lahir, tgl_l, agama, alamat, tahun_masuk, status_nama, nama_kelas){
    sessionStorage.setItem('nis', nis);
    sessionStorage.setItem('nama', nama);
    sessionStorage.setItem('jenis_kelamin', jenis_kelamin);
    sessionStorage.setItem('tempat_lahir', tempat_lahir);
    sessionStorage.setItem('tgl_l', tgl_l);
    sessionStorage.setItem('agama', agama);
    sessionStorage.setItem('alamat', alamat);
    sessionStorage.setItem('tahun_masuk', tahun_masuk);
    sessionStorage.setItem('status_nama', status_nama);
    sessionStorage.setItem('nama_kelas', nama_kelas);
    $state.go('app.detailsiswa',{},{reload:true});
  }
angular.element(document).ready(function(){
  $scope.nis = sessionStorage.getItem('nis');
  $scope.nama = sessionStorage.getItem('nama');
  $scope.jenis_kelamin = sessionStorage.getItem('jenis_kelamin');
  $scope.tempat_lahir = sessionStorage.getItem('tempat_lahir');
  $scope.tgl_l = sessionStorage.getItem('tgl_l');
  $scope.agama = sessionStorage.getItem('agama');
  $scope.alamat = sessionStorage.getItem('alamat');
  $scope.tahun_masuk = sessionStorage.getItem('tahun_masuk');
  $scope.status_nama = sessionStorage.getItem('status_nama');
  $scope.nama_kelas = sessionStorage.getItem('nama_kelas');
})
})

.controller('pengajarCtrl', function($scope, $state, $ionicPopup, $http) {
  $http.get('http://localhost/api_elearning/getpengajar.php')
  .then(function(response){
    $scope.pengajar = response.data;
  })

  $scope.detail=function(nuptk, nama, jenis_kelamin, tempat_lahir, tgl_l, alamat, status_nama, status_kg,
                          pend_terakhir, b_studi, tahun_masuk, masa_kerja){
    sessionStorage.setItem('nuptk', nuptk);
    sessionStorage.setItem('nama', nama);
    sessionStorage.setItem('jenis_kelamin', jenis_kelamin);
    sessionStorage.setItem('tempat_lahir', tempat_lahir);
    // sessionStorage.setItem('tgl_lahir', tgl_lahir);
    sessionStorage.setItem('tgl_l', tgl_l);
    sessionStorage.setItem('alamat', alamat);
    sessionStorage.setItem('status_nama', status_nama);
    sessionStorage.setItem('status_kg', status_kg);
    sessionStorage.setItem('pend_terakhir', pend_terakhir);
    sessionStorage.setItem('b_studi', b_studi);
    sessionStorage.setItem('tahun_masuk', tahun_masuk);
    sessionStorage.setItem('masa_kerja', masa_kerja);
    $state.go('app.detailpengajar',{},{reload:true});
  }
  angular.element(document).ready(function(){
    $scope.nuptk = sessionStorage.getItem('nuptk');
    $scope.nama = sessionStorage.getItem('nama');
    $scope.jenis_kelamin = sessionStorage.getItem('jenis_kelamin');
    $scope.tempat_lahir = sessionStorage.getItem('tempat_lahir');
    // $scope.tgl_lahir = sessionStorage.getItem('tgl_lahir');
    $scope.tgl_l = sessionStorage.getItem('tgl_l');
    $scope.alamat = sessionStorage.getItem('alamat');
    $scope.status_nama = sessionStorage.getItem('status_nama');
    $scope.status_kg = sessionStorage.getItem('status_kg');
    $scope.pend_terakhir = sessionStorage.getItem('pend_terakhir');
    $scope.b_studi = sessionStorage.getItem('b_studi');
    $scope.tahun_masuk = sessionStorage.getItem('tahun_masuk');
    $scope.masa_kerja = sessionStorage.getItem('masa_kerja');
  })
})

//TUGAS SISWA
  .controller('tugasCtrl', function($scope, $state, $ionicPopup, $http) {

    $scope.kelas_id = sessionStorage.getItem('loggedin_kelas');

    $http.get('http://localhost/api_elearning/gettugas.php?kelas_id='+$scope.kelas_id)
    .then(function(response){
      $scope.tugas = response.data;
      console.log('tugas',$scope.tugas);
    })

    $scope.detail=function(tugas_id, judul, konten,  tgl_buat, tgl_selesai, file, nama_mapel, nama, nama_kelas){
      sessionStorage.setItem('tugas_id', tugas_id);
      sessionStorage.setItem('judul', judul);
      sessionStorage.setItem('konten', konten);
      sessionStorage.setItem('tgl_buat', tgl_buat);
      sessionStorage.setItem('tgl_selesai', tgl_selesai);
      sessionStorage.setItem('file', file);
      sessionStorage.setItem('nama_mapel', nama_mapel);
      sessionStorage.setItem('nama', nama);
      sessionStorage.setItem('nama_kelas', nama_kelas);
      $state.go('app.detailtugas',{},{reload:true});
    }
    angular.element(document).ready(function(){
      $scope.tugas_id = sessionStorage.getItem('tugas_id');
      $scope.judul = sessionStorage.getItem('judul');
      $scope.konten = sessionStorage.getItem('konten');
      $scope.tgl_buat = sessionStorage.getItem('tgl_buat');
      $scope.tgl_selesai = sessionStorage.getItem('tgl_selesai');
      $scope.file = sessionStorage.getItem('file');
      $scope.nama_mapel = sessionStorage.getItem('nama_mapel');
      $scope.nama = sessionStorage.getItem('nama');
      $scope.nama_kelas = sessionStorage.getItem('nama_kelas');
    })
    })

    .controller('tugasjawabCtrl', function($scope, $state, $ionicPopup, $http) {

      $scope.tugas_id = sessionStorage.getItem('tugas_id');
      $scope.siswa_id = sessionStorage.getItem('loggedin_siswa');

      $http.get('http://localhost/api_elearning/getjawaban.php?tugas_id='+$scope.tugas_id+'&siswa_id='+$scope.siswa_id)
      .then(function(response){
        $scope.jawaban = response.data;
        console.log('jawaban',$scope.jawaban);
        })
    $scope.detailjawab=function(tugas_id, konten, tgl_bu, nama, file){
      sessionStorage.setItem('tugas_id', tugas_id);
      // sessionStorage.setItem('judul', judul);
      sessionStorage.setItem('konten', konten);
      sessionStorage.setItem('tgl_bu', tgl_bu);
      sessionStorage.setItem('file', file);
      sessionStorage.setItem('nama', nama);
      $state.go('app.jawabtugasdetail',{},{reload:true});
    }
    angular.element(document).ready(function(){
      $scope.tugas_id = sessionStorage.getItem('tugas_id');
      // $scope.judul = sessionStorage.getItem('judul');
      $scope.konten = sessionStorage.getItem('konten');
      $scope.tgl_bu = sessionStorage.getItem('tgl_bu');
      $scope.file = sessionStorage.getItem('file');
      $scope.nama = sessionStorage.getItem('nama');
    })
    })

    .controller('addJawabCtrl', function($scope, $state, $ionicPopup, $http) {

      $scope.tugas_id = sessionStorage.getItem('tugas_id');
      $scope.siswa_id = sessionStorage.getItem('siswa_id');

      $http.get('http://localhost/api_elearning/gettugasadd.php?tugas_id='+$scope.tugas_id)
      .then(function(response){
        $scope.tugas = response.data;
        console.log('jawab tugas_id',$scope.tugas);
      })

      $scope.form = {};
      $scope.insert=function(){

          var judul = $scope.form.judul;
          var konten = $scope.form.konten;
          var tgl_buat = $scope.form.tgl_buat;
          var tgl_selesai = $scope.form.tgl_selesai;
          var mapel = $scope.form.mapel;
          var pengajar = $scope.form.pengajar;
          var kelas = $scope.form.kelas;

          if(judul && konten && tgl_buat && tgl_selesai && mapel && pengajar && kelas){
              str = "http://192.168.137.1/api_elearning/addtugas.php?judul="+judul+"&konten="+konten+"&tgl_buat="+tgl_buat+"&tgl_selesai="+tgl_selesai+"&mapel_id="+mapel_id+"&pengajar_id="+pengajar_id+"&kelas_id="+kelas_id;
         $http.get(str)
         .success(function(response){
             if(response==true){
                 $ionicPopup.alert({
                     title: 'Tambah Data Berhasil',
                     template: 'Berhasil Hore'
                 });

                 $state.go('tugas',[],{location:"replace",reload:true});

             }else{
                 $ionicPopup.alert({
                     title: 'Tambah Data Gagal',
                     template: 'Gagal'
                 });
             }
         }).error(function(){
             $ionicPopup.alert({
                     title: 'Tambah Data Gagal',
                     template: 'Gagal Hore'
                 });
         })
       } else{
           $ionicPopup.alert({
                     title: 'Waduh',
                     template: 'Harus benar mengisi data'
                 });
       }

      };
    })

    //TUGAS PENGAJAR
    .controller('tugasCtrl_p', function($scope, $state, $ionicPopup, $http) {

      $scope.pengajar_id = sessionStorage.getItem('loggedin_pengajar');

      $http.get('http://localhost/api_elearning/gettugas.php')
      .then(function(response){
        $scope.tugas_p = response.data;
      })

      $scope.detail=function(judul, konten,  tgl_se, tgl_bu, tgl_buat, tgl_selesai, file, nama_mapel, nama, nama_kelas){
        sessionStorage.setItem('judul', judul);
        sessionStorage.setItem('konten', konten);
        sessionStorage.setItem('tgl_se', tgl_se);
        sessionStorage.setItem('tgl_bu', tgl_bu);
        sessionStorage.setItem('tgl_selesai', tgl_selesai);
        sessionStorage.setItem('tgl_buat', tgl_buat);
        sessionStorage.setItem('file', file);
        sessionStorage.setItem('nama_mapel', nama_mapel);
        sessionStorage.setItem('nama', nama);
        sessionStorage.setItem('nama_kelas', nama_kelas);
        $state.go('app.detailtugas',{},{reload:true});
      }
      angular.element(document).ready(function(){
        $scope.judul = sessionStorage.getItem('judul');
        $scope.konten = sessionStorage.getItem('konten');
        $scope.tgl_se = sessionStorage.getItem('tgl_se');
        $scope.tgl_bu = sessionStorage.getItem('tgl_bu');
        $scope.tgl_selesai = sessionStorage.getItem('tgl_selesai');
        $scope.tgl_buat = sessionStorage.getItem('tgl_buat');
        $scope.file = sessionStorage.getItem('file');
        $scope.nama_mapel = sessionStorage.getItem('nama_mapel');
        $scope.nama = sessionStorage.getItem('nama');
        $scope.nama_kelas = sessionStorage.getItem('nama_kelas');
      })
      })

      .controller('addTugasCtrl', function($scope, $state, $ionicPopup, $http) {
        $http.get('http://localhost/api_elearning/getmapel.php')
        .then(function(response){
          $scope.mapel = response.data;
          console.log($scope.mapel);
        })

        $http.get('http://localhost/api_elearning/getpengajar.php')
        .then(function(response){
          $scope.pengajar = response.data;
          console.log($scope.pengajar);
        })

        $http.get('http://localhost/api_elearning/getkelas.php')
        .then(function(response){
          $scope.kelas = response.data;
          console.log($scope.kelas);
        })

        $scope.form = {};
        $scope.insert=function(){

            var judul = $scope.form.judul;
            var konten = $scope.form.konten;
            var tgl_buat = $scope.form.tgl_buat;
            var tgl_selesai = $scope.form.tgl_selesai;
            var mapel = $scope.form.mapel;
            var pengajar = $scope.form.pengajar;
            var kelas = $scope.form.kelas;

            if(judul && konten && tgl_buat && tgl_selesai && mapel && pengajar && kelas){
                str = "http://192.168.137.1/api_elearning/addtugas.php?judul="+judul+"&konten="+konten+"&tgl_buat="+tgl_buat+"&tgl_selesai="+tgl_selesai+"&mapel_id="+mapel_id+"&pengajar_id="+pengajar_id+"&kelas_id="+kelas_id;
           $http.get(str)
           .success(function(response){
               if(response==true){
                   $ionicPopup.alert({
                       title: 'Tambah Data Berhasil',
                       template: 'Berhasil Hore'
                   });

                   $state.go('tugas',[],{location:"replace",reload:true});

               }else{
                   $ionicPopup.alert({
                       title: 'Tambah Data Gagal',
                       template: 'Gagal'
                   });
               }
           }).error(function(){
               $ionicPopup.alert({
                       title: 'Tambah Data Gagal',
                       template: 'Gagal Hore'
                   });
           })
         } else{
             $ionicPopup.alert({
                       title: 'Waduh',
                       template: 'Harus benar mengisi data'
                   });
         }

        };
      })

//   .controller('tugaseditCtrl', function($scope, $state, $ionicPopup, $http) {
//
//     $scope.kelas_id = sessionStorage.getItem('loggedin_kelas');
//
//   $http.get('http://localhost/api_elearning/gettugasedit.php')
//   .then(function(response){
//     $scope.tugasedit = response.data;
//   })
//   $scope.edittugas=function(judul, konten, tgl_se, tgl_bu, file, nama_mapel, nama, nama_kelas){
//     sessionStorage.setItem('judul', judul);
//     sessionStorage.setItem('konten', konten);
//     sessionStorage.setItem('tgl_se', tgl_se);
//     sessionStorage.setItem('tgl_bu', tgl_bu);
//     sessionStorage.setItem('file', file);
//     sessionStorage.setItem('nama_mapel', nama_mapel);
//     sessionStorage.setItem('nama', nama);
//     sessionStorage.setItem('nama_kelas', nama_kelas);
//     $state.go('app.edittugas',{},{reload:true});
//   }
//   angular.element(document).ready(function(){
//     $scope.judul = sessionStorage.getItem('judul');
//     $scope.konten = sessionStorage.getItem('konten');
//     $scope.tgl_se = sessionStorage.getItem('tgl_se');
//     $scope.tgl_bu = sessionStorage.getItem('tgl_bu');
//     $scope.file = sessionStorage.getItem('file');
//     $scope.nama_mapel = sessionStorage.getItem('nama_mapel');
//     $scope.nama = sessionStorage.getItem('nama');
//     $scope.nama_kelas = sessionStorage.getItem('nama_kelas');
//   })
// })

//MATERI SISWA
  .controller('materiCtrl', function($scope, $state, $ionicPopup, $http) {

    $scope.kelas_id = sessionStorage.getItem('loggedin_kelas');

    $http.get('http://localhost/api_elearning/getmateri.php?kelas_id='+$scope.kelas_id)
    .then(function(response){
      $scope.materi = response.data;
      console.log('materi show',$scope.materi);
    })

    $scope.detail=function(materi_id, judul, konten, tgl_post, file, nama_mapel, nama, nama_kelas){
      sessionStorage.setItem('materi_id', materi_id);
      sessionStorage.setItem('judul', judul);
      sessionStorage.setItem('konten', konten);
      sessionStorage.setItem('tgl_post', tgl_post);
      sessionStorage.setItem('file', file);
      sessionStorage.setItem('nama_mapel', nama_mapel);
      sessionStorage.setItem('nama', nama);
      sessionStorage.setItem('nama_kelas', nama_kelas);
      $state.go('app.detailmateri',{},{reload:true});
    }
    angular.element(document).ready(function(){
      $scope.materi_id = sessionStorage.getItem('materi_id');
      $scope.judul = sessionStorage.getItem('judul');
      $scope.konten = sessionStorage.getItem('konten');
      $scope.tgl_post = sessionStorage.getItem('tgl_post');
      $scope.file = sessionStorage.getItem('file');
      $scope.nama_mapel = sessionStorage.getItem('nama_mapel');
      $scope.nama = sessionStorage.getItem('nama');
      $scope.nama_kelas = sessionStorage.getItem('nama_kelas');
    })
    })

.controller('mapelCtrl', function($scope, $state, $ionicPopup, $http) {
  $http.get('http://localhost/api_elearning/getmapel.php')
  .then(function(response){
    $scope.mapel = response.data;
  })

})
