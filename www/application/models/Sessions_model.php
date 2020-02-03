<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class Sessions_model extends CI_Model {

    public function __construct() {
        parent::__construct();    
        $this->load->helper('security');
        $this->load->library('session');

    }

    public function saveRegister($name,$email,$password) {
        $password = do_hash($password, 'md5');

        $data_insert = array(
            'Username' => $name,
            'email' => $email,
            'password' => $password,
        );

        $this->db->set($data_insert);
        $this->db->insert('user');
        $id = $this->db->insert_id();
        $result = ($id>0) ?  1 : 0 ;
        return $result;  
    }

    public function DoLogin($email,$password){
        $password = do_hash($password, 'md5'); 
        $this->db->select("*");
        $this->db->from("user");
        $this->db->where("email",$email); 
        $this->db->where("password",$password); 

        $query = $this->db->get();
        if($query->num_rows()>0){
            $userinfo = $query->result();  
            $newdata = array(
                    'iduser'     => $userinfo[0]->iduser,
                    'Username'  => $userinfo[0]->Username,
                    'email'     => $userinfo[0]->email,
                    'logged_in' => TRUE
            );
            $this->session->set_userdata($newdata);
            return 1;
        }else{
            return 0;
        }
        
    }

}
