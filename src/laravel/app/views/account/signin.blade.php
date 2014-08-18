@extends('layout.main')

@section('content')
	<!-- START account/signin -->
	<div class="row">
		<div class="col-xs-12 col-sm-4 col-sm-offset-2 col-md-3 col-md-offset-2">
			<h3>Anmelden</h3>
			<form action="{{ URL::route('account-sign-in-post') }}" method="post" role="form">
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
				
				<div class="form-group{{ ($errors->has('password')) ? ' has-error' : '' }}">
					<label for="password">Passwort</label>
					<input type="password" class="form-control" name="password">
					@if($errors->has('password'))
						@if($errors->first('password') == 'validation.required')
							Dieses Feld ist erforderlich !
						@endif
					@endif
				</div>

				<div class="visible-xs">
					<button type="submit" class="btn btn-default pull-right">Anmelden</button>
					<div class="checkbox">
						<label><input type="checkbox" name="remember">Eingeloggt bleiben</label>
					</div>
				</div>

				<div class="hidden-xs">
					<button type="submit" class="btn btn-default">Anmelden</button>
					<div class="checkbox">
						<label>
							<input type="checkbox" name="remember">Eingeloggt bleiben
						</label>
					</div>
				</div>
					
				{{ Form::token() }}
			</form>
			<a href="{{ URL::route('account-forgot-password') }}">Passwort vergessen?</a>
		</div>

		<div class="col-xs-12 col-sm-4 col-sm-offset-1 col-md-3 col-md-offset-1">
			<div class="spacer visible-xs hidden-sm"></div>
			<h3>oder Account erstellen</h3>
			<form action="{{ URL::route('account-create-post') }}" method="post" role="form">
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
						@if($errors->first('email') == 'validation.unique')
							Ein Konto mit dieser Email-Adresse existiert bereits !
						@endif
					@endif
				</div>
				
				<div class="form-group{{ ($errors->has('password')) ? ' has-error' : '' }}">
					<label for="password">Passwort</label>
					<input type="password" class="form-control" name="password">
					@if($errors->has('password'))
						@if($errors->first('password') == 'validation.required')
							Dieses Feld ist erforderlich !
						@endif
						@if($errors->first('password') == 'validation.min.string')
							Das Passwort ist zu kurz !
						@endif
					@endif
				</div>
				
				<div class="form-group{{ ($errors->has('password_again')) ? ' has-error' : '' }}">
					<label for="password_again">Passwort wiederholen</label>
					<input type="password" class="form-control" name="password_again">
					@if($errors->has('password_again'))
						@if($errors->first('password_again') == 'validation.required')
							Dieses Feld ist erforderlich !
						@endif
						@if($errors->first('password_again') == 'validation.same')
							Die Passwörter stimmen nicht überein !
						@endif
					@endif
				</div>

				<button type="submit" class="btn btn-default hidden-xs">Registrieren</button>
				<button type="submit" class="btn btn-default visible-xs pull-right">Registrieren</button>
				{{ Form::token() }}
			</form>
		</div>
	</div>
	<!-- END account/signin -->
@stop
