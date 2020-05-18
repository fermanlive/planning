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

        $name = urldecode($this->get('name'));
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

        $name = urldecode($this->get('name'));
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
        $token = $this->get('token');
        $validateToken = $this->validateToken($IdUser,$token);

        if(!$validateToken){
            $this->response([
                'status' => false,
                'message' => "Token invalido"
            ],404);
        }

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

        $name = urldecode($this->get('name'));
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
    
    public function UpdateCategoryIncome_get(){  
        $IdUser = $this->get('iduser');
        $id_category = $this->get('id_category');
        $name = urldecode($this->get('name'));
        $UpdateCategoryIncome = $this->income_model->UpdateCategoryIncome($name,$IdUser,$id_category);
        if($UpdateCategoryIncome){
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
    public function DeleteCategoryIncome_get(){  

        $IdUser = $this->get('iduser');
        $IdIncome = $this->get('idincome');

        $DeleteCategoryIncome = $this->income_model->DeleteCategoryIncome($IdIncome,$IdUser);
        if($DeleteCategoryIncome){
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
    
    public function validateToken($iduser,$token){

        $url="http://localhost/Planning/www/Users/index.php/Users/validateToken/iduser/".$iduser."/token/".$token;
        $handle = curl_init($url);
        curl_setopt($handle,  CURLOPT_RETURNTRANSFER, TRUE);
        /* Get the HTML or whatever is linked in $url. */
        $response = curl_exec($handle);

        /* Check for 404 (file not found). */
        $httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);
        // if($httpCode == 404) {
        //     /* Handle 404 here. */
        // }

        curl_close($handle);

        /* Handle $response here. */
        return $httpCode == 200 ? true : false;
    }




    
}