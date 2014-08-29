@extends('layout.main')
<?php
	$category_row_class = 'home-category col-xs-6 col-md-3';
?>
@section('content')

<div class="row">
    <h2 class="text-center page-title">Rubriken</h2>
</div>
<ul id="home-categories" class="container-fluid">
	<li class="<?php print $category_row_class ?>">
		<a href="{{ URL::route('hot-videos') }}">
			<div>Hot</div>
		</a>
	</li>
	<li class="<?php print $category_row_class ?>">
		<a href="{{ URL::route('new-videos') }}">
			<div>New</div>
		</a>
	</li>
	<li class="<?php print $category_row_class ?>">
		<a href="{{URL::route('category',array('politik'))}}">
			<div>Politik</div>
		</a>
	</li>
	<li class="<?php print $category_row_class ?>">
		<a href="{{URL::route('category',array('sport'))}}">
			<div>Sport</div>
		</a>
	</li>
	<li class="<?php print $category_row_class ?>">
		<a href="{{URL::route('category',array('kinder'))}}">
			<div>Kinder</div>
		</a>
	</li>
	<li class="<?php print $category_row_class ?>">
		<a href="{{URL::route('category',array('wissen-kultur'))}}">
			<div>Wissen</div>
		</a>
	</li>
	<li class="<?php print $category_row_class ?>">
		<a href="{{URL::route('category',array('nachrichten'))}}">
			<div>Nachrichten</div>
		</a>
	</li>
	<li class="<?php print $category_row_class ?>">
		<a href="{{URL::route('category',array('kino-tv'))}}">
			<div>Kino &amp; TV</div>
		</a>
	</li>
	<li class="<?php print $category_row_class ?>">
		<a href="{{URL::route('category',array('wirtschaft'))}}">
			<div>Wirtschaft</div>
		</a>
	</li>
	<li class="<?php print $category_row_class ?>">
		<a href="{{URL::route('category',array('ratgeber-gesundheit'))}}">
			<div>Ratgeber</div>
		</a>
	</li>
	<li class="<?php print $category_row_class ?>">
		<a href="{{URL::route('category',array('unterhaltung'))}}">
			<div>Unterhaltung</div>
		</a>
	</li>
</ul>

@stop