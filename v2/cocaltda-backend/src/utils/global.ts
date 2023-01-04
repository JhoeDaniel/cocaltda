import imageToBase64 from 'image-to-base64';
/**
 * generateRandomNumber
 * @param length
 * @returns randomNumber
 */
export const generateRandomNumber = (length: number): string => {
	let number: string = '';
	for (let x = 1; x <= length; x++) {
		let random = Math.floor(Math.random() * 10);
		if (random == 10) {
			random = random - 1;
		}
		number = number + random.toString();
	}
	return number;
};
/**
 * Transform image to B64
 * @param url
 * @returns B64
 */
export const generateImage2B64 = async (url: string): Promise<string> => {
	const base64 = await imageToBase64(url);
	return base64;
};
/**
 * Función para añadir los 0 que haga falta al recibir un secuencial
 * ejemplo: secuencial 25, retorna 000000025
 */
export const addCero = (sequential: number): string => {
	let sequentialEnd: string = '';
	let cero: string = '0';
	const sequentialLenght: number = sequential.toString().length;

	if (sequentialLenght < 9) {
		const ceroAdd: number = 9 - sequentialLenght;
		for (let i = 0; i < ceroAdd; i++) {
			sequentialEnd += cero;
			if (sequentialEnd.length == ceroAdd) {
				sequentialEnd += sequential.toString();
			}
		}
		return sequentialEnd;
	} else {
		return sequential.toString();
	}
};
/**
 * Función para eliminar los 0 del secuencial
 */
export const deleteCero = (sequential: string) => {
	return parseInt(sequential);
};
/**
 * Función para convertir un String a un Función con los códigos ASCII
 */
export const stringToAscii = (stringXMLFormatted: any): number[] => {
	const arrayAscii: number[] = [];
	for (let i = 0; i < stringXMLFormatted.length; i++) {
		let character = stringXMLFormatted.slice(i, i + 1);
		let asciCharacter = character.charCodeAt();
		arrayAscii.push(asciCharacter);
	}
	return arrayAscii;
};
/**
 * Función para eliminar el retorno de carro (codigo ASCII 13) que impide la generación correcta del del comprobante
 */
export const deleteNaN = (arrayAscii: number[]): number[] => {
	arrayAscii.forEach((code: number, index: number) => {
		if (code == 13) {
			arrayAscii.splice(index, 1);
		}
	});
	return arrayAscii;
};
/**
 * Función para transformar un Función con códigos Ascii a su correspondiente string
 */
export const asciiToString = (arrayAscii: number[]): string => {
	let stringXml: string = '';
	arrayAscii.forEach((code: number) => {
		let character = String.fromCharCode(code);
		stringXml += character;
	});
	return stringXml;
};
