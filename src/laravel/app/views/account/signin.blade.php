@extends('layout.main')

@section('content')
	<form action="{{ URL::route('account-sign-in-post') }}" method="post">
		<div class="field">
			<label for="email">Email-Adresse</label>
			<input type="text" name="email"{{ (Input::old('email')) ? ' value="' . e(Input::old('email')) . '"' : '' }}>
			@if($errors->has('email'))
				@if($errors->first('email') == 'validation.required')
					Dieses Feld ist erforderlich
				@endif
				@if($errors->first('email') == 'validation.email')
					Dies ist keine gültige Email-Adresse
				@endif
			@endif
		</div>
		
		<div class="field">
			<label for="password">Passwort</label>
			<input type="password" name="password">
			@if($errors->has('password'))
				@if($errors->first('password') == 'validation.required')
					Dieses Feld ist erforderlich
				@endif
			@endif
		</div>
		
		<div class="field">
			<input type="checkbox" name="remember" id="remember" />
			<label for="remember">Eingeloggt bleiben</label>
		</div>
		
		<input type="submit" value="Anmelden">
		{{ Form::token() }}
	</form>
@stop
