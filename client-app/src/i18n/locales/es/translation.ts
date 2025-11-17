const translation = {
  navigation: {
    items: [
      { to: '/', label: 'Inicio' },
      { to: '/reservations/options', label: 'Experiencias' },
      { to: '/reservations/new', label: 'Reservar' },
      { to: '/reservations/status', label: 'Seguimiento' }
    ],
    signIn: 'Iniciar sesión',
    concierge: 'Acceso concierge',
    language: {
      label: 'Idioma',
      es: 'ES',
      en: 'EN'
    }
  },
  hero: {
    badge: 'Vive Costa Rica',
    titleLead: 'Reserva aventuras auténticas en',
    titleHighlight: 'Costa Rica',
    description:
      'Explora playas de arena blanca, canopy entre volcanes y encuentros con perezosos guiados por expertos locales.',
    primaryCta: 'Planear experiencia',
    secondaryCta: 'Ver catálogo',
    stats: [
      { value: '320+', label: 'Experiencias tropicales seleccionadas' },
      { value: '4.9/5', label: 'Calificación promedio de viajeros' }
    ],
    card: {
      statusTitle: 'Estado actual',
      itinerary: 'Itinerario Caribe',
      schedule: '12 julio 2026 • 2 personas',
      teamTitle: 'Equipo asignado',
      team: ['Guía naturalista', 'Conductor privado', 'Chef local'],
      testimonial:
        '“Disfrutamos tortugas anidando al amanecer y un café gourmet con vista al volcán Arenal.”'
    }
  },
  highlights: {
    eyebrow: 'Por qué reservar con nosotros',
    title: 'Una ventana a la esencia costarricense',
    description:
      'Diseñamos itinerarios responsables que conectan playas del Pacífico, selvas nubosas y pueblos con sabor a pura vida.',
    items: [
      {
        icon: '🌊',
        title: 'Red de expertos locales',
        description: 'Guías certificados que comparten secretos de Cahuita, Monteverde y las montañas de Talamanca.'
      },
      {
        icon: '🦥',
        title: 'Encuentros sostenibles',
        description: 'Observa perezosos y guacamayas en centros de conservación con impacto directo en la comunidad.'
      },
      {
        icon: '🌋',
        title: 'Aventura y bienestar',
        description: 'Canopy sobre volcanes, rafting en el Pacuare y retiros termales en La Fortuna.'
      }
    ]
  },
  flow: {
    eyebrow: 'Cómo funciona',
    title: 'Tu viaje soñado en tres pasos sencillos',
    description: 'Desde la inspiración hasta la confirmación, te acompañamos con logística experta y soporte 24/7.',
    steps: [
      {
        step: '01',
        title: 'Cuéntanos tu estilo',
        description: 'Elige el tipo de experiencia, fechas y nivel de aventura: surf, bienestar, gastronomía o cultura.'
      },
      {
        step: '02',
        title: 'Recibe propuestas curadas',
        description: 'Nuestro concierge selecciona alojamientos boutique, tours certificados y traslados seguros.'
      },
      {
        step: '03',
        title: 'Confirma y disfruta',
        description: 'Aprueba el itinerario, paga en línea y recibe recordatorios con recomendaciones locales.'
      }
    ]
  },
  testimonials: {
    eyebrow: 'Historias de pura vida',
    title: 'Viajeros que ya viven el encanto tico',
    description: 'Experiencias reales diseñadas con respeto por la naturaleza y las comunidades costarricenses.',
    items: [
      {
        quote:
          'La caminata nocturna en Monteverde fue mágica. Vimos ranas de vidrio y aprendimos sobre reforestación comunitaria.',
        name: 'Isabel & Martín',
        role: 'Escapada romántica • Monteverde'
      },
      {
        quote:
          'Reservamos canopy, aguas termales y cafés artesanales en un solo flujo. Todo sincronizado y sin estrés.',
        name: 'Familia Rodríguez',
        role: 'Vacaciones familiares • La Fortuna'
      },
      {
        quote:
          'Nuestros clientes VIP quedaron fascinados con el tour de cacao ancestral y la cena privada frente al Pacífico.',
        name: 'Agencia Latitude',
        role: 'Evento corporativo • Guanacaste'
      }
    ]
  },
  cta: {
    title: '¿Listo para vivir la pura vida?',
    description:
      'Agendemos una videollamada con tu concierge para diseñar un itinerario personalizado en menos de 24 horas.',
    primary: 'Comenzar reserva',
    secondary: 'Habla con un experto'
  },
  footer: {
    description:
      'Inspirando viajes responsables por Costa Rica: playas caribeñas, volcanes activos y selvas llenas de vida.',
    links: {
      experiences: 'Experiencias',
      plan: 'Planificar viaje',
      status: 'Seguimiento',
      concierge: 'Acceso concierge'
    },
    copyright: 'Todos los derechos reservados.'
  },
  booking: {
    title: 'Reserva tu experiencia',
    description:
      'Completa los detalles para conectar con un concierge certificado que confirmará disponibilidad y coordinará traslados.',
    selectLabel: 'Selecciona una experiencia',
    selectPlaceholder: 'Elige una experiencia en Costa Rica',
    datetimeLabel: 'Fecha y hora preferida',
    notesLabel: 'Detalles especiales',
    notesPlaceholder: 'Cuéntanos sobre edades, intereses o requerimientos alimentarios',
    submit: 'Enviar reserva',
    submitting: 'Enviando…',
    success: '¡Reserva enviada! Tu código es {{code}}',
    errors: {
      noOption: 'Selecciona una experiencia para continuar.',
      generic: 'Ocurrió un error al guardar la reserva.'
    },
    availabilityTitle: 'Disponibilidad sugerida',
    availabilityEmpty: 'Selecciona una experiencia para ver horarios recomendados.',
    availabilityNone: 'Coordina con tu concierge para verificar disponibilidad personalizada.'
  },
  availability: {
    weekday: {
      0: 'Domingo',
      1: 'Lunes',
      2: 'Martes',
      3: 'Miércoles',
      4: 'Jueves',
      5: 'Viernes',
      6: 'Sábado'
    },
    capacity: '{{count}} grupos por bloque'
  },
  statusLabels: {
    pending: 'Pendiente',
    awaiting_confirmation: 'En confirmación',
    confirmed: 'Confirmada',
    in_progress: 'En curso',
    fulfilled: 'Completada',
    cancelled: 'Cancelada',
    rejected: 'Rechazada'
  },
  options: {
    eyebrow: 'Colección Costa Caribe - Pacífico',
    title: 'Colección de experiencias costarricenses',
    description:
      'Explora aventuras personalizadas desde el Caribe hasta el Pacífico. Cada opción incluye guías bilingües y transporte seguro.',
    curatedTag: 'Curada',
    badges: ['Aventura', 'Naturaleza', 'Bienestar'],
    loading: 'Cargando experiencias tropicales…'
  },
  statusPage: {
    title: 'Sigue tu reserva',
    description: 'Introduce tu código para ver actualizaciones y conocer a tu equipo de concierge.',
    placeholder: 'Código de confirmación',
    search: 'Consultar',
    loading: 'Buscando…',
    errors: {
      empty: 'Ingresa tu código de confirmación.',
      generic: 'No encontramos una reserva con ese código.'
    },
    labels: {
      status: 'Estado',
      scheduled: 'Programado para',
      concierge: 'Concierge asignado',
      reference: 'Código de referencia'
    }
  },
  auth: {
    title: 'Acceso a tu cuenta',
    description: 'Gestiona reservas guardadas y obtén soporte prioritario.',
    email: 'Correo electrónico',
    password: 'Contraseña',
    signIn: 'Iniciar sesión',
    signingIn: 'Iniciando…',
    signedIn: 'Sesión iniciada correctamente.',
    signOut: 'Cerrar sesión',
    signedAs: 'Sesión activa como {{email}}'
  },
  notFound: {
    title: 'No encontramos esta página',
    description: 'Regresa al inicio para seguir explorando experiencias en Costa Rica.',
    cta: 'Explorar experiencias'
  },
  languageSwitcher: {
    tooltip: 'Cambiar idioma'
  }
};

export default translation;
