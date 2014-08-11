<!-- START search/filters -->
	<div id="category-filter" class="form-group col-sm-3">
		<h4>Rubriken</h4>
		<div class="col-sm-6">
			<div class="checkbox">
				<label>
					<input type="checkbox" name="nachrichten" value="nachrichten"{{ (Input::old('nachrichten')) ? ' checked' : ' selected' }}>
					Nachrichten
				</label>
			</div>
			<div class="checkbox">
				<label>
					<input type="checkbox" name="sport" value="sport" >
					Sport
				</label>
			</div>
			<div class="checkbox ">
				<label>
					<input type="checkbox" name="politik" value="politik" >
					Politik
				</label>
			</div>
			<div class="checkbox ">
				<label>
					<input type="checkbox" name="wirtschaft" value="wirtschaft" >
					Wirtschaft
				</label>
			</div>
			<div class="checkbox ">
				<label>
					<input type="checkbox" name="kinder" value="kinder" >
					Kinder
				</label>
			</div>
		</div>
		<div class="col-sm-6">
			<div class="checkbox ">
				<label>
					<input type="checkbox" name="kino-tv" value="kino-tv" >
					Kino und TV
				</label>
			</div>
			<div class="checkbox ">
				<label>
					<input type="checkbox" name="wissen-kultur" value="wissen-kultur" >
					Wissen
				</label>
			</div>
			<div class="checkbox ">
				<label>
					<input type="checkbox" name="ratgeber-gesundheit" value="ratgeber-gesundheit" 
					>
					Ratgeber
				</label>
			</div>
			<div class="checkbox ">
				<label>
					<input type="checkbox" name="unterhaltung" value="unterhaltung" >
					Unterhaltung
				</label>
			</div>
		</div>
	</div>
	<div id="channel-filter" class="form-group col-sm-3">
		<h4>Sender</h4>
		<div class="col-sm-6">
			<div class="checkbox">
				<label>
					<input type="checkbox" name="daserste" value="daserste">
					Das Erste
				</label>
			</div>
			<div class="checkbox disabled">
				<label>
					<input type="checkbox" name="zdf" value="zdf">
					ZDF
				</label>
			</div>
			<div class="checkbox disabled">
				<label>
					<input type="checkbox" name="arte" value="arte">
					Arte
				</label>
			</div>
		</div>		
	</div>
	<div class="form-group col-sm-4 form-inline">
		<h4>Datum &amp; Dauer</h4>
		<div class="disabled col-sm-6">
			<label>Von:
				<input type="date" name="von" value="von" disabled>
			</label>
		</div>
		<div class="disabled col-sm-6">
			<label>Bis:
				<input type="date" name="bis" value="bis" disabled>
			</label>
		</div>
		<div class="disabled col-sm-6">
			<label>Dauer in min
				<input type="range" name="dauer" value="dauer" min="1" max="90" disabled>
			</label>
		</div>
	</div>

	<div class="col-sm-2">
		<button id="submit" class="btn btn-transparent col-xs-12">Absenden</button>
		<button type="" class="btn btn-transparent col-xs-12">Zurücksetzen</button>
	</div>
<!-- END search/filters -->
