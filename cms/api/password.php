<?php
/** @var string 暗号化タイプ */
define( 'HASH_TYPE' , '$1$' );

/** @var string 暗号化キー( 8文字 ) */
define( 'HASH_SALT' , "ss" );

/**
 * パスワードの生成
 * @param string $src 暗号化したい文字列
 * @return string 暗号化された文字列
 */
function createPassword( $src )
{
	$salt = substr( crypt( $src , HASH_SALT ) , 0 , 8 );
	return( substr( crypt( $src , HASH_TYPE . $salt . '$' ) , strlen( HASH_TYPE . $salt . '$' ) ) );
}
