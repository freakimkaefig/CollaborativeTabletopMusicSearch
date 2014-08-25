@extends('layout.main')

@section('content')

	<div class="container mobile-filter-button-container pull-right">
		<div id="mobile-filter-button" class="visible-xs open">
			<button class="btn btn-default btn-big">
				<span class="glyphicon glyphicon-chevron-up"></span>
				<span>Filter</span>
			</button>
		</div>
	</div>

	<div id="mobile-search-form" class="row">
		<form class="" role="search" action="{{ URL::route('search-post') }}" method="post">

			<div>
			
				<div class="form-group col-xs-8">
					<input class="form-control" type="text" name="search" placeholder="Suche"{{ (Input::old('search')) ? ' value="' . e(Input::old('search')) . '"' : '' }}>
				</div>
				<button type="submit" class="btn btn-default" id="search-button-mobile"><span class="glyphicon glyphicon-search"></span>Suchen</button>
				
			</div>
		
			<div id="channel-filter" class="form-group col-xs-12 ">
				<h4>Sender</h4>
				<div class="col-xs-6">
					<div class="checkbox">
						<label>
							<input type="checkbox" name="daserste" value="daserste">
							Das Erste
						</label>
					</div>
					<div class="checkbox">
						<label>
							<input type="checkbox" name="zdf" value="zdf">
							ZDF
						</label>
					</div>
					<div class="checkbox">
						<label>
							<input type="checkbox" name="br" value="br">
							BR
						</label>
					</div>
				</div>
				<div class="col-xs-6">
					<div class="checkbox">
						<label>
							<input type="checkbox" name="arte" value="arte">
							Arte
						</label>
					</div>
					<div class="checkbox">
						<label>
							<input type="checkbox" name="srf" value="srf">
							SRF
						</label>
					</div>
					<div class="checkbox">
						<label>
							<input type="checkbox" name="orf" value="orf">
							ORF
						</label>
					</div>
				</div>		
			</div>



			<div id="category-filter" class="form-group col-xs-12 ">
				<h4>Rubriken</h4>
				<div class="col-xs-6">
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
					<div class="checkbox">
						<label>
							<input type="checkbox" name="politik" value="politik" >
							Politik
						</label>
					</div>
					<div class="checkbox">
						<label>
							<input type="checkbox" name="wirtschaft" value="wirtschaft" >
							Wirtschaft
						</label>
					</div>
				</div>
				<div class="col-xs-6">
					<div class="checkbox">
						<label>
							<input type="checkbox" name="kinder" value="kinder" >
							Kinder
						</label>
					</div>
					<div class="checkbox">
						<label>
							<input type="checkbox" name="kino-tv" value="kino-tv" >
							Kino und TV
						</label>
					</div>
					<div class="checkbox">
						<label>
						<input type="checkbox" name="wissen-kultur" value="wissen-kultur" >
							Wissen
						</label>
					</div>
					<div class="checkbox">
						<label>
							<input type="checkbox" name="ratgeber-gesundheit" value="ratgeber-gesundheit">
							Ratgeber
						</label>
					</div>
					<div class="checkbox">
						<label>
							<input type="checkbox" name="unterhaltung" value="unterhaltung" >
							Unterhaltung
						</label>
					</div>
				</div>
			</div>


			 <div class="form-group col-xs-12 form-inline">
				<h4>Datum &amp; Dauer</h4>
				<div class="col-xs-6">
					<label>Von:
						<input id="datepicker-from" class="col-xs-12" type="text" name="from" >
					</label>
				</div>
				<div class="col-xs-6">
					<label>Bis:
						<input id="datepicker-to" class="col-xs-12" type="type" name="to" disabled>
					</label>
				</div>
				<div class="disabled col-xs-6">
					<label>Mindestdauer: <p id="duration-display">0min</p>
						<div id="duration-slider"></div>			
					</label>
				</div>
			</div>


			<div class="col-xs-12 ">
				<button id="reset" type="button" class="btn btn-transparent col-xs-6">Zurücksetzen</button>
				<button id="submit" type="button" class="btn btn-transparent col-xs-6">Absenden</button>
			</div>

		{{ Form::token() }}
		</form>
	</div>
<hr>
	<div id="mobile-search-results" class="row">
		@include('search.results')
	</div>

@stop
