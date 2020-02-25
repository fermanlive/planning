<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Api extends RestController {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('user_model');
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

    public function CreateUser_get(){   

        $email = $this->get('email');
        $password = $this->get('password');
        $name = $this->get('name');
        $surname = $this->get('surname');

        if ( $email === null || $password === null)
        {
            $this->response( [
                'status' => false,
                'message' => 'Email y contraseña no recibidos'
            ], 404 );
        }else{
            $CreateUser = $this->user_model->CreateUser($email,$password,$name,$surname);
            if($CreateUser){
                $data="Usuario creado";
                $this->response($data,200);
            }else{
                $data="Usuario no creado";
                $this->response($data,404);
            }

        }
        
    }
}