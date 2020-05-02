<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 * Clase encargada de las operaciones con el modelo de usuarios
 * en la base de datos.
 *

 */
class User_model extends CI_Model {

    public function __construct() {
        parent::__construct();  
        $this->load->helper('string');
        $this->load->helper('security');
        $this->load->helper('url');
    
    }

    public function CreateUser($email,$password,$name,$surname){

        $md5password = do_hash($password, 'md5');

        //Array con los datos del usuario
        $data = array(
            'email' => strtolower($email),
            'password' => $md5password,
            'name' => $name,
            'surname' => $surname,

        );

        $this->db->set($data);
        $this->db->insert('users');
        $insert_id = $this->db->insert_id();
        if($insert_id > 0){
            $result = [
                'status' => true,
                'message' => $insert_id
           ];
        }else{
             $result= [
                'status' => false,
                'message' => 'Usuario no Creado'
            ];
        }
        return  $result;
    }

    public function Login($email,$password){
        $email =strtolower($email);
        $md5password = do_hash($password, 'md5');

        
        $this->db->select('*');
        $this->db->from('users');
        $this->db->where('email',$email);
        $this->db->where('password',$md5password);
        $query = $this->db->get();
        $result = $query->result_array();
        
        if(count($query->result_array()) == 1){
            return $result[0];
        }else {
            return false;
        } 
    }

    public function EditUser($name,$surname,$idusers){

        //Array con los datos del usuario
        $data = array(
            'name' => $name,
            'surname' => $surname,
        );

        $this->db->set($data);
        $this->db->update('users');
        $this->db->where('idusers',$idusers);
        return $this->db->affected_rows() > 0 ? true : false ;
    }

    public function ChangePassword($password,$idusers){
        $md5password = do_hash($password, 'md5');
        //Array con los datos del usuario
        $data = array(
            'password' => $md5password
        ); 
        
        $this->db->where('idusers',$idusers);
        $this->db->update('users',$data);
        return $this->db->affected_rows() > 0 ? true : false ;
    }

    public function validateExistedUser($email){
        $email =strtolower($email);

        $this->db->select('*');
        $this->db->from('users');
        $this->db->where('email',$email);
        $query = $this->db->get();
    
        if(count($query->result_array()) >= 1 ){
            return true;
        }else {
            return false;
        } 
    }
}