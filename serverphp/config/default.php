<?php
class config_default {
    private $key = 'trivandeptrai';
    private $accessTokenTtl = 60; // seconds
    private $refreshTokenTtl = 120; // seconds
    private $cookiePath = "/";
    private $domain = "localhost";

    public function getKey() {
        return $this->key;
    }

    public function getAccessTokenTtl() {
        return $this->accessTokenTtl;
    }

    public function getRefreshTokenTtl() {
        return $this->refreshTokenTtl;
    }

    public function getCookiePath() {
        return $this->cookiePath;
    }

    public function getDomain() {
        return $this->domain;
    }
}

?>