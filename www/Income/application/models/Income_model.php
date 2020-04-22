<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 * Clase encargada de las operaciones con el modelo de usuarios
 * en la base de datos.
 *
 * @author Andrés Cruz <andres@code-labs.com>
 * @author Developer <info@code-labs.com>
 */
class Income_model extends CI_Model {

    public function __construct() {
        parent::__construct();  
        $this->load->helper('string');
        $this->load->helper('url');
    
    }

    public function CreateIncome($value,$name,$typeCategory,$Iduser){

        //Array con los datos del usuario
        $data = array(
            'value' => $value,
            'name' => $name,
            'typeCategory' => $typeCategory,
            'Iduser' => $Iduser,
        );

        $this->db->set($data);
        $this->db->insert('Income');
        $insert_id = $this->db->insert_id();
        return $insert_id > 0 ? true : false ;
    }

    public function EditIncome($value,$name,$typeCategory,$Iduser){

        //Array con los datos del usuario
        $data = array(
            'value' => $value,
            'name' => $name,
            'typeCategory' => $typeCategory,
            'Iduser' => $Iduser,
        );

        $this->db->set($data);
        $this->db->update('Income');
        $this->db->where('Iduser',$Iduser);
        return $this->db->affected_rows() > 0 ? true : false ;
    }

    public function getIncome($IdIncome,$Iduser){

        $this->db->select('*');
        $this->db->from('Income');
        $this->db->where('IdIncome',$IdIncome);
        $this->db->where('Iduser',$Iduser);
        $query = $this->db->get();
        $result = $query->result_array();
        
        if(count($query->result_array()) == 1){
            return $result[0];
        }else {
            return false;
        } 
    }

    public function getIncomes($Iduser,$period){

        $this->db->select('*');
        $this->db->from('Income');
        $this->db->where('Iduser',$Iduser);
        $query = $this->db->get();
        $result = $query->result_array();
    
        return $result;
    }


}