@extends('layout.main')

@section('content')
	<!-- START account/password -->
	<form action="{{ URL::route('account-change-password-post') }}" method="post">
		<div class="field">
			<label for="old_password">Aktuelles Passwort</label>
			<input type="password" name="old_password">
			@if($errors->has('old_password'))
				@if($errors->first('old_password') == 'validation.required')
					Dieses Feld ist erforderlich
				@endif
			@endif
		</div>

		<div class="field">
			<label for="password">Neues Passwort</label>
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
			<label for="password_again">Neues Passwort wiederholen</label>
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

		<input type="submit" value="Passwort ändern">
		{{ Form::token() }}
	</form>
	<!-- END account/password -->
@stop