<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Incomes extends RestController {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('income_model');
    }

    public function users_get()
    {
        // Users from a data store e.g. database
        $users = [
            ['id' => 0, 'name' => 'John', 'email' => 'john@example.com'],
            ['id' => 1, 'name' => 'Jim', 'email' => 'jim@example.com'],
        ];

        $id = $this->get( 'id' );

        if ( $id === null )
        {
            // Check if the users data store contains users
            if ( $users )
            {
                // Set the response and exit
                $this->response( $users, 200 );
            }
            else
            {
                // Set the response and exit
                $this->response( [
                    'status' => false,
                    'message' => 'No users were found'
                ], 404 );
            }
        }
        else
        {
            if ( array_key_exists( $id, $users ) )
            {
                $this->response( $users[$id], 200 );
            }
            else
            {
                $this->response( [
                    'status' => false,
                    'message' => 'No such user found'
                ], 404 );
            }
        }
    }

    public function CreateIncome_get(){   

        $name = $this->get('name');
        $IdCategory = $this->get('idcategory');
        $dateIncome = $this->get('dateincome');
        $IdPeriod = $this->get('idperiod');
        $value= $this->get('value');

        $CreateIncome = $this->user_model->CreateUser($name,$IdCategory,$dateIncome,$value);
        if($CreateIncome){
            $this->response([
                'status' => true,
                'message' => 'Ingreso creado'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Ingreso no creado'
            ],404);
        }

    }
    
}