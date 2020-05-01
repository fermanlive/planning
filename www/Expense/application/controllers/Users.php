<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Users extends RestController {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('user_model');
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
            $LoginAnswer = $this->user_model->Login($email,$password);
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
            $ChangePasswordAnswer = $this->user_model->ChangePassword($password,$idusers);

            if($ChangePasswordAnswer){
                $data="Cambio de clave realizado";
                $this->response($data,200);
            }else{
                $data="Ha ocurrido un error, por favor valide la información";
                $this->response($data,404);
            }
        }else{
            $data="Información incompleta";
            $this->response($data,404);
        }
    }

    public function EditUser_get(){   

        $idusers = $this->get('idusers');
        $surname = $this->get('surname');
        $name = $this->get('name');
        if ( $name != null || $surname != null)
        {
            $EditUserAnswer = $this->user_model->EditUser($name,$surname,$idusers);
            if($EditUserAnswer){
                $data="Información de Usuario Actualizada";
                $this->response($data,200);
            }else{
                $data="Ha ocurrido un error, por favor valide la información";
                $this->response($data,404);
            }
        }else{
            $data="Información incompleta";
            $this->response($data,404);
        }
    }
}