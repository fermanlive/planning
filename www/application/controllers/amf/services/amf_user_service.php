<?php
/** 
 * Controlador con los servicios correspondientes al usuario
 * [author] Andrés Cruz <andres@code-labs.com>
 * [author] Developer <info@code-labs.com>
 */

class Amf_user_service extends CI_Controller {

  public function __construct() {
    parent::__construct();
    $this->load->model('user_model');
  }



  /**
   * [changePassword función que reemplaza la contraseña por la seleccionada por el usuario]
   *
   * @param [String] $origin [validador de dispositivo]
   * @param [String] $hash [token del usuario]
   * @param [int] $userId [id del usuario]
   * @param [String] $pass [password del usuario]
   * @param [String] $email [email del usuario]
   * @param [String] $names [nombres del usuario]
   * @return void
   */
  public function changePassword($origin, $hash, $userId, $pass, $email, $names){
    return $this->user_model->changePassword($origin, $hash, $userId, $pass, $email, $names);
  }


  /**
  * [doLogin Función que me verifica si el usuario se encuentra registrado en la base de datos]
  *
  * @param [string] $email [email del usuario]
  * @param [string] $pass [password del usuario]
  * @param [String] $origin [validador de dispositivo]
  * @return [int] [-1 si el validador esta errado, 1 si el usuario existe, 0 si el usuario no existe, 2 el email existe pero el password esta errado]
  */
  public function doLogin($email, $pass, $origin){
    return $this->user_model->doLogin($email, $pass, $origin);
  }

  /**
   * [endSession Función que destruye la sesión]
   *
   * @return [boolean] [retorna true al momento de destruir la sesión]
   */
  public function endSession(){
    return $this->user_model->endSession();
  }

  /**
   * [forgotPassword función que genera y envia la nueva contraseña del usuario]
   *
   * @param [string] $email [email del usuario]
   * @return [int] -1 si el usuario no existe, 1 si el proceso es exitoso y el correo fue enviado, y -4 si hay problemas con el envío de email
   */
  public function forgotPassword($email){
    return $this->user_model->forgotPassword($email);
  }
}
