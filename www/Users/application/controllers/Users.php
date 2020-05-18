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



    public function CreateUser_get(){   

        $email = $this->get('email');
        $password = urldecode($this->get('password'));
        $name = urldecode($this->get('name'));
        $surname = urldecode($this->get('surname'));

        if ( $email === null || $password === null)
        {
            $this->response( [
                'status' => false,
                'message' => 'Email y contraseña no recibidos'
            ], 404 );
        }else{
            $CreateUser = $this->User_model->CreateUser($email,$password,$name,$surname);
            $idusers = $CreateUser['status'] ? $CreateUser['message']: 0;
            $CreatePeriod = file_get_contents("http://localhost/planning/www/Periods/index.php/Periods/defaultPeriod/idusers/".$idusers."/");
            if($CreateUser['status']){
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

        $idusers =$this->get('idusers');
        $surname = urldecode($this->get('surname'));
        $name = urldecode($this->get('name'));
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
    public function UpdateUser_get(){   

        $iduser = $this->get('iduser');
        $name = urldecode($this->get('name'));
        $surname = urldecode($this->get('surname'));
        $UpdateUser = $this->User_model->UpdateUser($iduser,$name,$surname);

        if($UpdateUser){
            $this->response([
                'status' => true,
                'message' => 'Perfil Actualizado'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' =>'Perfil No Actualizado'
            ],404);
        }
    }

    public function sendSurvey_get(){   

        $rating = $this->get('rating');
        $observation = urldecode($this->get('observation'));

        $sendSurvey = $this->User_model->sendSurvey($rating,$observation);

        if($sendSurvey){
            $this->response([
                'status' => true,
                'message' => 'Encuesta Enviada'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' =>'Encuesta No Enviada'
            ],404);
        }
    }

    public function validateExistedUser_get(){   

        $email = $this->get('email');
        $validateExistedUser = $this->User_model->validateExistedUser($email);

        if($validateExistedUser){
            $this->response([
                'status' => true,
                'message' => 'Correo valido'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Correo Existente'
            ],404);
        }
    }

    public function validateToken_get(){   

        $iduser = $this->get('iduser');
        $token = $this->get('token');
        $validateToken = $this->User_model->validateToken($iduser,$token);

        if($validateToken){
            $this->response([
                'status' => true,
                'message' => 'Token valido'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Token  no valido'
            ],404);
        }
    }
}