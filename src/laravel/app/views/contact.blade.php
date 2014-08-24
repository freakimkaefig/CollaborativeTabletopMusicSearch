@extends('layout.main')

@section('content')

	<div class="container">

		<h1>Kontakt</h1>
		<p>&nbsp;</p>
		
		<div class="row">
			<form class="col-md-6" role="contact" action="{{ URL::route('contact-post') }}" method="post">
				<div class="form-group{{ ($errors->has('name')) ? ' has-error' : '' }}">
					<label for="name">Name</label>
					<input type="text" class="form-control" name="name"{{ (Input::old('name')) ? ' value="' . e(Input::old('name')) . '"' : '' }}>
					@if($errors->has('name'))
						@if($errors->first('name') == 'validation.required')
							Dieses Feld ist erforderlich !
						@endif
					@endif
				</div>
				<div class="form-group{{ ($errors->has('email')) ? ' has-error' : '' }}">
					<label for="email">Email-Adresse</label>
					<input type="text" class="form-control" name="email"{{ (Input::old('email')) ? ' value="' . e(Input::old('email')) . '"' : '' }}>
					@if($errors->has('email'))
						@if($errors->first('email') == 'validation.required')
							Dieses Feld ist erforderlich !
						@endif
						@if($errors->first('email') == 'validation.email')
							Dies ist keine gültige Email-Adresse !
						@endif
					@endif
				</div>
				<div class="form-group{{ ($errors->has('text')) ? ' has-error' : '' }}">
					<label for="text">Nachricht</label>
					<textarea rows="5" class="form-control" name="text"{{ (Input::old('text')) ? ' value="' . e(Input::old('text')) . '"' : '' }}></textarea>
					@if($errors->has('text'))
						@if($errors->first('text') == 'validation.required')
							Dieses Feld ist erforderlich !
						@endif
					@endif
				</div>
				<button type="submit" class="btn btn-default">Senden</button>
			{{ Form::token() }}
			</form>
		</div>

	</div>
	<div class="spacer">
	{{ Session::getId() }}
	<br>
 	{{ Session::token() }}

@stop