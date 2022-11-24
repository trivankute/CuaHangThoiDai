<?php
class config_default {
    private $privateKey = <<<EOD
    -----BEGIN RSA PRIVATE KEY-----
    MIICWgIBAAKBgHh57rzOUlJTY5sD8Y1FJMKyygL8IDCDbw6x7V4L7JeVSeS/145F
    axZfpCQYPDBYY3KSG383fUStzC+O5Ez+b3uDDjZN0cl3qOIACNfukLzXxHL5SQLe
    WJR2nZzSLIzxU9IrDLNpcQevZ2BvfMGfLSp9uYkZ4gTbAcpLNF8Xk3mHAgMBAAEC
    gYBo5ChCRBQSTz4Cgd111MRbq1QMYz0XX+d6UNlML2+OzlCmk4x19uR0d1Kuhlco
    9FupLaI5EbPD7tk+ctc8Xa3rDNmAYPvb7H7TlckFK6aietHQYJdhHdk2dksB1Dda
    qaISQo/5MexUeUuw6q/ZfMmwEXQY/23lv6gCSZ5o+MIXwQJBAOF4v9dexNRqyRoG
    hXJRbHH0dvWqkL3rUF5wRqdjCQE/KxPO/L636VVn1+DPTVJ4sdM5pVAbnw8sXaN3
    XZn1uuECQQCIydsl/9EG4uAr/hm8a3ht8NkHyb4ekWGwrtY44z8Zp5D90/hnn7fd
    vvh0nbSiZwUlEoJkHAX2/JskdAdk72lnAkBkJ/dP/FEC6syaOvtcZL7/f9C4ICRb
    uQPib41zHZMKcrz396JeNeP4hEBpJKz8TZDwe1Lr2tk1LEgMLSHvGjEBAkA/WTRr
    ubiFNubYmNo0X5UrXUI1kCHDKFMUrzO4rs1XRTopw1QkMVzGjh2kbDDukUVZsOPA
    FxZQFxaGYFHYVeP7AkB4ri8I6rmrWNeKRGV5aoTXVLtMbT1bVA31fkMXB5moSxOZ
    HVThPOiNTU4t+/Xp2/eLvDaqoDyFO0UxnvU9rte2
    -----END RSA PRIVATE KEY-----
    EOD;
    private $publicKey = <<<EOD
    -----BEGIN PUBLIC KEY-----
    MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHh57rzOUlJTY5sD8Y1FJMKyygL8
    IDCDbw6x7V4L7JeVSeS/145FaxZfpCQYPDBYY3KSG383fUStzC+O5Ez+b3uDDjZN
    0cl3qOIACNfukLzXxHL5SQLeWJR2nZzSLIzxU9IrDLNpcQevZ2BvfMGfLSp9uYkZ
    4gTbAcpLNF8Xk3mHAgMBAAE=
    -----END PUBLIC KEY-----
    EOD;


    // constructor

    public function getPrivateKey() {
        return $this->privateKey;
    }

    public function getPublicKey() {
        return $this->publicKey;
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