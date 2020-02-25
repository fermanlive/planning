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
            'email' => $email,
            'password' => $md5password,
            'name' => $name,
            'surname' => $surname,

        );

        $this->db->set($data);
        $this->db->insert('Users');
        $insert_id = $this->db->insert_id();
        return $insert_id > 0 ? true : false ;
    }
}