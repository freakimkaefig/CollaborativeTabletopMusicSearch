@extends('layout.main')

<?php
	$channel_row_class = 'home-channel col-xs-6 col-md-4 col-lg-3';
?>

@section('content')
	<ul id="home-channels" class="container-fluid">
		<!-- <h3>Sender:</h3> -->
		<li class="<?php print $channel_row_class ?>">
			<a href="{{URL::route('channel',array('DasErste'))}}">
				<div class="outer">
					<div class="inner">
						<img src="css/images/Das_Erste_2014.png" class="img-responsive col-xs-12" />
					</div>
				</div>
			</a>
		</li>
		<li class="<?php print $channel_row_class ?>">
			<a href="{{URL::route('channel',array('ZDF'))}}">
				<div class="outer">
					<div class="inner">
						<img src="css/images/ZDF.png" class="img-responsive col-xs-12" />
					</div>
				</div>
			</a>
		</li>
		<li class="<?php print $channel_row_class ?>">
			<a href="{{URL::route('channel',array('BR'))}}">
				<div class="outer">
					<div class="inner">
						<img src="css/images/br.png" class="img-responsive col-xs-12" />
					</div>
				</div>
			</a>
		</li>
		<li class="<?php print $channel_row_class ?>">
			<a href="{{URL::route('channel',array('Arte'))}}">
				<div class="outer">
					<div class="inner">
						<img src="css/images/Arte.png" class="img-responsive col-xs-12" />
					</div>
				</div>
			</a>
		</li>
		<li class="<?php print $channel_row_class ?>">
			<a href="{{URL::route('channel',array('SRF'))}}">
				<div class="outer">
					<div class="inner">
						<img src="css/images/srf.png" class="img-responsive col-xs-12" />
					</div>
				</div>
			</a>
		</li>
	</ul>
@stop