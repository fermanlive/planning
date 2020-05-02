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

    public function defaultPeriod_get(){

        $date_start= date('Y-m-01');
        $date_end = date('Y-m-t');
        $idusers = $this->get('idusers');
        $name = "primer periodo";

        $createDefault = $this->period_model->CreatePeriod($date_start,$date_end,$name,$idusers);
        $this->response( [
            'status' => true,
            'message' => 'creado'
        ], 200 );
    }
    
}