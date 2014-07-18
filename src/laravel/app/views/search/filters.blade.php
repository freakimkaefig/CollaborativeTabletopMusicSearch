<!-- START search/filters -->
	<div class="form-group">
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
	</div>
	<button type="submit" class="btn btn-default">Absenden</button>
<!-- END search/filters -->
