<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Expenses extends RestController {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('expense_model');
    }



    public function CreateExpense_get(){   

        $name = $this->get('name');
        $IdCategory = $this->get('idcategory');
        $dateExpense = $this->get('dateexpense');
        $IdPeriod = $this->get('idperiod');
        $value= $this->get('value');

        $CreateExpense = $this->expense_model->CreateExpense($name,$IdCategory,$dateExpense,$value);
        if($CreateExpense){
            $this->response([
                'status' => true,
                'message' => 'Egreso creado'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Egreso no creado'
            ],404);
        }

    }

    public function ReadExpense_get(){  

        $IdUser = $this->get('iduser');
        $IdExpense = $this->get('idexpense');
        $IdPeriod = $this->get('IdPeriod');

        $IdExpense = $IdExpense == null ? 0: $IdExpense;

        $ReadExpense = $this->expense_model->ReadExpense($IdUser,$IdPeriod,$IdExpense);
        if($ReadExpense){
            $this->response([
                'status' => true,
                'message' => $ReadExpense
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => $ReadExpense
            ],404);
        }

    }
    public function getCategoryExpense_get(){  

        $CategoriesExpense = $this->expense_model->getCategoryExpense();
        if($CategoriesExpense){
            $this->response([
                'status' => true,
                'message' => $CategoriesExpense
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => $CategoriesExpense
            ],404);
        }

    }


    public function UpdateExpense_get(){   

        $name = $this->get('name');
        $IdCategory = $this->get('idcategory');
        $dateExpense = $this->get('dateexpense');
        $value= $this->get('value');
        $IdUser = $this->get('iduser');
        $IdExpense = $this->get('idexpense');

        $UpdateExpense = $this->expense_model->UpdateExpense($name,$IdCategory,$dateExpense,$value,$IdUser,$IdExpense);
        if($UpdateExpense){
            $this->response([
                'status' => true,
                'message' => 'Egreso actualizado'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Egreso no actualizado'
            ],404);
        }

    }

    public function DeleteExpense_get(){  

        $IdUser = $this->get('iduser');
        $IdExpense = $this->get('idexpense');

        $DeleteExpense = $this->expense_model->DeleteExpense($IdUser,$IdExpense);
        if($DeleteExpense){
            $this->response([
                'status' => true,
                'message' => 'Egreso eliminado'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Egreso no eliminado'
            ],404);
        }

    }
}