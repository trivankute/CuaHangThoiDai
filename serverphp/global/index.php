<?php
///////////////////////////////////////////////////////
    // database link and defaults
    include_once __DIR__ . "/../config/db.php";
    // require_once("./config/default.php");
///////////////////////////////////////////////////////
    // composer
    // require_once("./vendor/autoload.php");
///////////////////////////////////////////////////////
    // models
    include_once __DIR__ . "/../model/account.php";
    include_once __DIR__ . "/../model/album.php";
    include_once __DIR__ . "/../model/page.php";
    include_once __DIR__ . "/../model/review.php";
    include_once __DIR__ . "/../model/blog.php";
    include_once __DIR__ . "/../model/user.php";
    include_once __DIR__ . "/../model/artist.php";
    include_once __DIR__ . "/../model/transaction.php";
    include_once __DIR__ . "/../model/carousel.php";
    include_once __DIR__ . "/../model/footer.php";
    include_once __DIR__ . "/../model/music.php";
    // cors
    include_once __DIR__ . "/../middlewares/cors.php";
    use Cloudinary\Configuration\Configuration;
    $global_db = new db();
    $global_conn = $global_db->connect();
    $global_account = new Account($global_conn);
    $global_album = new Album($global_conn);
    $global_page = new Page($global_conn);
    $global_blog = new Blog($global_conn);
    $global_review = new Review($global_conn);
    $global_user = new User($global_conn);
    $global_artist = new Artist($global_conn);
    $global_transaction = new Transaction($global_conn);
    $global_carousel = new Carousel($global_conn);
    $global_music = new Music($global_conn);
    $global_footer = new Footer($global_conn);
    $config = Configuration::instance();
    $config->cloud->cloudName = 'dotr7u5kq';
    $config->cloud->apiKey = '134487557496353';
    $config->cloud->apiSecret = 'zMIHrTp6nE36mC6J6bcRDXcKg8o';
    $config->url->secure = true;
    $token;
?>