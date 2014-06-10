@extends('layout.main')

@section('content')
	
	<form action="{{ URL::route('account-create-post') }}" method="post">
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
				@if($errors->first('email') == 'validation.unique')
					Ein Konto mit dieser Email-Adresse existiert bereits
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
				@if($errors->first('password') == 'validation.min.string')
					Das Passwort ist zu kurz
				@endif
			@endif
		</div>
		
		<div class="field">
			<label for="password_again">Passwort wiederholen</label>
			<input type="password" name="password_again">
			@if($errors->has('password_again'))
				@if($errors->first('password_again') == 'validation.required')
					Dieses Feld ist erforderlich
				@endif
				@if($errors->first('password_again') == 'validation.same')
					Die Passwörter stimmen nicht überein
				@endif
			@endif
		</div>

		<input type="submit" value="Registrieren">
		{{ Form::token() }}
	</form>
@stop
