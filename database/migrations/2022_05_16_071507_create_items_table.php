<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->text('name')->nullable();
            $table->string('measure')->nullable();
            $table->integer('count')->nullable();
            $table->float('plan_price', 8, 2)->nullable();
            $table->float('plan_cost', 10, 2)->nullable();
            $table->string('type')->nullable();
            $table->bigInteger('number_material')->nullable();
            $table->string('ttu')->nullable();
            $table->smallInteger('month')->nullable();
            $table->smallInteger('year')->nullable();
            $table->string('initiator')->nullable();
            $table->string('department')->nullable();
            $table->string('storage')->nullable();
            $table->string('fio')->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users'); //исполнитель ИЗ

            //часть СС
            $table->string('sed')->nullable();
            $table->foreignId('user_moderate_id')->nullable()->constrained('users'); //исполнитель СС
            $table->string('contract')->nullable();
            $table->bigInteger('material')->nullable();
            $table->float('fact_cost', 10, 2)->nullable();
            $table->integer('status')->nullable();
            $table->integer('term')->nullable();
            $table->text('description')->nullable();



//            $table->foreignId('user_id')->constrained('users');


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
        Schema::dropIfExists('items');
    }
}
