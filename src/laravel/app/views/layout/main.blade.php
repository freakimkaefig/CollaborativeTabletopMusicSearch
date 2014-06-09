<!DOCTYPE html>
<html>
	<head>
		<title>Mediathek Crawler</title>
	</head>
	<body>
		@if(Session::has('global'))
			<div class="messages">{{ Session::get('global') }}</div>
		@endif
			
		@include('layout.header')
		@yield('content')
	</body>
</html>