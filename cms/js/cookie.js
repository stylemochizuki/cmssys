/**
 * Cookieを取得する
 *
 * @params string cookie 読み込みをしたい内容( 未設定の場合は現在の Cookie から取得します。 )
 * @returns json Cookieの内容を連想配列で返します。
 */
function getCookie( cookie )
{
	/* -- Variable -- */

	// Cookie Parse Data
	var parse = new Array();
	// Cookie Split
	var team = null;
	// Each Code
	var each = null;
	// Loop Var
	var i = 0;


	/* -- Execution -- */

	// Get Cookie Code
	if ( cookie === undefined ) cookie = document.cookie;

	// None Cookie
	if ( cookie ) {
		// Split Cookie Code
		team = cookie.split( ";" );
		// Split All Open
		for ( i = 0 ; i !== team.length ; ++i ) {
			// Split Code => ( Name ) = ( value )
			each = team[ i ].split( "=" );
			// Name is Trim
			each[ 0 ] = each[ 0 ].replace( /(^\s+)|(\s+$)/g , "" );
			// Value To URL Decode
			parse[ each[ 0 ] ] = decodeURIComponent( each[ 1 ] );
		}
	}
	// Return Parse Data
	return( parse );
}

/**
 * Cookieへ書き込みをする
 *
 * params で利用できる設定は以下の通りです。
 *   path
 *     Cookieが有効なパスの設定 / で全てのパスで有効になります。
 *   domain
 *     Cookieが有効なドメインの設定
 *   max-age
 *     Cookieの有効期限( 秒数 )。現在の時間から秒数になります。
 *   expires
 *     Cookieの有効期限( 日時 )。1970年1月1日0時0分0秒(UTC)からの秒数で設定します。
 *   secure
 *     SSL通信時のみCookieを使用するかの設定。 true:有効 false:無効
 *
 * @param json cookie Cookieへ書き込む連想配列データ
 * @param json params 設定するパラメーター
 * @returns json 現在のCookieの内容を連想配列で返します。
 */
function setCookie( cookie , params )
{
	/* -- Variable -- */

	// Key Name
	var name = "";
	// Params Code
	var plus = "";


	/* -- Execution -- */

	// Data Non Empty
	if ( cookie ) {
		// Params
		if ( params ) {
			// Params All Open
			for ( name in params ) {
				// "secure" Seting
				if ( name === "secure" ) {
					// Code ON
					if ( params[ name ] ) plus += "; " + name;
				}
				// Etc Code
				else plus += "; " + name + "=" + params[ name ];
			}
		}
		// Data All Open
		for ( name in cookie ) {
			// Cookie Write
			document.cookie = name + "=" + encodeURIComponent( cookie[ name ] ) + plus;
		}
	}
	// Return Now Cookie Code
	return( getCookie() );
}

/**
 * Cookieから削除する
 *
 * @param string|array name 削除したいCookie名
 * @returns json 現在のCookieの内容を連想配列で返します。
 */
function delCookie( name )
{
	/* -- Variable -- */

	// Loop
	var i = 0;


	/* -- Execution -- */

	// Data Non Empty
	if ( name ) {
		// String
		if ( typeof( name ) === "string" ) {
			// Cookie Write
			document.cookie = name + "=none; expires=Fri, 31-Dec-1999 23:59:59 GMT;";
		}
		// Array
		else {
			// Name All Open
			for ( i = 0 ; i < name.length ; ++i ) {
				// Cookie Write
				document.cookie = name[ i ] + "=none; expires=Fri, 31-Dec-1999 23:59:59 GMT;";
			}
		}
	}
	// Return Now Cookie Code
	return( getCookie() );
}
