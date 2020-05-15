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
        if($insert_id > 0){
           $result=[
                'status' => true,
                'message' => $insert_id
            ] ;
        }else{
            $result=[
                'status' => false,
                'message' => ''
            ] ;
        }
        return $result ;
    }

    public function ReadPeriod($idusers,$idperiod){

        $this->db->select('*');
        $this->db->from('period');
        if($idperiod > 0){
            $this->db->where('idperiod',$idperiod);
        } 

        $this->db->where('users_idusers',$idusers);
        $query = $this->db->get();
        $result = $query->result_array();
        $result = count($result)> 0 ? $result: [];
        if(count($result)==1){
            $result = $result[0] ;
        }
        return $result;
    }
    public function getDefaultPeriod($idusers){

        $this->db->select('
        DATE_FORMAT(current_timestamp,"%Y-%m-%d") as Todayformat,
        DATE_FORMAT(date_start,"%Y-%m-%d") as date_start,
        DATE_FORMAT(date_end,"%Y-%m-%d") as date_end,
        idperiod');
        $this->db->from('period');
        $this->db->where('status',1);
        $this->db->where('users_idusers',$idusers);
        $query = $this->db->get();
        $periods = $query->result();
        $idperiod=0;
        foreach ($periods as $period ) {
            $today = strtotime($period -> Todayformat);
            $date_start = strtotime($period -> date_start);
            $date_end = strtotime($period -> date_end);

            if(($today >= $date_start) && ($today <= $date_end)){
               $idperiod = $period -> idperiod;
            }
        }
        if($idperiod==0){
            $date_start= date('Y-m-01');
            $date_end = date('Y-m-t');
            $name = "Periodo Nuevo"; 
            $result=$this->CreatePeriod($date_start,$date_end,$name,$idusers);
            $idperiod=$result['message'];
        } 
        return $idperiod;
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