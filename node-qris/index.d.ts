declare module 'node-qris' {
	import _parse from 'node-qris'
	type Names =
		'PayloadFormatIndicator' |
		'PointOfInitiationMethod' |
		'MerchantCategoryCode' |
		'TransactionCurrency' |
		'TransactionAmount' |
		'CountryCode' |
		'MerchantName' |
		'MerchantCity' |
		'PostalCode' |
		'CRC'
	type Ret = { name: Names, length: number, data: string }
	function parse(qrCode: string): Ret[]
	export default parse
}