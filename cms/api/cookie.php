<?php
/**
 * クッキー管理
 *
 * クッキーを制御、管理します。
 *
 * PHP Versions 4 or 5
 *
 * @author    望月＠スタイルサーチ<t.mochizuki@stylesearch.jp>
 * @copyright 2013 StyleSearch
 * @version   1.0.0
 * @since     2013/03/20
 **/

/**
 * クッキーの開始
 *
 * この関数宣言後は必ず cookie_commit を呼んでください。
 */
function cookie_start()
{
	// 分解
	if ( $_COOKIE ) foreach ( $_COOKIE as $key => $value ) {
		// 配列
		if ( is_array( $value ) ) _cookie_start( $key , $value );
		// 変数
		else setcookie( $key , "" , 1 );
	}
}

/**
 * クッキーの開始
 *
 * この関数宣言後は必ず cookie_commit を呼んでください。
 *
 * @param string $name 保存名
 * @param array $cookie 保存する内容
 */
function _cookie_start( $name , $cookie )
{
	// 値が空ではない
	if ( $cookie ) {
		// 配列
		foreach ( $cookie as $key => $value ) {
			// 配列
			if ( is_array( $value ) ) _cookie_start( $name . "[" . $key . "]" , $value );
			// 変数
			else setcookie( $name . "[" . $key . "]" , "" , 1 );
		}
	}
}

/**
 * 全てのクッキーをブラウザに保存する
 *
 * @param int $expire 有効期限( デフォルトではブラウザを閉じるまで )
 * @param string $path 有効範囲( デフォルトでは全ての階層 )
 */
function cookie_commit( $expire = 0 , $path = "/" )
{
	// 分解
	foreach ( $_COOKIE as $key => $value ) {
		// 配列
		if ( is_array( $value ) ) _cookie_commit( $key , $value , $expire , $path );
		// 変数
		else {
			setcookie( $key , $value , $expire , $path );
		}
	}
}

/**
 * クッキーをブラウザに保存する
 *
 * @param string $name 保存名
 * @param array $cookie 保存する内容
 * @param int $expire 有効期限
 * @param string $path 有効範囲
 */
function _cookie_commit( $name , $cookie , $expire , $path )
{
	// 値が空ではない
	if ( $cookie ) {
		// 配列
		foreach ( $cookie as $key => $value ) {
			// 配列
			if ( is_array( $value ) ) _cookie_commit( $name . "[" . $key . "]" , $value , $expire , $path );
			// 変数
			else setcookie( $name . "[" . $key . "]" , $value , $expire , $path );
		}
	}
}
