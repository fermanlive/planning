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

        $CreateIncome = $this->income_model->CreateIncome($name,$IdCategory,$dateIncome,$IdPeriod,$value);
        if($CreateIncome){
            $this->response([
                'status' => true,
                'message' => 'Ingreso creado'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Ingreso No creado'
            ],404);
        }

    }
    public function CreateIncomeCategory_get(){   

        $name = $this->get('name');
        $IdUser = $this->get('IdUser');

        $CreateIncomeCategory = $this->income_model->CreateIncomeCategory($name,$IdUser);
        if($CreateIncomeCategory){
            $this->response([
                'status' => true,
                'message' => 'Categoria de Ingreso Creada'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Categoria de Ingreso No Creada'
            ],404);
        }

    }

    public function ReadIncome_get(){  


        $IdUser = $this->get('iduser');
        $IdIncome = $this->get('idincome');
        $IdPeriod = $this->get('IdPeriod');

        $IdIncome = $IdIncome == null ? 0: $IdIncome;

        $ReadIncome = $this->income_model->ReadIncome($IdUser,$IdPeriod,$IdIncome);
        if(count($ReadIncome)>0){
            $this->response([
                'status' => true,
                'message' => $ReadIncome
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => $ReadIncome
            ],404);
        }

    }
    public function getCategoryIncomes_get(){  
        $IdUser = $this->get('iduser');
        $Categories = $this->income_model->getCategoryIncomes($IdUser);
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
        $IdCategory = $this->get('IdCategory');
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
                'message' => 'Ingreso No actualizado'
            ],404);
        }

    }
    
    public function UpdateCategoryIncomes_get(){  
        $IdUser = $this->get('iduser');
        $id_category = $this->get('iduser');
        $name = $this->get('name');
        $UpdateCategoryIncome = $this->income_model->UpdateCategoryIncome($name,$IdUser,$id_category);
        if(UpdateCategoryIncome){
            $this->response([
                'status' => true,
                'message' => "Categoria Actualizada"
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => "Categoria No Actualizada"
            ],404);
        }
    }

    public function DeleteIncome_get(){  

        $IdUser = $this->get('iduser');
        $IdIncome = $this->get('idincome');

        $DeleteIncome = $this->income_model->DeleteIncome($IdIncome);
        if($DeleteIncome){
            $this->response([
                'status' => true,
                'message' => 'Ingreso eliminado'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Ingreso No eliminado'
            ],404);
        }

    }
    public function DeleteCategoryIncomes_get(){  

        $IdUser = $this->get('iduser');
        $IdIncome = $this->get('idincome');

        $DeleteCategoryIncomes = $this->income_model->DeleteCategoryIncomes($IdIncome,$IdUser);
        if($DeleteCategoryIncomes){
            $this->response([
                'status' => true,
                'message' => 'Categoria eliminada'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Categoria No eliminada'
            ],404);
        }

    }


    
}