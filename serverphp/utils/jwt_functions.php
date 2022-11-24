<?php
// include vendor
require_once __DIR__ . "/../vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
// ExpiredException
use Firebase\JWT\ExpiredException;
// BeforeValidException
use Firebase\JWT\BeforeValidException;
// SignatureInvalidException
use Firebase\JWT\SignatureInvalidException;
include_once __DIR__ . "/../config/default.php";
include_once __DIR__ . "/../global/index.php";

class jwt_functions {
    private $default;
    // constructor
    public function __construct() {
        $this->default = new config_default();
    }
    public function createToken($data){
        $token = JWT::encode($this->default->createPayload($data), $this->default->getPrivateKey(), 'RS256');
        return $token;
    }
    public function decodeToken($token){
        try {
            $decoded = JWT::decode($token, new Key($this->default->getPublicKey(), 'RS256'));
            return $decoded;
        } catch (InvalidArgumentException $e) {
            // provided key/key-array is empty or malformed.
        } catch (DomainException $e) {
            // provided algorithm is unsupported OR
            // provided key is invalid OR
            // unknown error thrown in openSSL or libsodium OR
            // libsodium is required but not available.
        } catch (SignatureInvalidException $e) {
            // provided JWT signature verification failed.
        } catch (BeforeValidException $e) {
            // provided JWT is trying to be used before "nbf" claim OR
            // provided JWT is trying to be used before "iat" claim.
        } catch (ExpiredException $e) {
            // provided JWT is trying to be used after "exp" claim.'
            echo json_encode(['status'=>"error", ["data"=>$e->getMessage()]]);
        } catch (UnexpectedValueException $e) {
            // provided JWT is malformed OR
            // provided JWT is missing an algorithm / using an unsupported algorithm OR
            // provided JWT algorithm does not match provided key OR
            // provided key ID in key/key-array is empty or invalid.
        }
    }
}
?>