import { Page } from './public.type';

const daysOfTheYear: number = 360;
const minCapitalInvestments: number = 100;
const maxCapitalInvestments: number = 1000000;
const minBalanceCredit: number = 500;
const timeToShowModalSimulators: number = 3000;

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
          title: 'Pagos Complementarios',
          subtitle:
            'Con el fin de proporcionar un mejor servicio y satisfacer las necesidades de nuestros socios, clientes y usuarios.',
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
      subtitle: 'Obten tu...',
      link: '/public/products/accounts',
      externalLink: false,
      target: '_self',
      actived: false,
      icon: 'static:i_save',
    },
    {
      id: 212,
      title: 'Ahorro soñar',
      subtitle: 'Obten tu...',
      link: '/public/products/accounts',
      externalLink: false,
      target: '_self',
      actived: false,
      icon: 'static:i_dream',
    },
    {
      id: 213,
      title: 'Ahorro estudiantil',
      subtitle: 'Obten tu...',
      link: '/public/products/accounts',
      externalLink: false,
      target: '_self',
      actived: false,
      icon: 'static:i_student',
    },
    {
      id: 214,
      title: 'Multi ahorro',
      subtitle: 'Obten tu...',
      link: '/public/products/accounts',
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
      title: 'Pagos Complementarios',
      subtitle:
        'Con el fin de proporcionar un mejor servicio y satisfacer las necesidades de nuestros socios, clientes y usuarios.',
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
      html: ``,
    },
    {
      id: 212,
      title: 'Ahorro soñar',
      icon: 'static:i_dream',
      images: {
        mobile: 'assets/images/static/mobileDream.jpg',
      },
      selected: false,
      html: ``,
    },
    {
      id: 213,
      title: 'Ahorro estudiantil',
      icon: 'static:i_student',
      images: {
        mobile: 'assets/images/static/mobileStudent.jpg',
      },
      selected: false,
      html: ``,
    },
    {
      id: 214,
      title: 'Multi ahorro',
      icon: 'static:i_multi_save',
      images: {
        mobile: 'assets/images/static/mobileMultiSave.jpg',
      },
      selected: false,
      html: ``,
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
      html: ``,
    },
    {
      id: 222,
      title: 'Vivienda',
      icon: 'static:i_living_place',
      images: {
        mobile: 'assets/images/static/mobileLivingPlace.jpg',
      },
      selected: false,
      html: ``,
    },
    {
      id: 223,
      title: 'Microcrédito',
      icon: 'static:i_micro_credit',
      images: {
        mobile: 'assets/images/static/mobileMicroCredit.jpg',
      },
      selected: false,
      html: ``,
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
      html: ``,
    },
  ],
  itemTogglePayments: [
    {
      id: 241,
      title: 'Pago de nómina',
      icon: 'mat_outline:document_scanner',
      images: {
        mobile: 'assets/images/static/mobilePagoDeNomina.jpg',
      },
      selected: false,
      html: `
        <p>Se simplifica el proceso mensual de cancelación de los colaboradores de empresas públicas o privadas. Además, se transforma a los trabajadores y empleados en socios de la Cooperativa de Ahorro y Crédito Coca Ltda., quienes tendrán acceso inmediato a todos los servicios, beneficios y productos de la institución.<br><br>

        <strong>REQUISITOS</strong><br><br>

        - Cuenta de ahorros activa de la empresa pública o privada.<br>
        - Correo electrónico (Empleador).<br>
        - Cuenta de ahorro activa en la COAC Coca Ltda.<br>
        - Nómina en formato Excel.<br><br>

        <strong>BENEFICIOS</strong><br><br>

		- Se realizan transferencias de sueldos sin generar ningún costo adicional.<br>
        - No se aplican costos por el mantenimiento de la cuenta..<br>
        - La disponibilidad de los fondos está garantizada a nivel nacional a través de Cajeros Automáticos BANRED y de nuestra Banca Virtual.<br></p>`,
    },
    {
      id: 242,
      title: 'Recargas móviles',
      icon: 'mat_outline:smartphone',
      images: {
        mobile: 'assets/images/static/mobileRecargasMoviles.jpg',
      },
      selected: false,
      html: `
        <p>La institución ofrece a sus socios, clientes y usuarios la conveniencia de realizar recargas electrónicas de las operadoras de telefonía móvil Claro, CNT y Movistar como parte de sus servicios, sin aplicar cargos adicionales. Esto les permite recargar sus teléfonos móviles de manera fácil y rápida, sin incurrir en costos adicionales por la transacción.<br><br>

        <strong>MONTOS</strong><br><br>

        - El solicitante puede elegir el valor que desee, siempre y cuando sea un número entero.<br><br>

        <strong>HORARIOS</strong><br><br>

        - Nuestras oficinas están abiertas de lunes a viernes de 8:30 a.m. a 4:30 p.m.</p>`,
    },
    {
      id: 243,
      title: 'Punto de pago',
      icon: 'mat_outline:payment',
      images: {
        mobile: 'assets/images/static/mobilePuntoDePago.jpg',
      },
      selected: false,
      html: `
        <p>Con el fin de proporcionar un mejor servicio y satisfacer las necesidades de nuestros socios, clientes y usuarios, a través de nuestras ventanillas podrás realizar las siguientes acciones:<br><br>

        - Pagar los planes telefónicos.<br>
        - Cancelar el consumo telefónico.<br>
        - Realizar pagos a empresas como AVON, AZZORTI, BELCORP, ORIFLAME, YANBAL, L-BEL, NIVI, LEONISA, L-EUDINE, NATURES GARDEN, OMNILIFE.<br>
        - Realizar pagos de tarjetas de crédito como Pacificard, Mastercard y Visacash (Banco del Pacífico).<br>
        - Recaudar impuestos del SRI, incluyendo Impuesto a la Renta, IVA, RISE y Matriculación vehicular.<br>
        - Pagar multas a la Comisión y Agencia de Tránsito.<br>
        - Realizar pagos a la ANT para renovación de licencia y matrícula.<br>
        - Cancelar planillas de servicios básicos como luz, agua o teléfono.<br>
        - Además, contamos con otros pagos disponibles.<br><br>

        Estas son algunas de las acciones que podrás realizar a través de nuestras ventanillas, en nuestro compromiso de brindarte un servicio completo y satisfactorio.<br><br>

        <strong>HORARIOS</strong><br><br>

        - Nuestras oficinas están abiertas de lunes a viernes de 8:30 a.m. a 4:30 p.m.</p>`,
    },
  ],
  /**
   * Configuration
   */
  msToChangeCarousel: 10000,
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
