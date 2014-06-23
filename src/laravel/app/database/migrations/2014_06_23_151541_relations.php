<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Relations extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		// ########## RELATIONS ########## //
		Schema::table('playlists', function($table) {
			$table->integer('user')->unsigned()->nullable()->default(NULL);
		});

		Schema::table('playlists', function($table) {
			$table->foreign('user')->references('id')->on('users');
		});

		Schema::table('broadcasts', function($table) {
			$table->integer('station_id')->unsigned();
			$table->integer('playlist_id')->unsigned()->nullable()->default(NULL);
			$table->integer('user_id')->unsigned()->nullable()->default(NULL);
		});

		Schema::table('broadcasts', function($table) {
			$table->foreign('station_id')->references('id')->on('stations');
			$table->foreign('playlist_id')->references('id')->on('playlists');
			$table->foreign('user_id')->references('id')->on('users');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('playlists', function($table) {
			$table->dropForeign('playlists_user_foreign');
		});

		Schema::table('playlists', function($table) {
			$table->dropColumn('user');
		});

		Schema::table('broadcasts', function($table) {
			$table->dropForeign('broadcasts_station_id_foreign');
			$table->dropForeign('broadcasts_playlist_id_foreign');
			$table->dropForeign('broadcasts_user_id_foreign');
		});

		Schema::table('broadcasts', function($table) {
			$table->dropColumn('station_id');
			$table->dropColumn('playlist_id');
			$table->dropColumn('user_id');
		});
	}

}