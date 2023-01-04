import {
  AmortizationTable,
  CreditsTerm,
  InvestmentsParameters,
  InvestmentsTerm,
  Page,
  TypeCreditProduct,
} from './public.type';

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
          title: 'Depósitos',
          subtitle: 'Obten tu...',
          link: '/public/products/deposits',
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
          subtitle: 'Obten tu...',
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
          subtitle: 'Obten tu...',
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
          subtitle: 'Obten tu...',
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
          subtitle: 'Obten tu...',
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
          subtitle: 'Obten tu...',
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
          subtitle: 'Obten tu...',
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
          subtitle: 'Obten tu...',
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
          subtitle: 'Obten tu...',
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
          subtitle: 'Accede a ..',
          link: 'https://bancavirtual.cocaltda.fin.ec/#/auth/login?returnUrl=%2Fbv',
          externalLink: true,
          target: '_blank',
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
        desktop: 'assets/images/carousel/2.jpg',
        mobile: 'assets/images/carousel/2Mobile.jpg',
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
  ],
  itemGalleryProducts: [
    {
      id: 211,
      title: 'Cuenta de ahorro',
      subtitle: 'Obten tu...',
      link: '/public/products/deposits',
      externalLink: false,
      target: '_self',
      actived: false,
      icon: 'static:i_save',
    },
    {
      id: 212,
      title: 'Ahorro soñar',
      subtitle: 'Obten tu...',
      link: '/public/products/deposits',
      externalLink: false,
      target: '_self',
      actived: false,
      icon: 'static:i_dream',
    },
    {
      id: 213,
      title: 'Ahorro estudiantil',
      subtitle: 'Obten tu...',
      link: '/public/products/deposits',
      externalLink: false,
      target: '_self',
      actived: false,
      icon: 'static:i_student',
    },
    {
      id: 214,
      title: 'Multi ahorro',
      subtitle: 'Obten tu...',
      link: '/public/products/deposits',
      externalLink: false,
      target: '_self',
      actived: false,
      icon: 'static:i_multi_save',
    },
    {
      id: 221,
      title: 'Crédito de consumo',
      subtitle: 'Obten tu...',
      link: '/public/products/credits',
      externalLink: false,
      target: '_self',
      actived: false,
      icon: 'static:i_consumer',
    },
    {
      id: 222,
      title: 'Crédito de vivienda',
      subtitle: 'Obten tu...',
      link: '/public/products/credits',
      externalLink: false,
      target: '_self',
      actived: false,
      icon: 'static:i_living_place',
    },
    {
      id: 223,
      title: 'Microcrédito',
      subtitle: 'Obten tu...',
      link: '/public/products/credits',
      externalLink: false,
      target: '_self',
      actived: false,
      icon: 'static:i_micro_credit',
    },
    {
      id: 231,
      title: 'Plazo fijo',
      subtitle: 'Obten tu...',
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
      subtitle: 'Realiza tus pagos de manera facil y segura',
      link: '/public/services/transfers',
      externalLink: false,
      target: '_self',
      actived: false,
      icon: 'static:i_transfer',
    },
    {
      id: 22,
      title: 'Pagos',
      subtitle: 'Obten tu...',
      link: '/public/services/payments',
      externalLink: false,
      target: '_blank',
      actived: false,
      icon: 'static:i_payments',
    },
    {
      id: 23,
      title: 'Tarjetas de débito',
      subtitle: 'Obten tu...',
      link: '/public/services/debit-card',
      externalLink: false,
      target: '_self',
      actived: false,
      icon: 'static:i_debit_card',
    },
    {
      id: 24,
      title: 'Atención Médica',
      subtitle: 'Obten tu...',
      link: '/public/services/medical-care',
      externalLink: false,
      target: '_self',
      actived: false,
      icon: 'static:i_medical_care',
    },
    {
      id: 25,
      title: 'Seguros',
      subtitle: 'Obten tu...',
      link: '/public/services/insurance',
      externalLink: false,
      target: '_self',
      actived: false,
      icon: 'static:i_insurance',
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
        <p>Son créditos otorgados a personas naturales destinados al pago de bienes, servicios o gastos no
        relacionados con una actividad productiva.<br><br>

        <strong>REQUISITOS</strong><br><br>

        - Certificado de Asistencia al seminario de cooperativismo (viernes de 17:00 a 18:00).<br>
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
				remodelación y mejoramiento de la vivienda propia, siempre que se encuentren amparados con
				garantía hipotecaria.<br><br>

				<strong>REQUISITOS</strong><br><br>

				- Certificado de Asistencia al seminario de cooperativismo (viernes de 17:00 a 18:00).<br>
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
        <p>Es todo crédito no superior a veinte mil dólares concedido a un prestatario, persona natural o
				jurídica, destinado a financiar actividades en pequeña escala de producción, comercialización o
				servicios, cuya fuente principal de pago la constituye el producto de ventas o ingresos
				generados
				por dichas actividades.<br><br>

				Se divide en 4 tipos de microcréditos:<br><br>

				<strong>1) MICROCRÉDITO MINORISTA</strong><br>
				Son aquellas operaciones de crédito cuyo monto por operación y saldo adeudado en microcréditos a
				la
				institución financiera sea menor o igual a US$ 1.000, otorgadas a microempresarios que registran
				un
				nivel de ventas anuales inferior a US$ 100.000.<br><br>


				<strong>2) MICROCRÉDITO DE ACUMULACIÓN SIMPLE</strong><br>
				Son aquellas operaciones de crédito, cuyo monto por operación y saldo adeudado en microcréditos
				a la
				institución financiera sea superior a US$ 1.000 y hasta US$ 10.000, otorgadas a microempresarios
				que
				registran un nivel de ventas o ingresos anuales inferior a US$ 100.000.<br><br>

				<strong>3) MICROCRÉDITO DE ACUMULACIÓN AMPLIADA</strong><br>
				Son aquellas operaciones de crédito superiores a US$ 10.000 otorgadas a microempresarios y que
				registran un nivel de ventas anuales inferior a US$ 100.000.<br><br>

				<strong>4) MICROCRÉDITO ASO-PRODUCTIVO</strong><br>
				Es un crédito productivo con tecnología de microcrédito, según la norma de la Junta Política y
				Regulación Monetaria y Financiera, considerando las organizaciones de la EPS en calidad de
				personas
				jurídicas mediante el financiamiento de fondos procedentes de instituciones administrativas
				afines a
				finanzas populares.<br><br>

				<strong>REQUISITOS</strong><br><br>

				- Certificado de Asistencia al seminario de cooperativismo (viernes de 17:00 a 18:00).<br>
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
};

/**
 * Simulators
 */

export const _terms: InvestmentsTerm[] = [
  { id: 1, name: '30 Días', keyDay: 'I30', valueOfDays: 30 },
  { id: 2, name: '60 Días', keyDay: 'I60', valueOfDays: 60 },
  { id: 3, name: '90 Días', keyDay: 'I90', valueOfDays: 90 },
  { id: 4, name: '180 Días', keyDay: 'I180', valueOfDays: 180 },
  { id: 5, name: 'Más de 360 Días', keyDay: 'IM360', valueOfDays: 360 },
];

export const _daysOfTheYear: number = 360;
export const _minCapitalInvestments: number = 100;
export const _maxCapitalInvestments: number = 1000000;

export const _investmentsParameters: InvestmentsParameters[] = [
  {
    id: 1,
    from: _minCapitalInvestments,
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
    to: _maxCapitalInvestments,
    I30: 5,
    I60: 5.5,
    I90: 6,
    I180: 7,
    IM360: 8.5,
  },
];

/**
 * Credits
 */

export const _minBalanceCredit: number = 500;

export const _typeCreditProduct: TypeCreditProduct[] = [
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
    interest: 16.5,
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
];

export const _creditsTerm: CreditsTerm[] = [
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
];

export const _amortizationTable: AmortizationTable[] = [
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
];
