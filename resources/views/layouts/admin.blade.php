<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ADVentas | www.incanatoit.com</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
     <link rel="stylesheet" href="{{asset('css/bootstrap.css')}}">
    <!-- datatables  -->
    <link rel="stylesheet" href="{{asset('css/datatables.css')}}">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{asset('css/font-awesome.css')}}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{asset('css/AdminLTE.css')}}">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="{{asset('css/_all-skins.min.css')}}">

    <link rel="stylesheet" href="{{asset('css/estilosApp.css')}}">

    @section('css')

     @show

  </head>
  <body class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">

      <header class="main-header">

        <!-- Logo -->
        <a href="/" class="logo">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini"><b>AGENCE</b></span>
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg"><b><img src="{{asset('images/logo.gif')}}"></b></span>
        </a>

        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top" role="navigation">
          <!-- Sidebar toggle button-->
          <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Navegación</span>
          </a>
          <!-- Navbar Right Menu -->
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <!-- Messages: style can be found in dropdown.less-->
              
              <!-- User Account: style can be found in dropdown.less -->
              <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <span class="hidden-xs">JAlexander Jose Leon Lopez</span>
                </a>
                <ul class="dropdown-menu">
                  <!-- User image -->
                  <li class="user-header">
                    
                    <p>
                      Desarrollando Software de prueba AGENCE
                    </p>
                  </li>
                  
                  <!-- Menu Footer-->
                  <li class="user-footer">
                    
                    <div class="pull-right">
                      <a href="#" class="btn btn-default btn-flat">Cerrar</a>
                    </div>
                  </li>
                </ul>
              </li>
              
            </ul>
          </div>

        </nav>
      </header>
      <!-- Left side column. contains the logo and sidebar -->
      <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
          <!-- Sidebar user panel -->
                    
          <!-- sidebar menu: : style can be found in sidebar.less -->
          <ul class="sidebar-menu">
            <li class="header"></li>
            
          
            <li>
              <a href="consultor"><i class="fa fa-user"></i> <span>Consultor</span></a>
            </li>
            
            <li>
              <a href="#">
                <i class="fa fa-folder"></i> <span>Proyectos</span>
              </a>
            </li>
                       
             <li>
              <a href="#">
                <i class="fa fa-list-ul"></i> <span>Administrativo</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-shopping-cart"></i> <span>Comercial</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-area-chart"></i> <span>Financiero</span>
              </a>
            </li>
                        
          </ul>
        </section>
        <!-- /.sidebar -->
      </aside>





       <!--Contenido-->
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        
        <!-- Main content -->
        <section class="content">
          
          <div class="row">
            <div class="col-md-12">
              <div class="box">
                <div class="box-header with-border">
                  <h3 class="box-title">Sistema de <span class="logo-lg"><b><img src="{{asset('images/logo.gif')}}"></b></span></h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>

                  </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="row">
                      <div class="col-md-12">
                              <!--Contenido-->
                              @yield('contenido')
                              <!--Fin Contenido-->
                           </div>
                        </div>
                        
                      </div>
                    </div><!-- /.row -->
                </div><!-- /.box-body -->
              </div><!-- /.box -->
            </div><!-- /.col -->
          </div><!-- /.row -->

        </section><!-- /.content -->
      </div><!-- /.content-wrapper -->
      <!--Fin-Contenido-->
      <footer class="main-footer">
        <div class="pull-right hidden-xs">
          <b>Version</b> 2.3.0
        </div>
        <strong>Copyright &copy; 2015-2020 <a href="www.incanatoit.com">IncanatoIT</a>.</strong> All rights reserved.
      </footer>

      <!-- jQuery 2.1.4 -->
      {!!Html::script('js/jQuery-2.1.4.min.js')!!}
           <!-- Datatables-->
      {!!Html::script('js/datatables.js')!!}
      <!-- AdminLTE App -->
      {!!Html::script('js/app.min.js')!!}
      <!-- Validate -->
      {!!Html::script('js/validate.min.js')!!}
  
    
     @yield('scripts')


  </body>
</html>
