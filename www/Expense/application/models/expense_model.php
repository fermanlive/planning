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

    public function getExpense($IdExpense,$Iduser){

        $this->db->select('*');
        $this->db->from('Expense');
        $this->db->where('IdExpense',$IdExpense);
        $this->db->where('Iduser',$Iduser);
        $query = $this->db->get();
        $result = $query->result_array();
        
        if(count($query->result_array()) == 1){
            return $result[0];
        }else {
            return false;
        } 
    }

    public function getExpenses($Iduser,$period){

        $this->db->select('*');
        $this->db->from('Expense');
        $this->db->where('Iduser',$Iduser);
        $query = $this->db->get();
        $result = $query->result_array();
    
        return $result;
    }


}