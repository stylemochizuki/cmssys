<?php
/* -- include -- */

include "api/admin.php"; // 設定
include "api/short.php"; // 省略
include "api/password.php"; // パスワード
include "api/database.php"; // データベース


/* -- variable -- */

$db = null; // データベース
$data = array();

// Input Data
$time = time();
$error = 0;
$id = "";
$password = "";
$checked = false;


/* -- execution -- */

// セッション
session_regenerate_id( true ); // IDシャッフル
$_SESSION[ 'user' ] = array();

// ユーザー
$db = new Database( "user" );
// ユーザーが居る場合
if ( $db->is() ) {
	header( "Location: " . $_URL[ 'ROOT' ] );
	exit();
}

// 入力がある
if ( isset( $id{ 0 } ) ) {
	// ユーザーIDとパスワードを調べる
	$data = $db->get_line( array( 'where' => "`id` === '" . $db->esc( $id ) . "' && `password` === '" . $db->esc( createPassword( $password ) ) . "'" ) );
	// データがあればログイン成功
	if ( $data ) {
		// ユーザー情報
		$_SESSION[ 'user' ][ 'login' ] = true;
		$_SESSION[ 'user' ][ 'id' ] = $id;
		$_SESSION[ 'user' ][ 'password' ] = $password;
		$_SESSION[ 'user' ][ 'name' ] = $data[ 'name' ];
		$_SESSION[ 'user' ][ 'access' ] = $data[ 'access' ];
		// クッキーへ保存
		if ( $checked ) {
			setcookie( "user[login]" , true , $time + 604800 );
			setcookie( "user[id]" , $id , $time + 2592000 );
			setcookie( "user[password]" , $password , $time + 2592000 );
			setcookie( "user[checked]" , true , $time + 2592000 );
		}
	}
	// 失敗
	else {
		$error = 1;
	}
	// クッキーから削除
	if ( !$checked ) {
		setcookie( "user[login]" , "" , $time - 1 );
		setcookie( "user[id]" , "" , $time - 1 );
		setcookie( "user[password]" , "" , $time - 1 );
		setcookie( "user[checked]" , "" , $time - 1 );
	}
}


/* -- html -- */

include "des/" . basename( __FILE__ , ".php" ) . ".ctp";