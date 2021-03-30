declare module 'node-qris' {
	import _parse from 'node-qris'
	type Ret = { name: string, length: number, data: string }
	function parse(qrCode: string): Ret[]
	export default parse
}