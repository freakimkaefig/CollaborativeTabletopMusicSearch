<!-- START search/filters -->
	<div class="form-group col-sm-3">
		<h4>Rubriken</h4>
		<div class="col-sm-6">
			<div class="checkbox">
				<label>
					<input type="checkbox" name="nachrichten" value="nachrichten"{{ (Input::old('nachrichten')) ? ' checked' : ' selected' }}>
					Nachrichten
				</label>
			</div>
			<div class="checkbox disabled">
				<label>
					<input type="checkbox" name="sport" value="sport" disabled>
					Sport
				</label>
			</div>
			<div class="checkbox disabled">
				<label>
					<input type="checkbox" name="serien" value="serien" disabled>
					Serien
				</label>
			</div>
		</div>
		<div class="col-sm-6">
			<div class="checkbox disabled">
				<label>
					<input type="checkbox" name="spielfilme" value="spielfilme" disabled>
					Spielfilme
				</label>
			</div>
			<div class="checkbox disabled">
				<label>
					<input type="checkbox" name="dokumentationen" value="dokumentationen" disabled>
					Dokumentationen
				</label>
			</div>
			<div class="checkbox disabled">
				<label>
					<input type="checkbox" name="lifestyle" value="lifestyle" disabled>
					Lifestyle
				</label>
			</div>
		</div>
	</div>
	<div class="form-group col-sm-3">
		<h4>Sender</h4>
		<div class="col-sm-6">
			<div class="checkbox disabled">
				<label>
					<input type="checkbox" name="ard" value="ard" disabled>
					Das Erste
				</label>
			</div>
			<div class="checkbox disabled">
				<label>
					<input type="checkbox" name="zdf" value="zdf" disabled>
					ZDF
				</label>
			</div>
			<div class="checkbox disabled">
				<label>
					<input type="checkbox" name="br" value="br" disabled>
					BR
				</label>
			</div>
		</div>		
	</div>
	<div class="form-group col-sm-2 form-inline">
		<h4>Datum</h4>
		
			<div class="disabled col-sm-6">
				<label>
					Von:
					<input type="date" name="von" value="von" disabled>
				</label>
			</div>
			<div class="disabled col-sm-6">
				<label>
					Bis:
					<input type="date" name="bis" value="bis" disabled>
				</label>
			</div>
			
	</div>
	<div class="form-group col-sm-2 form-inline">
		<h4>Zeit und Dauer</h4>
			<div class="disabled col-sm-6">
				<label>
					Zeit
					<input type="time" name="zeit" value="zeit" disabled>
				</label>
			</div>
			<div class="disabled col-sm-6">
				<label>
					Dauer in min
					<input type="range" name="dauer" value="dauer" min="1" max="90" disabled>
				</label>
			</div>
			
	</div>
	<div class="col-sm-2">
		<button type="submit" class="btn btn-default"><a href="{{ URL::route('search-results') }}">Absenden</a></button>
		<button type="" class="btn btn-default">Zurücksetzen</button>
	</div>
<!-- END search/filters -->
