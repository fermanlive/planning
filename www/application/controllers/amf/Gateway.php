<?php
/** 
 *  This file is part of amfPHP
 *
 * LICENSE
 *
 * This source file is subject to the license that is bundled
 * with this package in the file license.txt.
 * @package Amfphp
 */

/**
*  includes
*  */
require_once APPPATH . "/libraries/Amfphp/ClassLoader.php";

/* 
 * main entry point (gateway) for service calls. instanciates the gateway class and uses it to handle the call.
 * 
 * @package Amfphp
 * @author Ariel Sommeria-klein
 */
 class Gateway extends CI_Controller
 {
	function __construct()
	{	
		parent::__construct();
	
	}
	function index()
	{
		/*$config = new Amfphp_Core_Config();//do something with config object here
		//echo dirname(__FILE__);		
		
		$config->serviceFolderPaths = array(dirname(__FILE__) . "/services/");
		//$config->serviceFolderPaths = array(dirname(__FILE__) . "../../../models/");
		$gateway = Amfphp_Core_HttpRequestGatewayFactory::createGateway($config);
		
		//use this to change the current folder to the services folder. Be careful of the case.
		//This was done in 1.9 and can be used to support relative includes, and should be used when upgrading from 1.9 to 2.0 if you use relative includes
		//chdir(dirname(__FILE__) . "/Services");

		$gateway->service();
		$gateway->output();*/


		//require_once dirname(__FILE__) . '/../../Amfphp/ClassLoader.php';
		$config = new Amfphp_Core_Config();
		$config->serviceFolders = array(dirname(__FILE__) . '/services/'); ///ExampleServices/
		//$config->serviceFolders[] = array(dirname(__FILE__) . '/ServicesWithNamespace/', 'NService');
		//$voFolders = array(dirname(__FILE__) . '/Vo/');
		//add the folder with the namespace. 1st comes the pass, 2nd comes the namespace root.
		//$voFolders[] = array(dirname(__FILE__) . '/NamespaceVo/', 'NVo');
		//$config->pluginsConfig['AmfphpVoConverter'] = array('voFolders' => $voFolders);
		//set this to enforce vo conversion. If you do that, only sending UserVo1 shall work, not UserVo2
		//$config->pluginsConfig['AmfphpVoConverter']['enforceConversion'] => true;
		$gateway = Amfphp_Core_HttpRequestGatewayFactory::createGateway($config);
		$gateway->service();
		$gateway->output();
	}
 }