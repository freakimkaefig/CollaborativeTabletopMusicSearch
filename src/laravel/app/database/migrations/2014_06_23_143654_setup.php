<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Setup extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		// ########## ENTITIES ########## //
		Schema::create('users', function($table) {
			$table->engine = 'InnoDB';
			$table->increments('id', true);
			//$table->integer('user_id')->unsigned();
			$table->string('email', 50);
			$table->string('password', 60);
			$table->string('password_temp', 60);
			$table->string('code', 60);
			$table->integer('active');
			$table->string('remember_token', 60);
			$table->timestamps();
		});

		// Schema::create('stations', function($table) {
		// 	$table->increments('id', true);
		// 	$table->string('name', 50);
		// 	$table->string('logo', 250000);
		// 	$table->timestamps();
		// });

		Schema::create('broadcasts', function($table) {
			$table->engine = 'InnoDB';
			$table->increments('id', true);
			$table->string('title', 250000);
			$table->string('subtitle', 250000);
			$table->string('details', 250000);
			$table->dateTime('airtime');
			$table->string('url', 250000);
			$table->time('duration');
			$table->string('image', 250000);
			$table->string('station', 250);
			$table->timestamps();
		});

		Schema::create('playlists', function($table) {
			$table->engine = 'InnoDB';
			$table->increments('id', true);
			$table->string('name', 250);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('users');
		Schema::dropIfExists('stations');
		Schema::dropIfExists('broadcasts');
		Schema::dropIfExists('playlists');
	}

}
