import { Page } from './index.type';
/**
 * Configuration
 */
const msToChangeCarousel: number = 30000;
const daysOfTheYear: number = 360;
const minCapitalInvestments: number = 500;
const maxCapitalInvestments: number = 1000000;
const minBalanceCredit: number = 500;
const timeToShowModalSimulators: number = 6000;

export const _page: Page = {
	headerItems: [
		{
			id: 1,
			title: 'Institución',
			subtitle: '',
			link: '/public/institution',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:history',
			hasChildren: false,
			children: [],
		},
		{
			id: 2,
			title: 'Productos',
			subtitle: '',
			link: '/public/products',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_deposit',
			hasChildren: true,
			children: [
				{
					id: 21,
					title: 'Cuentas',
					subtitle:
						'Custodia tus ingresos de forma segura, destinado para realizar transacciones financieras y generando interés del ahorro.',
					link: '/public/products/accounts',
					externalLink: false,
					target: '_self',
					actived: false,
					icon: 'static:i_deposit',
					hasChildren: false,
					children: [],
				},
				{
					id: 22,
					title: 'Créditos',
					subtitle:
						'Te mostramos las características y beneficios de nuestros productos crediticios.',
					link: '/public/products/credits',
					externalLink: false,
					target: '_self',
					actived: false,
					icon: 'static:i_credit',
					hasChildren: false,
					children: [],
				},
				{
					id: 23,
					title: 'Inversiones',
					subtitle:
						'Genera más ganancia de tus ahorros con una taza de interés mayor al ahorro, manejamos las mejores tazas de interés del mercado.',
					link: '/public/products/investments',
					externalLink: false,
					target: '_self',
					actived: false,
					icon: 'static:i_investment',
					hasChildren: false,
					children: [],
				},
			],
		},
		{
			id: 3,
			title: 'Servicios',
			subtitle: '',
			link: '/public/services',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_credit',
			hasChildren: true,
			children: [
				{
					id: 31,
					title: 'Transferencias',
					subtitle: 'Realiza tus pagos de manera facil y segura',
					link: '/public/services/transfers',
					externalLink: false,
					target: '_self',
					actived: false,
					icon: 'static:i_transfer',
					hasChildren: false,
					children: [],
				},
				{
					id: 32,
					title: 'Pagos',
					subtitle:
						'Punto de servicio de recaudación autorizada; cancela tus servicios básicos, entre otros.',
					link: '/public/services/payments',
					externalLink: false,
					target: '_self',
					actived: false,
					icon: 'static:i_payments',
					hasChildren: false,
					children: [],
				},
				{
					id: 33,
					title: 'Tarjetas de débito',
					subtitle:
						'Retiro de efectivo en cualquier cajero band-red y compras con almacenes aliados a Visa.',
					link: '/public/services/debit-card',
					externalLink: false,
					target: '_self',
					actived: false,
					icon: 'static:i_debit_card',
					hasChildren: false,
					children: [],
				},
				{
					id: 34,
					title: 'Atención Médica',
					subtitle:
						'Servicio de atención médica y odontológica con los doctores que mantenemos convenio.',
					link: '/public/services/medical-care',
					externalLink: false,
					target: '_self',
					actived: false,
					icon: 'static:i_medical_care',
					hasChildren: false,
					children: [],
				},
				{
					id: 35,
					title: 'Seguros',
					subtitle: 'Cobertura por siniestro.',
					link: '/public/services/insurance',
					externalLink: false,
					target: '_self',
					actived: false,
					icon: 'static:i_insurance',
					hasChildren: false,
					children: [],
				},
			],
		},
		{
			id: 4,
			title: 'Simuladores',
			subtitle: '',
			link: '/public/simulators',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_credit',
			hasChildren: true,
			children: [
				{
					id: 41,
					title: 'Inversión',
					subtitle: 'Simula tu inversión',
					link: '/public/simulators/investments',
					externalLink: false,
					target: '_self',
					actived: false,
					icon: 'static:i_investment',
					hasChildren: false,
					children: [],
				},
				{
					id: 42,
					title: 'Crédito',
					subtitle: 'Simula tu crédito',
					link: '/public/simulators/credits',
					externalLink: false,
					target: '_self',
					actived: false,
					icon: 'static:i_credit',
					hasChildren: false,
					children: [],
				},
			],
		},
		{
			id: 5,
			title: 'Enlaces',
			subtitle: '',
			link: '/public/links',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_credit',
			hasChildren: true,
			children: [
				{
					id: 51,
					title: 'Banca Virtual',
					subtitle: 'Accede a tu banca virtual',
					link: '/public/services/virtual-banking',
					externalLink: false,
					target: '_self',
					actived: false,
					icon: 'heroicons_outline:status-online',
					hasChildren: false,
					children: [],
				},
				{
					id: 52,
					title: 'Seguro de Depósitos',
					subtitle:
						'Tu dinero está protegido y asegurado por la Corporación de Seguro de Depósitos',
					link: 'https://www.cosede.gob.ec/conoce-tu-monto-de-cobertura/',
					externalLink: true,
					target: '_blank',
					actived: false,
					icon: 'heroicons_outline:link',
					hasChildren: false,
					children: [],
				},
				{
					id: 53,
					title: 'Control de Lavado de Activos',
					subtitle:
						'Somos controlados por la Unidad de Analisis Financiero y Económico',
					link: 'https://www.uafe.gob.ec/',
					externalLink: true,
					target: '_blank',
					actived: false,
					icon: 'heroicons_outline:link',
					hasChildren: false,
					children: [],
				},
				{
					id: 54,
					title: 'Control de Productos y Servicios',
					subtitle:
						'Somos controlados por la Superintendencia de Economía Popular y Solicitaria',
					link: 'https://www.seps.gob.ec/',
					externalLink: true,
					target: '_blank',
					actived: false,
					icon: 'heroicons_outline:link',
					hasChildren: false,
					children: [],
				},
				{
					id: 55,
					title: 'Educación Financiera y Social',
					subtitle:
						'Programa de Educación Financiera y Social de nuestra Cooperativa',
					link: 'https://campus2.figlac.org/registro/vista/formcoca.php',
					externalLink: true,
					target: '_blank',
					actived: false,
					icon: 'heroicons_outline:academic-cap',
					hasChildren: false,
					children: [],
				},
			],
		},
		{
			id: 6,
			title: 'Contacto',
			subtitle: '',
			link: '/public/contact',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'heroicons_outline:phone',
			hasChildren: false,
			children: [],
		},
	],
	carouselItems: [
		{
			id: 1,
			title: {
				first: '',
				second: '',
			},
			subtitle: '',
			link: 'https://cocaltda.fin.ec/',
			images: {
				desktop: 'assets/images/carousel/0.jpg',
				mobile: 'assets/images/carousel/0Mobile.jpg',
			},
		},
		{
			id: 2,
			title: {
				first: '',
				second: '',
			},
			subtitle: '',
			link: 'https://cocaltda.fin.ec/',
			images: {
				desktop: 'assets/images/carousel/2.jpg',
				mobile: 'assets/images/carousel/2Mobile.jpg',
			},
		},
		{
			id: 3,
			title: {
				first: '',
				second: '',
			},
			subtitle: '',
			link: 'https://cocaltda.fin.ec/',
			images: {
				desktop: 'assets/images/carousel/3.jpg',
				mobile: 'assets/images/carousel/3Mobile.jpg',
			},
		},
		{
			id: 4,
			title: {
				first: '',
				second: '',
			},
			subtitle: '',
			link: 'https://cocaltda.fin.ec/',
			images: {
				desktop: 'assets/images/carousel/4.jpg',
				mobile: 'assets/images/carousel/4Mobile.jpg',
			},
		},
		{
			id: 5,
			title: {
				first: '',
				second: '',
			},
			subtitle: '',
			link: 'https://cocaltda.fin.ec/',
			images: {
				desktop: 'assets/images/carousel/5.jpg',
				mobile: 'assets/images/carousel/5Mobile.jpg',
			},
		},
		{
			id: 6,
			title: {
				first: '',
				second: '',
			},
			subtitle: '',
			link: 'https://cocaltda.fin.ec/',
			images: {
				desktop: 'assets/images/carousel/6.jpg',
				mobile: 'assets/images/carousel/6Mobile.jpg',
			},
		},
		{
			id: 7,
			title: {
				first: '',
				second: '',
			},
			subtitle: '',
			link: 'https://cocaltda.fin.ec/',
			images: {
				desktop: 'assets/images/carousel/7.jpg',
				mobile: 'assets/images/carousel/7Mobile.jpg',
			},
		},
	],
	itemGalleryProducts: [
		{
			id: 211,
			title: 'Cuenta de ahorro',
			subtitle: 'Ahorra y crece financieramente con nosotros.',
			link: '/public/products/accounts',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_save',
		},
		{
			id: 212,
			title: 'Ahorro soñar',
			subtitle: 'Ahorra y cumple tus sueños.',
			link: '/public/products/accounts',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_dream',
		},
		{
			id: 213,
			title: 'Ahorro estudiantil',
			subtitle: 'El ahorro no tiene edad.',
			link: '/public/products/accounts',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_student',
		},
		{
			id: 214,
			title: 'Multi ahorro',
			subtitle: 'Abre tu cuenta multi ahorro.',
			link: '/public/products/accounts',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_multi_save',
		},
		{
			id: 221,
			title: 'Crédito de consumo',
			subtitle:
				'Obtén tu crédito de consumo e invierte en tus gastos personales.',
			link: '/public/products/credits',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_consumer',
		},
		{
			id: 222,
			title: 'Crédito de vivienda',
			subtitle: 'Obtén tu crédito y construye la Vivienda de tus sueños.',
			link: '/public/products/credits',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_living_place',
		},
		{
			id: 223,
			title: 'Microcrédito',
			subtitle: 'Crece con nosotros e invierte en tu negocio.',
			link: '/public/products/credits',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_micro_credit',
		},
		{
			id: 231,
			title: 'Plazo fijo',
			subtitle: 'Obtén retribución poniendo tu dinero a plazo fijo.',
			link: '/public/products/investments',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_fixed_term',
		},
	],
	itemGalleryServices: [
		{
			id: 21,
			title: 'Trasferencias',
			subtitle: 'Realiza tus pagos de manera facil y segura.',
			link: '/public/services/transfers',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_transfer',
		},
		{
			id: 22,
			title: 'Pagos',
			subtitle:
				'Punto de servicio de recaudación autorizada; cancela tus servicios básicos, entre otros.',
			link: '/public/services/payments',
			externalLink: false,
			target: '_blank',
			actived: false,
			icon: 'static:i_payments',
		},
		{
			id: 23,
			title: 'Tarjetas de débito',
			subtitle:
				'Retiro de efectivo en cualquier cajero band-red y compras con almacenes aliados a Visa.',
			link: '/public/services/debit-card',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_debit_card',
		},
		{
			id: 24,
			title: 'Atención Médica',
			subtitle:
				'Servicio de atención médica y odontológica con los doctores que mantenemos convenio.',
			link: '/public/services/medical-care',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_medical_care',
		},
		{
			id: 25,
			title: 'Seguros',
			subtitle: 'Cobertura por siniestro.',
			link: '/public/services/insurance',
			externalLink: false,
			target: '_self',
			actived: false,
			icon: 'static:i_insurance',
		},
	],
	itemCard: [
		{
			id: 1,
			title: 'Educación Financiera y Social',
			description:
				'Programa de Educación Financiera y Social de nuestra Cooperativa.',
			titleBtn: 'Regístrate ahora',
			srcImage: 'assets/images/static/cards/educacion_financiera.jpg',
			matTooltipBtn: 'Ir al registro',
			link: 'https://campus2.figlac.org/registro/vista/formcoca.php',
			externalLink: true,
			target: '_blank',
			position: 'Right',
		},
		{
			id: 2,
			title: 'Buzón de Sugerencias y Reclamos',
			description: 'Tus sugerencias y reclamos nos ayudan a mejorar.',
			titleBtn: 'Formulario online',
			srcImage: 'assets/images/static/cards/buzon.jpg',
			matTooltipBtn: 'Ir al formulario',
			link: '/public/contact',
			externalLink: false,
			target: '_self',
			position: 'Left',
		},
		{
			id: 3,
			title: 'Transparencia',
			description:
				'Descarga nuestros Estatutos, Reglamentos, Informes Financiero, etc.',
			titleBtn: 'Descargar documentos',
			srcImage: 'assets/images/static/cards/transparencia.jpg',
			matTooltipBtn: 'Ir a la sección de descarga',
			link: '/public/transparency',
			externalLink: false,
			target: '_self',
			position: 'Right',
		},
		{
			id: 4,
			title: 'Seguro de depósitos',
			description:
				'Tu dinero está protegido y asegurado por la Corporación de Seguro de Depósitos.',
			titleBtn: 'Sitio Web Oficial',
			srcImage: 'assets/images/static/cards/cosede.jpg',
			matTooltipBtn: 'Visitar sitio web oficial',
			link: 'https://www.cosede.gob.ec/conoce-tu-monto-de-cobertura/',
			externalLink: true,
			target: '_blank',
			position: 'Left',
		},
		{
			id: 5,
			title: 'Control de Lavado de Activos',
			description:
				'Somos controlados por la Unidad de Analisis Financiero y Económico.',
			titleBtn: 'Sitio Web Oficial',
			srcImage: 'assets/images/static/cards/uafe.jpg',
			matTooltipBtn: 'Visitar sitio web oficial',
			link: 'https://www.uafe.gob.ec/',
			externalLink: true,
			target: '_blank',
			position: 'Right',
		},
		{
			id: 6,
			title: 'Control de Productos y Servicios',
			description:
				'Somos controlados por la Superintendencia de Economía Popular y Solidaria.',
			titleBtn: 'Sitio Web Oficial',
			srcImage: 'assets/images/static/cards/seps.jpg',
			matTooltipBtn: 'Visitar sitio web oficial',
			link: 'https://www.seps.gob.ec/',
			externalLink: true,
			target: '_blank',
			position: 'Left',
		},
		{
			id: 7,
			title: 'Indicadores de Género',
			description:
				'Cumplimiento de Resolución Nro. SEPS-IGT-IGS-INFMR-INGINT-2021-0017.',
			titleBtn: 'Ver más',
			srcImage: 'assets/images/static/cards/indicadores_genero.jpg',
			matTooltipBtn: 'Visitar sección',
			link: '/public/gender-indicators',
			externalLink: false,
			target: '_blank',
			position: 'Right',
		},
	],
	itemToggleDeposits: [
		{
			id: 211,
			title: 'Cuenta de ahorro',
			icon: 'static:i_save',
			images: {
				mobile: 'assets/images/static/mobileSave.jpg',
			},
			selected: false,
			html: `
        <p>Una cuenta de ahorro es un depósito ordinario a la vista (producto pasivo), en la que los fondos
        depositados por la cuenta habiente tienen disponibilidad inmediata y generan cierta rentabilidad
        o intereses durante un periodo determinado según el montón ahorrado.<br><br>

        <strong>CARACTERÍSTICAS</strong><br><br>

        - Cuentan con la accesibilidad de este producto las personas naturales y jurídicas.<br>
        - Su nombre comercial es “Cuenta de ahorro”.<br>
        - Los clientes que deseen pueden ser socios de la Cooperativa.<br>
        - Los depósitos podrán ser realizados en efectivo o cheques.<br>
        - No existe límite de depósito.<br>
        - Depósito inicial para la apertura de cuenta Ahorro $50,00 (Sea persona natural o
        jurídica).<br><br>

        <strong>REQUISITOS</strong><br><br>

        <strong>Persona Natural.</strong><br>
        - Copia de la cédula de ciudadanía o pasarporte (actualizado).<br>
        - Copia del Certificado de Votación (actualizado).<br>
        - Copia de la última planilla de un servicio básico (luz, agua o teléfono).<br>
        - Depósito inicial para la apertura de cuenta $50,00.<br>
        <strong>Persona Jurídica.</strong><br>
        - Copia de la cédula de ciudadanía del Representante(s) legal de la Empresa.<br>
        - Copia de certificado de votación del Representante(s) legal de la Empresa.<br>
        - Copia del Ruc.<br>
        - Copia de la última planilla de un servicio básico (luz, agua o teléfono).<br>
        - Copia certificada y actualizada del nombramiento debidamente inscrito en el organismo
        respectivo, de los representantes legales.<br>
        - Copia del Estatuto vigente, que contenga la razón de inscripción o registro en el organismo
        que le concedió la personería jurídica.<br>
        - Balances del ejercicio económico inmediato anterior.<br>
        - Declaración del impuesto a la renta del año inmediato anterior.<br>
        - Las demás que determinen las normas para prevenir el lavado de activos.<br>
        - Depósito inicial para la apertura de cuenta $50,00.<br></p>
        <h1 #title
          class="w-full bg-green-600 md:bg-transparent py-4 md:py-0 rounded-md text-white  text-center my-4 font-medium text-2xl md:text-gray-600">
          Tasas de interés
        </h1>
        <div class="w-full md:w-10/12 md:px-8 mx-auto">
          <table class="w-full p-4 text-base font-normal text-gray-500 border-2 border-solid border-gray-300">
            <tr class="bg-gray-100">
              <th class="p-2">Rango</th>
              <th class="p-2">Tasa</th>
            </tr>
            <tr>
              <td class="p-2">de 0,01 a 10.000,00</td>
              <td class="p-2">1.5%</td>
            </tr>
            <tr>
              <td class="p-2">de 10.000,01 en adelante</td>
              <td class="p-2">2%</td>
            </tr>
          </table>
        </div>
      `,
		},
		{
			id: 212,
			title: 'Ahorro soñar',
			icon: 'static:i_dream',
			images: {
				mobile: 'assets/images/static/mobileDream.jpg',
			},
			selected: false,
			html: `
        <p>Es un producto donde el socio se compromete al aporte de una cuota fija recurrente, en un tiempo
				establecido rigiéndose por un contrato. Por otro lado, la cooperativa incentiva a sus ahorristas
				a cumplir sus metas a través de bonificaciones por el cumplimiento de condiciones
				pactadas.<br><br>

				<strong>CARACTERÍSTICAS</strong><br><br>

				- Está habilitado para personas naturales.<br>
				- El aporte mínimo es de $10,00 dólares mensuales.<br>
				- Tiene un contrato de 6 hasta 120 meses.<br>
				<br>

				<strong>REQUISITOS</strong><br><br>

				- Copia de la cédula del titular o representante legal (actualizada).<br>
				- Copia de un servicio básico.<br></p>
        <h1 #title
          class="w-full bg-green-600 md:bg-transparent py-4 md:py-0 rounded-md text-white  text-center my-4 font-medium text-2xl md:text-gray-600">
          Tipo de plan
        </h1>
        <div class="w-full md:w-10/12 md:px-8 mx-auto">
          <table class="w-full p-4 text-base font-normal text-gray-500 border-2 border-solid border-gray-300">
            <tr class="bg-gray-100">
              <th class="p-2">Plan</th>
              <th class="p-2">Tiempo</th>
              <th class="p-2">Tasa</th>
            </tr>
            <tr>
              <td class="p-2">Plan mínimo</td>
              <td class="p-2">6 meses</td>
              <td class="p-2">2%</td>
            </tr>
            <tr>
              <td class="p-2">Plan máximo</td>
              <td class="p-2">12 meses o más</td>
              <td class="p-2">5%</td>
            </tr>
          </table>
        </div>
      `,
		},
		{
			id: 213,
			title: 'Ahorro estudiantil',
			icon: 'static:i_student',
			images: {
				mobile: 'assets/images/static/mobileStudent.jpg',
			},
			selected: false,
			html: `
        <p>Es una cuenta de ahorros especial que permite a los padres enseñar a sus hijos el valor y la
				importancia de ahorrar para su futuro y alcanzar sus metas y a su vez asegura el futuro
				estudiantil de los suyos.<br><br>

				<strong>CARACTERÍSTICAS</strong><br><br>

				- Dirigido a las personas menores de edad.<br>
				- No son socios de la Cooperativa.<br>
				- Su representante debe ser un mayor de edad (papá, mamá o familiares).<br>
				- No existe límite de depósito.<br>
				- Depósito inicial para la apertura de cuenta Ahorro es de $10,00.<br><br>

				<strong>REQUISITOS</strong><br><br>

				- Copia de la cédula de ciudadanía del menor de edad (actualizada).<br>
				- Copia de la cédula de ciudadanía del Representante (actualizada).<br>
				- Copia del Certificado de Votación del Representante (actualizado).<br>
				- Copia de la última planilla de un servicio básico (luz, agua o teléfono).</p>
        <h1 #title
          class="w-full bg-green-600 md:bg-transparent py-4 md:py-0 rounded-md text-white  text-center my-4 font-medium text-2xl md:text-gray-600">
          Tasas de interés
        </h1>
        <div class="w-full md:w-10/12 md:px-8 mx-auto">
          <table class="w-full p-4 text-base font-normal text-gray-500 border-2 border-solid border-gray-300">
            <tr class="bg-gray-100">
              <th class="p-2">Rango</th>
              <th class="p-2">Tasa</th>
            </tr>
            <tr>
              <td class="p-2">de 0,01 a 10.000,00</td>
              <td class="p-2">2%</td>
            </tr>
            <tr>
              <td class="p-2">de 10.000,01 en adelante</td>
              <td class="p-2">2.5%</td>
            </tr>
          </table>
        </div>
      `,
		},
		{
			id: 214,
			title: 'Multi ahorro',
			icon: 'static:i_multi_save',
			images: {
				mobile: 'assets/images/static/mobileMultiSave.jpg',
			},
			selected: false,
			html: `
        <p>Este producto permite a nuestros socios obtener dos o más tipos de ahorros a la vez con el fin de separar sus ingresos.</p><br>

        <strong>CARACTERÍSTICAS</strong><br><br>

        - Cuentan con la accesibilidad de este producto las personas naturales y jurídicas.<br>
        - Su nombre comercial es “Cuenta de ahorro”.<br>
        - Los clientes que deseen pueden ser socios de la Cooperativa.<br>
        - Los depósitos podrán ser realizados en efectivo o cheques.<br>
        - No existe límite de depósito.<br>
        - Depósito inicial para la apertura de cuenta Ahorro $5,00 (Sea persona natural o
        jurídica).<br><br>

        <strong>REQUISITOS</strong><br><br>

        <strong>Persona Natural.</strong><br>
        - Copia de la cédula de ciudadanía o pasarporte (actualizado).<br>
        - Copia del Certificado de Votación (actualizado).<br>
        - Copia de la última planilla de un servicio básico (luz, agua o teléfono).<br>
        - Solicitud de apertura.<br>
        - Depósito inicial para la apertura de cuenta $5,00.<br><br>
        <strong>Persona Jurídica.</strong><br>
        - Copia de la cédula de ciudadanía del Representante(s) legal de la Empresa.<br>
        - Copia de certificado de votación del Representante(s) legal de la Empresa.<br>
        - Copia del Ruc.<br>
        - Copia de la última planilla de un servicio básico (luz, agua o teléfono).<br>
        - Copia certificada y actualizada del nombramiento debidamente inscrito en el organismo
        respectivo, de los representantes legales.<br>
        - Copia del Estatuto vigente, que contenga la razón de inscripción o registro en el organismo
        que le concedió la personería jurídica.<br>
        - Balances del ejercicio económico inmediato anterior.<br>
        - Declaración del impuesto a la renta del año inmediato anterior.<br>
        - Las demás que determinen las normas para prevenir el lavado de activos.<br>
        - Depósito inicial para la apertura de cuenta $5,00.<br></p>
        <h1 #title
          class="w-full bg-green-600 md:bg-transparent py-4 md:py-0 rounded-md text-white  text-center my-4 font-medium text-2xl md:text-gray-600">
          Tasas de interés
        </h1>
        <div class="w-full md:w-10/12 md:px-8 mx-auto">
          <table class="w-full p-4 text-base font-normal text-gray-500 border-2 border-solid border-gray-300">
            <tr class="bg-gray-100">
              <th class="p-2">Rango</th>
              <th class="p-2">Tasa</th>
            </tr>
            <tr>
              <td class="p-2">de 0,01 a 10.000,00</td>
              <td class="p-2">1.5%</td>
            </tr>
            <tr>
              <td class="p-2">de 10.000,01 en adelante</td>
              <td class="p-2">2%</td>
            </tr>
          </table>
        </div>
      `,
		},
	],
	itemToggleCredits: [
		{
			id: 221,
			title: 'Consumo',
			icon: 'static:i_consumer',
			images: {
				mobile: 'assets/images/static/mobileConsumer.jpg',
			},
			selected: false,
			html: `
			  <p>Son créditos otorgados a personas naturales destinados al pago de bienes, servicios o gastos personales.<br><br>
	  
			  <strong>REQUISITOS</strong><br><br>
	  
			  - Copia de Cédula y Certificado de Votación del solicitante y del conyuge o conviviente.<br>
			  - Copia del Impuesto Predial actual.<br>
			  - Copia de los 3 últimos roles de pago.<br>
			  - Copia de planilla de pago de servicios básicos (agua, luz o teléfono).<br><br>
	  
			  <strong>GARANTÍAS</strong><br><br>
	  
			  * <strong>Personal</strong><br>
			  -Copia de Cédula y Papeleta del garante y del conyuge o conviviente.<br>
			  -Copia de los 3 últimos roles de pagos.<br>
			  -Copia del RUC y de las 3 últimas declaraciones y/o RISE.<br><br>
	  
			  * <strong>Hipotecaria</strong><br>
			  -Copia de la Escritura Original.<br>
			  -Registro de la propiedad actualizado (válido 30 días).</p>
			`,
		},
		{
			id: 222,
			title: 'Vivienda',
			icon: 'static:i_living_place',
			images: {
				mobile: 'assets/images/static/mobileLivingPlace.jpg',
			},
			selected: false,
			html: `
			  <p>Son los créditos otorgados a personas naturales para la adquisición, construcción, reparación,
					  remodelación y mejoramiento de la vivienda propia.<br><br>
	  
					  <strong>REQUISITOS</strong><br><br>
	  
					  - Copia de Cédula y Certificado de Votación del solicitante y del conyuge o conviviente.<br>
					  - Copia del Impuesto Predial actual.<br>
					  - Copia de los 3 últimos roles de pago.<br>
					  - Copia de planilla de pago de servicios básicos (agua, luz o teléfono).<br><br>
	  
					  <strong>GARANTÍAS</strong><br><br>
	  
					  - Hipotecaria<br>
					  - Copia de la Escritura Original.<br>
					  - Registro de la propiedad actualizado (válido 30 días).</p>
			`,
		},
		{
			id: 223,
			title: 'Microcrédito',
			icon: 'static:i_micro_credit',
			images: {
				mobile: 'assets/images/static/mobileMicroCredit.jpg',
			},
			selected: false,
			html: `
			  <p>Emprende tu negocio o amplialo. Crece con nosotros!<br><br>
	  
			  <p>Puedes utilizarlo: Emprender o ampliar tu negocio, adquirir bienes para tu negocio o capital de trabajo.</p><br>
	  
					  Puedes acceder a:<br><br>
	  
					  <strong>1) MICROCRÉDITO MINORISTA</strong><br>
					  Aplican a nuestros socios cuyas ventas anuales se encuentran hasta los 5.000 dólares.<br><br>
	  
	  
					  <strong>2) MICROCRÉDITO DE ACUMULACIÓN SIMPLE</strong><br>
					  Aplican a nuestros socios cuyas ventas anuales se encuentran desde los 5.001 dólares hasta los 20.0000.<br><br>
	  
					  <strong>3) MICROCRÉDITO DE ACUMULACIÓN AMPLIADA</strong><br>
					  Aplican a nuestros socios cuyas ventas anuales se encuentran desde los 20.0001 dólares e inferiores a los 100.000.00 dólares.<br><br>
	  
					  <strong>4) MICROCRÉDITO ASO-PRODUCTIVO</strong><br>
					  Es un crédito productivo con tecnología de microcrédito, según la norma de la Junta Política y
					  Regulación Monetaria y Financiera, considerando las organizaciones de la EPS.<br><br>
	  
					  <strong>REQUISITOS</strong><br><br>
	  
					  - Copia de Cédula y Certificado de Votación del solicitante y del conyuge o conviviente.<br>
					  - Copia del Impuesto Predial actual.<br>
					  - Copia de los 3 últimos roles de pago.<br>
					  - Copia de planilla de pago de servicios básicos (agua, luz o teléfono).<br><br>
	  
					  <strong>GARANTÍAS</strong><br><br>
	  
					  * <strong>Personal</strong><br>
					  - Copia de Cédula y Papeleta del garante y del conyuge o conviviente.<br>
					  - Copia de los 3 últimos roles de pagos.<br>
					  - Copia del RUC y de las 3 últimas declaraciones y/o RISE.<br><br>
	  
					  * <strong>Hipotecaria</strong><br>
					  - Copia de la Escritura Original.<br>
					  - Registro de la propiedad actualizado (válido 30 días).</p>
			`,
		},
	],
	itemToggleInvestments: [
		{
			id: 231,
			title: 'Plazo fijo',
			icon: 'static:i_fixed_term',
			images: {
				mobile: 'assets/images/static/mobileFixedTerm.jpg',
			},
			selected: false,
			html: `
        <p>El depósito a plazo fijo es un servicio en el cual la Cooperativa Coca Ltda. realiza un contrato
        con el cliente para que deposite un valor a un plazo determinado. Así gana una tasa de interés
        mayor a la cuenta normal de ahorros.<br><br>

        <strong>REQUISITOS</strong><br><br>

        - El socio deberá proporcionar la copia de su cédula a color.<br>
        - Copia de la última planilla de un servicio básico (luz, agua o teléfono).<br>
        Suscribir el documento representativo de su inversión.</p>`,
		},
	],
	/**
	 * Configuration
	 */
	msToChangeCarousel,
	daysOfTheYear,
	minCapitalInvestments,
	maxCapitalInvestments,
	minBalanceCredit,
	timeToShowModalSimulators,
	/**
	 * Simulators
	 */
	/**
	 * Investment
	 */
	investmentsTerm: [
		{ id: 1, name: '30 Días', keyDay: 'I30', valueOfDays: 30 },
		{ id: 2, name: '60 Días', keyDay: 'I60', valueOfDays: 60 },
		{ id: 3, name: '90 Días', keyDay: 'I90', valueOfDays: 90 },
		{ id: 4, name: '180 Días', keyDay: 'I180', valueOfDays: 180 },
		{ id: 5, name: 'Más de 360 Días', keyDay: 'IM360', valueOfDays: 360 },
	],
	investmentsParameters: [
		{
			id: 1,
			from: minCapitalInvestments,
			to: 3000,
			I30: 4,
			I60: 4.5,
			I90: 4.5,
			I180: 5,
			IM360: 6.5,
		},
		{
			id: 2,
			from: 3001,
			to: 10000,
			I30: 4.5,
			I60: 5,
			I90: 5.5,
			I180: 6,
			IM360: 7.5,
		},
		{
			id: 3,
			from: 10000,
			to: maxCapitalInvestments,
			I30: 5,
			I60: 5.5,
			I90: 6,
			I180: 7,
			IM360: 8.5,
		},
	],
	/**
	 * Credits
	 */
	typeCreditProduct: [
		{
			id: 1,
			name: 'Inmobiliario',
			description: 'Crédito inmobiliario',
			interest: 9.9,
			maxAmount: 60000,
			maxTerm: 120,
		},
		{
			id: 2,
			name: 'Consumo',
			description: 'Crédito consumo',
			interest: 15.5,
			maxAmount: 40000,
			maxTerm: 48,
		},
		{
			id: 3,
			name: 'Micro minorista',
			description: 'Crédito micro minorista',
			interest: 23.0,
			maxAmount: 45000,
			maxTerm: 42,
		},
		{
			id: 4,
			name: 'Micro acumulación simple',
			description: 'Crédito micro acumulación simple',
			interest: 22.4,
			maxAmount: 45000,
			maxTerm: 42,
		},
		{
			id: 5,
			name: 'Micro acumulación ampliada',
			description: 'Crédito micro acumulación ampliada',
			interest: 20.05,
			maxAmount: 45000,
			maxTerm: 42,
		},
		{
			id: 6,
			name: 'PYMES',
			description: 'Crédito PYMES',
			interest: 10.7,
			maxAmount: 45000,
			maxTerm: 42,
		},
	],
	creditsTerm: [
		{
			id: 1,
			name: '12 meses',
			valueOfMonts: 12,
		},
		{
			id: 2,
			name: '24 meses',
			valueOfMonts: 24,
		},
		{
			id: 3,
			name: '36 meses',
			valueOfMonts: 36,
		},
		{
			id: 4,
			name: '42 meses',
			valueOfMonts: 42,
		},
		{
			id: 5,
			name: '48 meses',
			valueOfMonts: 48,
		},
		{
			id: 6,
			name: '60 meses',
			valueOfMonts: 60,
		},
		{
			id: 7,
			name: '72 meses',
			valueOfMonts: 72,
		},
		{
			id: 8,
			name: '84 meses',
			valueOfMonts: 84,
		},
		{
			id: 9,
			name: '96 meses',
			valueOfMonts: 96,
		},
		{
			id: 10,
			name: '108 meses',
			valueOfMonts: 108,
		},
		{
			id: 11,
			name: '120 meses',
			valueOfMonts: 120,
		},
	],
	amortizationTable: [
		{
			id: 1,
			name: 'Tabla Alemana',
			description: 'En esta tabla se...',
			amortizationTable: 'German',
		},
		{
			id: 2,
			name: 'Tabla Francesa',
			description: 'En esta tabla se...',
			amortizationTable: 'French',
		},
	],
};
