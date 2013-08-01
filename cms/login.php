<?php
/* -- include -- */

include "api/admin.php"; // 設定
include "api/short.php"; // 省略
include "api/database.php"; // データベース


/* -- variable -- */

$db = null; // データベース
$data = array();


/* -- execution -- */



/* -- html -- */

include "des/" . basename( __FILE__ , ".php" ) . ".ctp";