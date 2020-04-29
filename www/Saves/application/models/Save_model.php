<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 * Clase encargada de las operaciones con el modelo de usuarios
 * en la base de datos.
 *

 */
class Save_model extends CI_Model {

    public function __construct() {
        parent::__construct();  
        $this->load->helper('string');
        $this->load->helper('url');
    
    }

    public function CreateSave($value,$name,$typeCategory,$Iduser){

        //Array con los datos del usuario
        $data = array(
            'value' => $value,
            'name' => $name,
            'typeCategory' => $typeCategory,
            'Iduser' => $Iduser,
        );

        $this->db->set($data);
        $this->db->insert('Save');
        $insert_id = $this->db->insert_id();
        return $insert_id > 0 ? true : false ;
    }

    public function EditSave($value,$name,$typeCategory,$Iduser){

        //Array con los datos del usuario
        $data = array(
            'value' => $value,
            'name' => $name,
            'typeCategory' => $typeCategory,
            'Iduser' => $Iduser,
        );

        $this->db->set($data);
        $this->db->update('Save');
        $this->db->where('Iduser',$Iduser);
        return $this->db->affected_rows() > 0 ? true : false ;
    }

    public function getSave($IdSave,$Iduser){

        $this->db->select('*');
        $this->db->from('Save');
        $this->db->where('IdSave',$IdSave);
        $this->db->where('Iduser',$Iduser);
        $query = $this->db->get();
        $result = $query->result_array();
        
        if(count($query->result_array()) == 1){
            return $result[0];
        }else {
            return false;
        } 
    }

    public function getSaves($Iduser,$period){

        $this->db->select('*');
        $this->db->from('Save');
        $this->db->where('Iduser',$Iduser);
        $query = $this->db->get();
        $result = $query->result_array();
    
        return $result;
    }


}