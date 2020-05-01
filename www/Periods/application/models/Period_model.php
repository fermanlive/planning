<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 * Clase encargada de las operaciones con el modelo de usuarios
 * en la base de datos.
 *

 */
class Period_model extends CI_Model {

    public function __construct() {
        parent::__construct();  
        $this->load->helper('string');
        $this->load->helper('url');
    
    }

    public function CreatePeriod($date_start,$date_end,$name,$idusers){

        //Array con los datos del usuario
        $data = array(
            'date_start' => $date_start,
            'date_end' => $date_end,
            'users_idusers' => $idusers,
            'name' => $name,
        );

        $this->db->set($data);
        $this->db->insert('period');
        $insert_id = $this->db->insert_id();
        return $insert_id > 0 ? true : false ;
    }

    public function ReadPeriod($idusers,$idperiod){

        $this->db->select('*');
        $this->db->from('period');
        if($idperiod > 0){
            $this->db->where('idperiod',$idperiod);
        } 

        $this->db->where('Iduser',$Iduser);
        $query = $this->db->get();
        $result = $query->result_array();
        $result = count($result)> 0 ? $result: [];
        return $result;
    }

    public function UpdatePeriod($date_start,$date_end,$name,$idusers,$idperiod){

        //Array con los datos del usuario
        $data = array(
            'date_start' => $date_start,
            'date_end' => $date_end,
            'name' => $name
        );

        $this->db->set($data);
        $this->db->where('idusers',$idusers);
        $this->db->where('idperiod',$idperiod);
        $this->db->update('period');
        return $this->db->affected_rows() > 0 ? true : false ;
    }

    public function DeletePeriod($idusers,$idperiod){

        //Array con los datos del usuario
        $data = array(
            'status' => 0 //eliminado
        );

        $this->db->set($data);
        $this->db->where('idusers',$idusers);
        $this->db->where('idperiod',$idperiod);
        $this->db->update('period');
        return $this->db->affected_rows() > 0 ? true : false;
    }





}