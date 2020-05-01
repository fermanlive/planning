<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Users extends RestController {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('User_model');
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
            $CreateUser = $this->User_model->CreateUser($email,$password,$name,$surname);
            if($CreateUser){
                $this->response([
                    'status' => true,
                    'message' => 'Usuario Creado'
                ],200);
            }else{
                $this->response([
                    'status' => false,
                    'message' => 'Usuario no creado'
                ],404);
            }

        }
        
    }
    
    public function Login_get(){   

        $email = $this->get('email');
        $password = $this->get('password');
        
        if ( $email === null || $password === null)
        {
            $this->response( [
                'status' => false,
                'message' => 'Email y contraseña no recibidos'
            ], 404 );
        }else{
            $LoginAnswer = $this->User_model->Login($email,$password);
            if($LoginAnswer){
                $data=[
                    'Userinfo' => $LoginAnswer,
                    'Answer' => 'Login Succesfully',
                    'status' => true
                ];
                $this->response($data,200);
            }else{
                $this->response( [
                    'status' => false,
                    'message' => 'Correo y/o contraseña Erroneas'
                ], 404 );
            }
        }
        
    }
    public function ChangePassword_get(){   

        $password = $this->get('password');
        $idusers = $this->get('idusers');

        if ( $password != null)
        {
            $ChangePasswordAnswer = $this->User_model->ChangePassword($password,$idusers);

            if($ChangePasswordAnswer){
                $this->response([
                    'status' => true,
                    'message' => 'Cambio de clave realizado'
                ],200);
            }else{
                $this->response([
                    'status' => false,
                    'message' => 'Ha ocurrido un error, por favor valide la información'
                ],404);
            }
        }else{
            $this->response([
                'status' => false,
                'message' => 'Información incompleta'
            ],404);
        }
    }

    public function EditUser_get(){   

        $idusers = $this->get('idusers');
        $surname = $this->get('surname');
        $name = $this->get('name');
        if ( $name != null || $surname != null)
        {
            $EditUserAnswer = $this->User_model->EditUser($name,$surname,$idusers);
            if($EditUserAnswer){
                $this->response([
                    'status' => true,
                    'message' => 'Información de Usuario Actualizada'
                ],200);
            }else{
                $this->response([
                    'status' => false,
                    'message' => 'Ha ocurrido un error, por favor valide la información'
                ],404);
            }
        }else{
            $this->response([
                'status' => false,
                'message' => 'Información incompleta'
            ],404);
        }
    }
}