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

    public function CreateSave($current_value,$name,$goal,$users_idusers){

        //Array con los datos del usuario
        $data = array(
            'current_value' => $current_value,
            'name' => $name,
            'goal' => $goal,
            'users_idusers' => $users_idusers,
        );

        $this->db->set($data);
        $this->db->insert('Save');
        $insert_id = $this->db->insert_id();
        return $insert_id > 0 ? true : false ;
    }

    public function getSave($IdSave,$users_idusers){
        $this->db->select('*');
        $this->db->from('Save');
        if($IdSave > 0){
            $this->db->where('id_saves',$IdSave);
        } 
        $this->db->where('users_idusers',$users_idusers);
        $query = $this->db->get();
        $result = $query->result_array();
        $result = count($result)> 0 ? $result: [];
        return $result;
    }

    public function EditSave($current_value,$name,$goal,$users_idusers,$IdSave){

        //Array con los datos del usuario
        $data = array(
            'current_value' => $current_value,
            'name' => $name,
            'goal' => $goal
        );

        $this->db->set($data);
        $this->db->where('id_saves',$IdSave);
        $this->db->where('users_idusers',$users_idusers);
        $this->db->update('Save');
        return $this->db->affected_rows() > 0 ? true : false ;
    }

    public function DeleteSave($IdSave,$users_idusers){
        $this->db->where('users_idusers',$users_idusers);
        $this->db->where('id_saves',$IdSave);
        $this->db->delete('Save');
        return $this->db->affected_rows() > 0 ? true : false ;
    }



}