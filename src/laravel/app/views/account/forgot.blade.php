@extends('layout.main')

@section('content')
	<form action="{{ URL::route('account-forgot-password-post') }}" method="post">
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

		<input type="submit" value="Passwort zurücksetzen">
		{{ Form::token() }}
	</form>
@stop