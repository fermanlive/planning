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

        $name = urldecode($this->get('name'));
        $IdCategory = $this->get('idcategory');
        $dateExpense = $this->get('dateexpense');
        $IdPeriod = $this->get('idperiod');
        $value= $this->get('value');


        $CreateExpense = $this->expense_model->CreateExpense($name,$IdCategory,$dateExpense,$value,$IdPeriod);
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

    public function CreateCreditCard_get(){   

        $name = urldecode($this->get('name'));
        $brand = $this->get('brand');
        $interest = $this->get('interest');
        $managementFee = $this->get('managementFee');
        $id_expense= $this->get('id_expense');

        $CreateCreditCard = $this->expense_model->CreateCreditCard($name,$brand,$interest,$managementFee,$id_expense);
        if($CreateCreditCard){
            $this->response([
                'status' => true,
                'message' => 'Tarjeta creada'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Tarjeta no creada'
            ],404);
        }

    }

    public function CreateCategoryExpense_get(){   

        $name = urldecode($this->get('name'));
        $IdUser = $this->get('IdUser');

        $CreateExpense = $this->expense_model->CreateCategoryExpense($name,$IdUser);
        if($CreateExpense){
            $this->response([
                'status' => true,
                'message' => 'Categoria Egreso creado'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Categoria Egreso no creado'
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
    public function ReadCreditCard_get(){  

        $id_expense = $this->get('id_expense');
        $ReadCreditCard = $this->expense_model->ReadCreditCard($id_expense);
        if($ReadCreditCard){
            $this->response([
                'status' => true,
                'message' => $ReadCreditCard
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => $ReadCreditCard
            ],404);
        }

    }
    public function getCategoryExpense_get(){  
        $IdUser = $this->get('iduser');
        $CategoriesExpense = $this->expense_model->getCategoryExpense($IdUser);
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

        $name = urldecode($this->get('name')); 
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

    public function UpdateCreditCard_get(){   

        $name = urldecode($this->get('name'));
        $brand = $this->get('brand');
        $interest = $this->get('interest');
        $managementFee = $this->get('managementFee');
        $idcredit_card= $this->get('idcredit_card');

        $UpdateCreditCard = $this->expense_model->UpdateCreditCard($name,$brand,$interest,$managementFee,$idcredit_card);
        if($UpdateCreditCard){
            $this->response([
                'status' => true,
                'message' => 'Tarjeta Actualizada'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Tarjeta no Actualizada'
            ],404);
        }

    }


    public function UpdateCategoryExpense_get(){   

        $name = urldecode($this->get('name')); 
        $IdCategory = $this->get('idcategory');
        $IdUser = $this->get('iduser');


        $UpdateCategoryExpense = $this->expense_model->UpdateCategoryExpense($name,$IdCategory,$IdUser);
        if($UpdateCategoryExpense){
            $this->response([
                'status' => true,
                'message' => 'Categoria de Egreso actualizado'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Categoria de Egreso no actualizado'
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

    public function DeleteCategoryExpense_get(){  

        $IdUser = $this->get('iduser');
        $IdCategory = $this->get('Idcategory');

        $DeleteCategoryExpense = $this->expense_model->DeleteCategoryExpense($IdUser,$IdCategory);
        if($DeleteCategoryExpense){ 
            $this->response([
                'status' => true,
                'message' => 'Categoria de Egreso eliminado'
            ],200);
        }else{
            $this->response([
                'status' => false,
                'message' => 'Categoria de Egreso no eliminado'
            ],404);
        }

    }
}