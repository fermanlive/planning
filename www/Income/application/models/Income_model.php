<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 * Clase encargada de las operaciones con el modelo de usuarios
 * en la base de datos.
 *

 */
class Income_model extends CI_Model {

    public function __construct() {
        parent::__construct();  
        $this->load->helper('string');
        $this->load->helper('url');
    
    }

    public function CreateIncome($name,$IdCategory,$dateIncome,$idperiod,$value){

        //Array con los datos del usuario
        $data = array(
            'value' => $value,
            'name' => $name,
            'category_income_id_category_income' => $IdCategory,
            'period_idperiod' => $idperiod,
            'date_income'=>$dateIncome
        );

        $this->db->set($data);
        $this->db->insert('income');
        $insert_id = $this->db->insert_id();
        return $insert_id > 0 ? true : false ;
    }
    
    public function CreateIncomeCategory($name,$IdUser){

        //Array con los datos del usuario
        $data = array(
            'name' => $name,
            'id_user'=>$IdUser
        );

        $this->db->set($data);
        $this->db->insert('category_income');
        $insert_id = $this->db->insert_id();
        return $insert_id > 0 ? true : false ;
    }

    public function UpdateIncome($name,$IdCategory,$dateIncome,$value,$IdUser,$IdIncome){

        //Array con los datos del usuario
        $data = array(
            'value' => $value,
            'name' => $name,
            'category_income_id_category_income' => $IdCategory,
            'date_income' => $dateIncome
        );

        $this->db->set($data);
        $this->db->where('id_income',$IdIncome);
        $this->db->update('income');
        return $this->db->affected_rows() > 0 ? true : false ;
    }

    public function UpdateCategoryIncome($name,$IdUser,$id_category){

        //Array con los datos del usuario
        $data = array(
            'name'=> $name
        );

        $this->db->set($data);
        $this->db->where('id_user',$IdUser);
        $this->db->where('id_category_income',$id_category);
        $this->db->update('category_income');
        return $this->db->affected_rows() > 0 ? true : false ;
    }

    public function DeleteCategoryIncome($IdIncome,$IdUser){

        //Array con los datos del usuario
        $data = array(
            'status'=> 0
        );

        $this->db->set($data);
        $this->db->where('id_user',$IdUser);
        $this->db->where('id_category_income',$IdIncome);
        $this->db->update('category_income');
        return $this->db->affected_rows() > 0 ? true : false ;
    }

    public function DeleteIncome($IdIncome){
        // $this->db->where('users_idusers',$users_idusers);
        $this->db->where('id_income',$IdIncome);
        $this->db->delete('income');
        return $this->db->affected_rows() > 0 ? true : false ;
    }

    public function ReadIncome($IdUser,$IdPeriod,$IdIncome){

        $this->db->select('*');
        $this->db->from('income');
        if($IdIncome>0){
            $this->db->where('IdIncome',$IdIncome);
        }
        $this->db->where('period_idperiod',$IdPeriod);
        // $this->db->where('$IdUser',$Iduser);
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    public function getCategoryIncomes($IdUser){

        $this->db->select('*');
        $this->db->from('category_income');
        $this->db->where('status',1);
        $this->db->where('id_user',$IdUser);
        $this->db->or_where('id_user',0);
        $this->db->order_by('name', 'ASC');
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }
}