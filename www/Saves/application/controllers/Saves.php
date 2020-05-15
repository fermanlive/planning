<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Saves extends RestController {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('Save_model');
    }



    public function CreateSave_get(){   

        $current_value = $this->get('current_value');
        $name = $this->get('name');
        $goal = $this->get('goal');
        $Iduser = $this->get('Iduser');

        $CreateSave = $this->Save_model->CreateSave($current_value,$name,$goal,$Iduser);

        if($CreateSave){
            $data=[
                'status' => true,
                'message' => 'Ahorro creado'
            ];
            $this->response($data,200);
        }else{
            $data=[
                'status' => false,
                'message' => 'Ahorro no creado'
            ];
            $this->response($data,200);
        }   
    }

    public function ShowSaves_get(){   

        $IdSave = $this->get('IdSave');
        $IdSave = $IdSave == null ?  0: $IdSave ;
        $GetSave = $this->Save_model->getSave($IdSave);

        if(count($GetSave)> 0){
            $data=[
                'status' => true,
                'message' => $GetSave
            ];
            $this->response($data,200);
        }else{
            $data=[
                'status' => false,
                'message' => []
            ];
            $this->response($data,200);
        }   
    }
    
    public function EditSave_get(){   

        $current_value = $this->get('current_value');
        $name = $this->get('name');
        $goal = $this->get('goal');
        $Iduser = $this->get('Iduser');
        $IdSave = $this->get('IdSave');
        $IdSave = $IdSave == null ?  0: $IdSave ;
        $Iduser = $Iduser == null ?  0: $Iduser ;

        if($IdSave==null && $Iduser==null){
            $data=[
                'status' => false,
                'message' => 'Ahorro no editado'
            ];
            $this->response($data,200);
            return ;
        } 

        $EditSave = $this->Save_model->EditSave($current_value,$name,$goal,$Iduser,$IdSave);

        if($EditSave){
            $data=[
                'status' => true,
                'message' => 'Ahorro editado'
            ];
            $this->response($data,200);
        }else{
            $data=[
                'status' => false,
                'message' => 'Ahorro no editado'
            ];
            $this->response($data,404);
        }   
    }

    public function DeleteSave_get(){   

        $IdSave = $this->get('IdSave');
        $Iduser = $this->get('Iduser');
        if($IdSave==null){
            $data=[
                'status' => false,
                'message' => 'Ahorro no eliminado'
            ];
            $this->response($data,404);
            return ;
        } 
        $DeleteSave = $this->Save_model->DeleteSave($IdSave,$Iduser);

        if($DeleteSave){
            $data=[
                'status' => true,
                'message' => 'Ahorro eliminado'
            ];
            $this->response($data,200);
        }else{
            $data=[
                'status' => true,
                'message' => 'Ahorro no eliminado'
            ];
            $this->response($data,200);
        }   
    }


}