<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Periods extends RestController {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model('period_model');
    }

    public function users_get()
    {
        // Users from a data store e.g. database
        $users = [
            ['id' => 0, 'name' => 'John', 'email' => 'john@example.com'],
            ['id' => 1, 'name' => 'Jim', 'email' => 'jim@example.com'],
        ];

        $id = $this->get( 'id' );

        if ( $id === null )
        {
            // Check if the users data store contains users
            if ( $users )
            {
                // Set the response and exit
                $this->response( $users, 200 );
            }
            else
            {
                // Set the response and exit
                $this->response( [
                    'status' => false,
                    'message' => 'No users were found'
                ], 404 );
            }
        }
        else
        {
            if ( array_key_exists( $id, $users ) )
            {
                $this->response( $users[$id], 200 );
            }
            else
            {
                $this->response( [
                    'status' => false,
                    'message' => 'No such user found'
                ], 404 );
            }
        }
    }

    public function CreatePeriod_get(){   

        $date_start = $this->get('datestart');
        $date_end = $this->get('dateend');
        $idusers = $this->get('idusers');
        $name = $this->get('name');

        $CreatePeriod = $this->period_model->CreatePeriod($date_start,$date_end,$idusers,$name);
        if($CreatePeriod){
            $this->response( [
                'status' => true,
                'message' => 'Periodo creado'
            ], 200 );
        }else{
            $this->response( [
                'status' => false,
                'message' => 'Periodo no creado'
            ], 404 );
        }    
    }

    public function ReadPeriod_get(){   

        $idusers = $this->get('idusers');
        $idperiod = $this->get('idperiod');
        $idperiod = $idperiod == null ? 0: $idperiod ;

        $ReadPeriod = $this->period_model->ReadPeriod($idusers,$idperiod);
        if($ReadPeriod){
            $this->response( [
                'status' => true,
                'message' => $ReadPeriod
            ], 200 );
        }else{
            $this->response( [
                'status' => false,
                'message' => $ReadPeriod
            ], 404 );
        }    
    }

    public function UpdatePeriod_get(){   

        $date_start = $this->get('datestart');
        $date_end = $this->get('dateend');
        $name = $this->get('name');
        $idusers = $this->get('idusers');
        $idperiod = $this->get('idperiod');

        $UpdatePeriod = $this->period_model->UpdatePeriod($date_start,$date_end,$name,$idusers,$idperiod);
        if($UpdatePeriod){
            $this->response( [
                'status' => true,
                'message' => 'Periodo actualizado'
            ], 200 );
        }else{
            $this->response( [
                'status' => false,
                'message' => 'Periodo no actualizado'
            ], 404 );
        }    
    }

    public function DeletePeriod_get(){   
        $idusers = $this->get('idusers');
        $idperiod = $this->get('idperiod');

        $DeletePeriod = $this->period_model->DeletePeriod($idusers,$idperiod);
        if($DeletePeriod){
            $this->response( [
                'status' => true,
                'message' => 'Periodo eliminado'
            ], 200 );
        }else{
            $this->response( [
                'status' => false,
                'message' => 'Periodo no eliminado'
            ], 404 );
        }    
    }
    
}