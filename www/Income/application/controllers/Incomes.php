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



    public function CreateIncome_get(){   

        $name = $this->get('name');
        $IdCategory = $this->get('idcategory');
        $dateIncome = $this->get('dateincome');
        $IdPeriod = $this->get('idperiod');
        $value= $this->get('value');

        $CreateIncome = $this->income_model->CreateIncome($name,$IdCategory,$dateIncome,$value);
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

    public function getCategoryIncomes_get(){  

        $Categories = $this->income_model->getCategoryIncomes();
        if(count($Categories)>0){
            $this->response([
                'status' => true,
                'message' => $Categories
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => $Categories
            ],404);
        }

    }

    public function UpdateIncome_get(){   

        $name = $this->get('name');
        $IdCategory = $this->get('idcategory');
        $dateIncome = $this->get('dateincome');
        $value= $this->get('value');
        $IdUser = $this->get('iduser');
        $IdIncome = $this->get('idincome');

        $UpdateIncome = $this->income_model->UpdateIncome($name,$IdCategory,$dateIncome,$value,$IdUser,$IdIncome);
        if($UpdateIncome){
            $this->response([
                'status' => true,
                'message' => 'Ingreso actualizado'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Ingreso no actualizado'
            ],404);
        }

    }

    public function DeleteIncome_get(){  

        $IdUser = $this->get('iduser');
        $IdIncome = $this->get('idincome');

        $DeleteIncome = $this->income_model->DeleteIncome($IdUser,$IdIncome);
        if($DeleteIncome){
            $this->response([
                'status' => true,
                'message' => 'Ingreso eliminado'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Ingreso no eliminado'
            ],404);
        }

    }


    
}