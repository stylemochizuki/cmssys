<?php
/**
 * サイト構築設定ファイル
 *
 * 本ファイルにはサイト設定において必要なデータや関数を用意するものです。
 * サイト全体に影響する設定となるので、ページ毎で設定する場合は本ファイルには記載しないでください。
 * 主に、文字コードの設定や、URLパスの補足等を記述しています。
 *
 * PHP 5
 *
 * @category Admin
 * @package  Admin Seting
 * @author   望月@スタイルサーチ
 * @category 2013 - StyleSearch
 * @version  1.0.3
 * @since    2013-07-29
 */

/* -- ▽ 設定 ▽ -- */

/** @var string BASEパス( ホストからの位置 ) */
define( 'HOST_ADDRESS' , "/~labo/cms" );

/** @var string 基本文字コードタイプ */
define( 'CHAR_CODE' , "UTF-8" );

/** @var string メール文字コードタイプ */
define( 'MAIL_CHAR_CODE' , "JIS" );

/* -- △ 設定 △ -- */


// -- 以降の変更は基本なし

/* -- 文字コード -- */

setlocale( LC_ALL , "ja_JP." . CHAR_CODE ); // PHP内部
mb_internal_encoding( CHAR_CODE );          // MBString系
mb_http_input( CHAR_CODE );                 // HTTP
mb_http_output( CHAR_CODE );                // HTML
// MAIL
switch ( strtoupper( MAIL_CHAR_CODE ) ) {
	// JIS
	case "JIS" :
	case "ISO-2022-JP" :
		mb_language( "ja" );
	// UTF-8
	case "UTF-8" :
		mb_language( "uni" );
		break;
	// English
	default :
		mb_language( "en" );
		break;
}
// SQL
switch ( strtoupper( CHAR_CODE ) ) {
	// Shift-JIS
	case "SJIS" :
	case "SHIFT_JIS" :
		/** @var string MySQL文字コードタイプ */
		define( 'MYSQL_CHAR_CODE' , "cp932" );
		break;

	// EUC-JP
	case "EUC-JP" :
		/** @var string MySQL文字コードタイプ */
		define( 'MYSQL_CHAR_CODE' , "eucjpms" );
		break;

	// JIS , UTF-8( JIS専用のコードはない )
	case "JIS" :
	case "ISO-2022-JP" :
	case "UTF-8" :
		/** @var string MySQL文字コードタイプ */
		define( 'MYSQL_CHAR_CODE' , "utf8" );
		break;

	// ASCII
	default :
		/** @var string MySQL文字コードタイプ */
		define( 'MYSQL_CHAR_CODE' , "ascii" );
		break;
}


/* -- URL設定 -- */

// URL変数の宣言
$_URL = array();

/** @var string URL:ホストアドレス */
$_URL[ 'HOST' ] = ( $_SERVER[ 'HTTPS' ] ? "https://" : "http://" ) . $_SERVER[ 'HTTP_HOST' ];

/** @var string URL:現在のURL */
$_URL[ 'MY' ] = $_URL[ 'HOST' ] . $_SERVER[ 'REQUEST_URI' ];

/** @var string URL:ベースルートアドレス */
$_URL[ 'ROOT' ] = $_URL[ 'HOST' ] . HOST_ADDRESS;
if ( substr( $_URL[ 'ROOT' ] , -1 ) !== "/" ) $_URL[ 'ROOT' ] .= "/";

/** @var string URL:ディレクトリパス */
$_URL[ 'DIR' ] = ( substr( $_URL[ 'MY' ] , -1 ) === "/" ? $_URL[ 'MY' ] : dirname( $_URL[ 'MY' ] ) . "/" );

/** @var string URL:ベースルートへの相対アドレス */
$_URL[ 'CURRENT' ] = "";

// 情報収集
$len_rot = strlen( $_URL[ 'ROOT' ] );
// ベースと同等か深い
if ( isset( $_URL[ 'DIR' ]{ $len_rot - 1 } ) ) $_URL[ 'CURRENT' ] = preg_replace( '|[^/]+/|' , "../" , substr( $_URL[ 'DIR' ] , $len_rot ) );
// ベースより浅い
else $_URL[ 'CURRENT' ] = substr( $_URL[ 'ROOT' ] , strlen( $_URL[ 'DIR' ] ) );
if ( $_URL[ 'CURRENT' ] === "" ) $_URL[ 'CURRENT' ] = "./";
unset( $len_rot );

// 調整
$_URL[ 'HOST' ] .= "/";


/* -- パス設定 -- */

// パス変数の宣言
$_PATH = array();
// 実行情報
$trace = debug_backtrace();

/** @var string パス:ドキュメントルートのフルパス */
$_PATH[ 'HOST' ] = $_SERVER[ 'DOCUMENT_ROOT' ];

/** @var string パス:現在のファイルパス */
$_PATH[ 'MY' ] = strtr( $trace[ 0 ][ 'file' ] , "\\" , "/" );

/** @var string パス:ベースルートのフルパス */
$_PATH[ 'ROOT' ] = strtr( dirname( dirname( __FILE__ ) ) , "\\" , "/" ) . "/";

/** @var string パス:ディレクトリパス */
$_PATH[ 'DIR' ] = ( substr( $_PATH[ 'MY' ] , -1 ) === "/" ? $_PATH[ 'MY' ] : dirname( $_PATH[ 'MY' ] ) . "/" );

/** @var string パス:ベースルートへの相対パス */
$_PATH[ 'CURRENT' ] = "";

// 情報収集
$len_rot = strlen( $_PATH[ 'ROOT' ] );
// ベースと同等か深い
if ( isset( $_PATH[ 'DIR' ]{ $len_rot - 1 } ) ) $_PATH[ 'CURRENT' ] = preg_replace( '|[^/]+/|' , "../" , substr( $_PATH[ 'DIR' ] , $len_rot ) );
// ベースより浅い
else $_PATH[ 'CURRENT' ] = substr( $_PATH[ 'ROOT' ] , strlen( $_PATH[ 'DIR' ] ) );
if ( $_PATH[ 'CURRENT' ] === "" ) $_PATH[ 'CURRENT' ] = "./";
unset( $len_rot );
unset( $trace );

// 調整
$_PATH[ 'HOST' ] .= "/";


/* -- セッション -- */

session_start();
// session_regenerate_id( true );


/* -- MagicQuots -- */

// ServerのMagicQuotsが有効時
if ( get_magic_quotes_gpc() === 1 ) {
	/**
	 * MagicQuotsの無効化
	 * @param mixed $src 変換するデータ
	 * @return mixed 変換済みデータ
	 */
	function MAGIC_Del( $src ) { return( is_array( $src ) ? array_map( "MAGIC_Del" , $src ) : stripslashes( $src ) ); }

	// MagicQuotsの無効化
	$_GET = MAGIC_Del( $_GET );
	$_POST = MAGIC_Del( $_POST );
	$_REQUEST = MAGIC_Del( $_REQUEST );
	$_COOKIE = MAGIC_Del( $_COOKIE );
}


/* -- GET/POSTの文字コードを取得 -- */

/** @var string GETの文字コード */
$_ENCODE[ 'GET' ] = "auto"; // GET
/** @var string POSTの文字コード */
$_ENCODE[ 'POST' ] = "auto"; // POST

// GETの文字コードヒント
if ( isset( $_GET[ 'encode_char_hint' ] ) ) {
	$_ENCODE[ 'GET' ] = mb_detect_encoding( $_GET[ 'encode_char_hint' ] );
	unset( $_GET[ 'encode_char_hint' ] );
}
// POSTの文字コードヒント
if ( isset( $_POST[ 'encode_char_hint' ] ) ) {
	$_ENCODE[ 'POST' ] = mb_detect_encoding( $_POST[ 'encode_char_hint' ] );
	unset( $_POST[ 'encode_char_hint' ] );
}


/* -- GET解析 -- */

if ( isset( $_GET[ 'argv' ]{ 0 } ) ) {
	// 変数の宣言
	$name = "";
	$value = "";
	$pos = array();
	// 名前と値に切り分ける
	foreach ( explode( "/" , substr( $_GET[ 'argv' ] , 1 ) ) as $name => $value ) {
		if ( $value ) {
			$_GET[ $name ] = $value;
			// "-"がある場合はさらに分解
			$pos = strpos( $value , "-" );
			if ( $pos !== false ) {
				$name = substr( $value , 0 , $pos );
				$_GET[ $name ] = substr( $value , $pos + 1 );
			}
		}
	}
	// 変数の破棄
	unset( $value );
	unset( $name );
}