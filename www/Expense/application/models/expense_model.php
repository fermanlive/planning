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

    public function CreateExpense($value,$name,$typeCategory,$Iduser){

        //Array con los datos del usuario
        $data = array(
            'value' => $value,
            'name' => $name,
            'typeCategory' => $typeCategory,
            'Iduser' => $Iduser,
        );

        $this->db->set($data);
        $this->db->insert('Expense');
        $insert_id = $this->db->insert_id();
        return $insert_id > 0 ? true : false ;
    }

    public function EditExpense($value,$name,$typeCategory,$Iduser){

        //Array con los datos del usuario
        $data = array(
            'value' => $value,
            'name' => $name,
            'typeCategory' => $typeCategory,
            'Iduser' => $Iduser,
        );

        $this->db->set($data);
        $this->db->update('Expense');
        $this->db->where('Iduser',$Iduser);
        return $this->db->affected_rows() > 0 ? true : false ;
    }


    public function ReadExpense($IdUser,$IdPeriod,$id_expense){

        $this->db->select('*');
        $this->db->from('expense');
        if($id_expense>0){
            $this->db->where('id_expense',$id_expense);
        }
        $this->db->where('period_idperiod',$IdPeriod);
        // $this->db->where('$IdUser',$Iduser);
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    public function getCategoryExpense(){

        $this->db->select('*');
        $this->db->from('category_expense');
        $this->db->order_by('name', 'ASC');
        $query = $this->db->get();
        $result = $query->result_array();
        return $result;
    }



}