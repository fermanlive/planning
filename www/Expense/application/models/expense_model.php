<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 * Clase encargada de las operaciones con el modelo de usuarios
 * en la base de datos.
 *

 */
class Expense_model extends CI_Model {

    public function __construct() {
        parent::__construct();  
        $this->load->helper('string');
        $this->load->helper('url');
    
    }

    public function CreateExpense($name,$IdCategory,$dateExpense,$value,$IdPeriod){

        //Array con los datos del usuario
        $data = array(
            'value' => $value,
            'name' => $name,
            'category_expense_id_category_expense' => $IdCategory,
            'date_expense' => $dateExpense,
            'value' => $value,
            'period_idperiod' => $IdPeriod,
        );

        $this->db->set($data);
        $this->db->insert('expense');
        $insert_id = $this->db->insert_id();
        return $insert_id > 0 ? true : false ;
    }

    public function UpdateExpense($name,$IdCategory,$dateExpense,$value,$IdUser,$IdExpense){

        //Array con los datos del usuario
        $data = array(
            'value' => $value,
            'name' => $name,
            'category_expense_id_category_expense' => $IdCategory,
            'date_expense' => $dateExpense,
        );

        $this->db->set($data);
        $this->db->where('id_expense',$IdExpense);
        $this->db->update('expense');
        
        return $this->db->affected_rows() > 0 ? true : false ;
    }

    public function UpdateCategoryExpense($name,$IdCategory,$IdUser){

        //Array con los datos del usuario
        $data = array(
            'name' => $name
        );

        $this->db->set($data);
        $this->db->where('id_user',$IdUser);
        $this->db->where('id_category_expense',$IdCategory);
        $this->db->update('category_expense');
        
        return $this->db->affected_rows() > 0 ? true : false ;
    }
    public function DeleteExpense($IdUser,$IdExpense){

        //Array con los datos del usuario
        $data = array(
            'status' => 0
        );

        $this->db->set($data);
        $this->db->where('id_expense',$IdExpense);
        $this->db->update('expense');
        
        return $this->db->affected_rows() > 0 ? true : false ;
    }

    public function DeleteCategoryExpense($IdUser,$IdCategory){

        //Array con los datos del usuario
        $data = array(
            'status' => 0
        );

        $this->db->set($data);
        $this->db->where('id_category_expense',$IdCategory);
        $this->db->where('id_user',$IdUser);
        $this->db->update('category_expense');
        
        return $this->db->affected_rows() > 0 ? true : false ;
    }



    public function ReadExpense($IdUser,$IdPeriod,$id_expense){

        $this->db->select('*');
        $this->db->from('expense');
        if($id_expense>0){
            $this->db->where('id_expense',$id_expense);
        }
        $this->db->where('status',1);
        $this->db->where('period_idperiod',$IdPeriod);
        // $this->db->where('$IdUser',$Iduser);
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    public function getCategoryExpense($IdUser){

        $this->db->select('*');
        $this->db->from('category_expense');
        $this->db->order_by('name', 'ASC');
        $this->db->where('id_user',$IdUser);
        $this->db->where('status',1);
        $this->db->or_where('id_user',0);
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }
    


}