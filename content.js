/*
 * content.js
 * Banco de puzzles de "Categorías del Día". Contenido 100% original, escrito
 * a mano, en español de España. Cada puzzle tiene 4 categorías de 4 palabras
 * (16 en total), con una dificultad creciente: amarillo (fácil) < verde
 * (medio) < azul (difícil) < morado (muy difícil / juego de palabras).
 *
 * Cada puzzle se ha revisado a mano para asegurar que existe una única
 * agrupación válida de las 16 palabras en las 4 categorías previstas.
 */
window.CategoriasDelDiaPuzzles = [
  {
    id: 1,
    categories: [
      { name: 'Tipos de pasta', difficulty: 'yellow', words: ['MACARRONES', 'ESPAGUETIS', 'LASAÑA', 'RAVIOLIS'] },
      { name: 'Frutas que se pelan', difficulty: 'green', words: ['PLÁTANO', 'NARANJA', 'MANDARINA', 'KIWI'] },
      { name: 'Instrumentos de cuerda', difficulty: 'blue', words: ['GUITARRA', 'VIOLÍN', 'ARPA', 'VIOLONCHELO'] },
      { name: 'Contienen un color escondido', difficulty: 'purple', words: ['ROSARIO', 'AZULEJO', 'TESORO', 'PELIRROJO'] }
    ]
  },
  {
    id: 2,
    categories: [
      { name: 'Sinónimos de "contento"', difficulty: 'yellow', words: ['ALEGRE', 'FELIZ', 'DICHOSO', 'EUFÓRICO'] },
      { name: 'Tipos de calzado', difficulty: 'green', words: ['MOCASÍN', 'SANDALIA', 'BOTA', 'ZAPATILLA'] },
      { name: 'Ríos de España', difficulty: 'blue', words: ['EBRO', 'DUERO', 'TAJO', 'GUADALQUIVIR'] },
      { name: 'Suenan igual que otra palabra (homófonos)', difficulty: 'purple', words: ['VACA', 'BOTAR', 'HOLA', 'TUBO'] }
    ]
  },
  {
    id: 3,
    categories: [
      { name: 'Sinónimos de "triste"', difficulty: 'yellow', words: ['TRISTE', 'APENADO', 'ABATIDO', 'MELANCÓLICO'] },
      { name: 'Piezas de ajedrez', difficulty: 'green', words: ['REY', 'REINA', 'ALFIL', 'PEÓN'] },
      { name: 'Capitales de Europa', difficulty: 'blue', words: ['MADRID', 'PARÍS', 'ROMA', 'LISBOA'] },
      { name: 'Son anagramas de otra palabra', difficulty: 'purple', words: ['AMOR', 'ARCO', 'RATA', 'CASA'] }
    ]
  },
  {
    id: 4,
    categories: [
      { name: 'Ingredientes de una ensalada', difficulty: 'yellow', words: ['LECHUGA', 'TOMATE', 'PEPINO', 'CEBOLLA'] },
      { name: 'Tipos de nubes', difficulty: 'green', words: ['CÚMULO', 'ESTRATO', 'CIRRO', 'NIMBO'] },
      { name: 'Herramientas de carpintería', difficulty: 'blue', words: ['MARTILLO', 'SERRUCHO', 'FORMÓN', 'CEPILLO'] },
      { name: 'Contienen la palabra "PIE"', difficulty: 'purple', words: ['PUNTAPIÉ', 'TRASPIÉ', 'CIEMPIÉS', 'REPOSAPIÉS'] }
    ]
  },
  {
    id: 5,
    categories: [
      { name: 'Sinónimos de "rápido"', difficulty: 'yellow', words: ['VELOZ', 'ÁGIL', 'LIGERO', 'RAUDO'] },
      { name: 'Prendas de abrigo', difficulty: 'green', words: ['ABRIGO', 'BUFANDA', 'GUANTES', 'GORRO'] },
      { name: 'Ríos de Sudamérica', difficulty: 'blue', words: ['AMAZONAS', 'ORINOCO', 'PARANÁ', 'MAGDALENA'] },
      { name: 'Son palíndromos', difficulty: 'purple', words: ['SOMOS', 'OSO', 'RADAR', 'REVIVIR'] }
    ]
  },
  {
    id: 6,
    categories: [
      { name: 'Utensilios de cocina', difficulty: 'yellow', words: ['CUCHARA', 'TENEDOR', 'CUCHILLO', 'CAZO'] },
      { name: 'Animales que ponen huevos', difficulty: 'green', words: ['GALLINA', 'TORTUGA', 'COCODRILO', 'AVESTRUZ'] },
      { name: 'Bailes latinos', difficulty: 'blue', words: ['SALSA', 'MERENGUE', 'BACHATA', 'MAMBO'] },
      { name: 'Contienen un número escondido', difficulty: 'purple', words: ['DOSIS', 'TRESILLO', 'CIENCIA', 'MILAGRO'] }
    ]
  },
  {
    id: 7,
    categories: [
      { name: 'Muebles de un salón', difficulty: 'yellow', words: ['SOFÁ', 'MESA', 'ESTANTERÍA', 'SILLÓN'] },
      { name: 'Instrumentos de percusión', difficulty: 'green', words: ['TAMBOR', 'BATERÍA', 'PANDERETA', 'XILÓFONO'] },
      { name: 'Planetas del sistema solar', difficulty: 'blue', words: ['MARTE', 'VENUS', 'SATURNO', 'JÚPITER'] },
      { name: 'Son homófonos de otra palabra', difficulty: 'purple', words: ['BASTA', 'GRABAR', 'BELLO', 'SABIA'] }
    ]
  },
  {
    id: 8,
    categories: [
      { name: 'Días de la semana', difficulty: 'yellow', words: ['LUNES', 'MARTES', 'JUEVES', 'VIERNES'] },
      { name: 'Formas geométricas', difficulty: 'green', words: ['TRIÁNGULO', 'CUADRADO', 'CÍRCULO', 'RECTÁNGULO'] },
      { name: 'Partes de un coche', difficulty: 'blue', words: ['MOTOR', 'VOLANTE', 'FRENO', 'MALETERO'] },
      { name: 'Empiezan por "GUARDA"', difficulty: 'purple', words: ['GUARDARROPA', 'GUARDAESPALDAS', 'GUARDABOSQUES', 'GUARDAMETA'] }
    ]
  },
  {
    id: 9,
    categories: [
      { name: 'Frutas tropicales', difficulty: 'yellow', words: ['MANGO', 'PIÑA', 'PAPAYA', 'MARACUYÁ'] },
      { name: 'Materias escolares', difficulty: 'green', words: ['MATEMÁTICAS', 'HISTORIA', 'BIOLOGÍA', 'GEOGRAFÍA'] },
      { name: 'Tipos de queso', difficulty: 'blue', words: ['MANCHEGO', 'PARMESANO', 'ROQUEFORT', 'MOZZARELLA'] },
      { name: 'Empiezan y acaban con la misma letra', difficulty: 'purple', words: ['OJO', 'RADAR', 'AGUA', 'ELEFANTE'] }
    ]
  },
  {
    id: 10,
    categories: [
      { name: 'Sinónimos de "bonito"', difficulty: 'yellow', words: ['PRECIOSO', 'HERMOSO', 'BELLO', 'ENCANTADOR'] },
      { name: 'Piezas de una casa', difficulty: 'green', words: ['TEJADO', 'VENTANA', 'PUERTA', 'CHIMENEA'] },
      { name: 'Signos del zodiaco', difficulty: 'blue', words: ['ARIES', 'TAURO', 'LEO', 'VIRGO'] },
      { name: 'Empiezan por "ENTRE"', difficulty: 'purple', words: ['ENTRETIEMPO', 'ENTREPIERNA', 'ENTRECEJO', 'ENTRESUELO'] }
    ]
  },
  {
    id: 11,
    categories: [
      { name: 'Deportes de equipo', difficulty: 'yellow', words: ['FÚTBOL', 'BALONCESTO', 'VOLEIBOL', 'BALONMANO'] },
      { name: 'Instrumentos de medición', difficulty: 'green', words: ['TERMÓMETRO', 'BALANZA', 'REGLA', 'CRONÓMETRO'] },
      { name: 'Partes de una flor', difficulty: 'blue', words: ['PÉTALO', 'TALLO', 'RAÍZ', 'POLEN'] },
      { name: 'Terminan en "-ILLO"', difficulty: 'purple', words: ['BOLSILLO', 'MARTILLO', 'TOBILLO', 'ANILLO'] }
    ]
  },
  {
    id: 12,
    categories: [
      { name: 'Utensilios de escritura', difficulty: 'yellow', words: ['BOLÍGRAFO', 'LÁPIZ', 'ROTULADOR', 'PLUMA'] },
      { name: 'Muebles de dormitorio', difficulty: 'green', words: ['CAMA', 'ARMARIO', 'MESILLA', 'CÓMODA'] },
      { name: 'Especias y condimentos', difficulty: 'blue', words: ['PIMIENTA', 'CANELA', 'COMINO', 'ORÉGANO'] },
      { name: 'Son anagramas de otra palabra', difficulty: 'purple', words: ['ROPA', 'SAL', 'SOL', 'RAMO'] }
    ]
  },
  {
    id: 13,
    categories: [
      { name: 'Sinónimos de "grande"', difficulty: 'yellow', words: ['ENORME', 'INMENSO', 'GIGANTE', 'COLOSAL'] },
      { name: 'Herramientas de jardinería', difficulty: 'green', words: ['PALA', 'RASTRILLO', 'REGADERA', 'TIJERAS'] },
      { name: 'Continentes', difficulty: 'blue', words: ['EUROPA', 'ÁFRICA', 'ASIA', 'OCEANÍA'] },
      { name: 'Contienen la palabra "SOL" escondida', difficulty: 'purple', words: ['SOLDADO', 'CONSOLA', 'ABSOLUTO', 'GIRASOL'] }
    ]
  },
  {
    id: 14,
    categories: [
      { name: 'Tipos de pan', difficulty: 'yellow', words: ['BARRA', 'CHAPATA', 'BOLLO', 'HOGAZA'] },
      { name: 'Material de oficina', difficulty: 'green', words: ['GRAPADORA', 'TIJERAS', 'CLIP', 'PERFORADORA'] },
      { name: 'Océanos y mares del mundo', difficulty: 'blue', words: ['PACÍFICO', 'ATLÁNTICO', 'ÍNDICO', 'MEDITERRÁNEO'] },
      { name: 'Son homófonos de otra palabra (con H muda)', difficulty: 'purple', words: ['ASTA', 'OJEAR', 'ECHO', 'ERRAR'] }
    ]
  },
  {
    id: 15,
    categories: [
      { name: 'Sinónimos de "hablar"', difficulty: 'yellow', words: ['CHARLAR', 'CONVERSAR', 'PLATICAR', 'DIALOGAR'] },
      { name: 'Partes del cuerpo humano', difficulty: 'green', words: ['BRAZO', 'PIERNA', 'HOMBRO', 'CODO'] },
      { name: 'Tipos de música', difficulty: 'blue', words: ['JAZZ', 'ROCK', 'REGGAE', 'POP'] },
      { name: 'Empiezan por "CONTRA"', difficulty: 'purple', words: ['CONTRAPUNTO', 'CONTRASEÑA', 'CONTRABANDO', 'CONTRAPESO'] }
    ]
  },
  {
    id: 16,
    categories: [
      { name: 'Sinónimos de "difícil"', difficulty: 'yellow', words: ['COMPLICADO', 'ARDUO', 'COMPLEJO', 'ENREVESADO'] },
      { name: 'Tipos de vivienda', difficulty: 'green', words: ['CASA', 'PISO', 'CHALET', 'ÁTICO'] },
      { name: 'Monedas de distintos países', difficulty: 'blue', words: ['EURO', 'DÓLAR', 'LIBRA', 'YEN'] },
      { name: 'Contienen "PAN" escondido', difficulty: 'purple', words: ['PANTALÓN', 'ESPANTO', 'PANORAMA', 'CAMPANA'] }
    ]
  },
  {
    id: 17,
    categories: [
      { name: 'Sinónimos de "mirar"', difficulty: 'yellow', words: ['OBSERVAR', 'CONTEMPLAR', 'OJEAR', 'ATISBAR'] },
      { name: 'Instrumentos musicales de viento', difficulty: 'green', words: ['FLAUTA', 'TROMPETA', 'SAXOFÓN', 'CLARINETE'] },
      { name: 'Capitales de América', difficulty: 'blue', words: ['WASHINGTON', 'OTTAWA', 'BRASILIA', 'LIMA'] },
      { name: 'Terminan en "-ADERO/A"', difficulty: 'purple', words: ['LAVADERO', 'TENDEDERO', 'COMEDERO', 'FREGADERO'] }
    ]
  },
  {
    id: 18,
    categories: [
      { name: 'Sinónimos de "enfadado"', difficulty: 'yellow', words: ['ENFURECIDO', 'IRRITADO', 'MOLESTO', 'INDIGNADO'] },
      { name: 'Tipos de transporte público', difficulty: 'green', words: ['AUTOBÚS', 'METRO', 'TRANVÍA', 'TREN'] },
      { name: 'Elementos químicos', difficulty: 'blue', words: ['OXÍGENO', 'HIDRÓGENO', 'CARBONO', 'NITRÓGENO'] },
      { name: 'Cambian de significado según lleven tilde', difficulty: 'purple', words: ['SOLO', 'MAS', 'SI', 'TE'] }
    ]
  },
  {
    id: 19,
    categories: [
      { name: 'Utensilios de baño', difficulty: 'yellow', words: ['TOALLA', 'JABÓN', 'CHAMPÚ', 'ESPONJA'] },
      { name: 'Insectos', difficulty: 'green', words: ['HORMIGA', 'MARIPOSA', 'ABEJA', 'GRILLO'] },
      { name: 'Herramientas de mecánico', difficulty: 'blue', words: ['LLAVE', 'DESTORNILLADOR', 'ALICATES', 'TALADRO'] },
      { name: 'Son animales... pero también objetos cotidianos', difficulty: 'purple', words: ['GATO', 'MONO', 'ARAÑA', 'PULPO'] }
    ]
  },
  {
    id: 20,
    categories: [
      { name: 'Sinónimos de "empezar"', difficulty: 'yellow', words: ['COMENZAR', 'INICIAR', 'ARRANCAR', 'PRINCIPIAR'] },
      { name: 'Tipos de sombrero', difficulty: 'green', words: ['GORRA', 'BOINA', 'PAMELA', 'CHISTERA'] },
      { name: 'Razas de perro', difficulty: 'blue', words: ['BULLDOG', 'CHIHUAHUA', 'CANICHE', 'DÁLMATA'] },
      { name: 'Terminan en "-ADOR" (son objetos)', difficulty: 'purple', words: ['ORDENADOR', 'CONGELADOR', 'SECADOR', 'TOSTADOR'] }
    ]
  },
  {
    id: 21,
    categories: [
      { name: 'Frutos secos', difficulty: 'yellow', words: ['ALMENDRA', 'NUEZ', 'AVELLANA', 'PISTACHO'] },
      { name: 'Partes de un libro', difficulty: 'green', words: ['PORTADA', 'ÍNDICE', 'PRÓLOGO', 'CAPÍTULO'] },
      { name: 'Fenómenos meteorológicos', difficulty: 'blue', words: ['LLUVIA', 'GRANIZO', 'NIEBLA', 'TORMENTA'] },
      { name: 'Contienen un animal escondido', difficulty: 'purple', words: ['HERMOSO', 'BARATA', 'ZAPATO', 'TOCAR'] }
    ]
  },
  {
    id: 22,
    categories: [
      { name: 'Medios de transporte acuático', difficulty: 'yellow', words: ['BARCO', 'VELERO', 'CANOA', 'YATE'] },
      { name: 'Tipos de té e infusiones', difficulty: 'green', words: ['MANZANILLA', 'MENTA', 'TILA', 'HIERBABUENA'] },
      { name: 'Palabras del circo', difficulty: 'blue', words: ['PAYASO', 'TRAPECISTA', 'MALABARISTA', 'DOMADOR'] },
      { name: 'Empiezan por "MAR" sin relación con el mar', difficulty: 'purple', words: ['MARTILLO', 'MARAVILLA', 'MARIPOSA', 'MARCIANO'] }
    ]
  },
  {
    id: 23,
    categories: [
      { name: 'Estados de la materia', difficulty: 'yellow', words: ['SÓLIDO', 'LÍQUIDO', 'GASEOSO', 'PLASMA'] },
      { name: 'Utensilios de pesca', difficulty: 'green', words: ['CAÑA', 'ANZUELO', 'RED', 'CEBO'] },
      { name: 'Monumentos históricos de España', difficulty: 'blue', words: ['ALCÁZAR', 'GIRALDA', 'ALHAMBRA', 'ACUEDUCTO'] },
      { name: 'Contienen "MAR" escondido', difficulty: 'purple', words: ['AMARGO', 'AMARILLO', 'AMARRAR', 'COMARCA'] }
    ]
  },
  {
    id: 24,
    categories: [
      { name: 'Sinónimos de "inteligente"', difficulty: 'yellow', words: ['LISTO', 'ASTUTO', 'AGUDO', 'PERSPICAZ'] },
      { name: 'Tipos de flores', difficulty: 'green', words: ['ROSA', 'TULIPÁN', 'MARGARITA', 'CLAVEL'] },
      { name: 'Cuerpos celestes', difficulty: 'blue', words: ['ESTRELLA', 'COMETA', 'ASTEROIDE', 'GALAXIA'] },
      { name: 'Son nombres de persona y también palabras comunes', difficulty: 'purple', words: ['PILAR', 'AMPARO', 'ALBA', 'LUZ'] }
    ]
  },
  {
    id: 25,
    categories: [
      { name: 'Verduras', difficulty: 'yellow', words: ['ZANAHORIA', 'CALABACÍN', 'BERENJENA', 'PIMIENTO'] },
      { name: 'Materiales de construcción', difficulty: 'green', words: ['LADRILLO', 'CEMENTO', 'MADERA', 'YESO'] },
      { name: 'Piezas de un ordenador', difficulty: 'blue', words: ['TECLADO', 'TORRE', 'MONITOR', 'PANTALLA'] },
      { name: 'Terminan en "-ÓN"', difficulty: 'purple', words: ['CAJÓN', 'SILLÓN', 'CAMISÓN', 'JABÓN'] }
    ]
  },
  {
    id: 26,
    categories: [
      { name: 'Sinónimos de "cansado"', difficulty: 'yellow', words: ['AGOTADO', 'EXHAUSTO', 'FATIGADO', 'RENDIDO'] },
      { name: 'Protección contra la lluvia', difficulty: 'green', words: ['PARAGUAS', 'CHUBASQUERO', 'IMPERMEABLE', 'PONCHO'] },
      { name: 'Palabras de la playa', difficulty: 'blue', words: ['ARENA', 'OLA', 'SOMBRILLA', 'TOALLA'] },
      { name: 'Son homófonos de otra palabra', difficulty: 'purple', words: ['BASTO', 'AYA', 'BOTAR', 'HONDA'] }
    ]
  },
  {
    id: 27,
    categories: [
      { name: 'Sinónimos de "bueno" (calidad)', difficulty: 'yellow', words: ['EXCELENTE', 'MAGNÍFICO', 'ESTUPENDO', 'FANTÁSTICO'] },
      { name: 'Utensilios de dibujo y pintura', difficulty: 'green', words: ['PINCEL', 'PALETA', 'CABALLETE', 'ACUARELA'] },
      { name: 'Partes de un árbol', difficulty: 'blue', words: ['RAÍZ', 'TRONCO', 'RAMA', 'HOJA'] },
      { name: 'Cambian de significado según lleven tilde', difficulty: 'purple', words: ['COMO', 'DONDE', 'QUE', 'CUANDO'] }
    ]
  },
  {
    id: 28,
    categories: [
      { name: 'Estaciones del año', difficulty: 'yellow', words: ['PRIMAVERA', 'VERANO', 'OTOÑO', 'INVIERNO'] },
      { name: 'Postres típicos españoles', difficulty: 'green', words: ['FLAN', 'NATILLAS', 'TARTA', 'TORRIJA'] },
      { name: 'Palabras del ajedrez', difficulty: 'blue', words: ['JAQUE', 'ENROQUE', 'GAMBITO', 'TABLERO'] },
      { name: 'Terminan en "-ILLA"', difficulty: 'purple', words: ['MANTEQUILLA', 'PESADILLA', 'SEMILLA', 'COSTILLA'] }
    ]
  },
  {
    id: 29,
    categories: [
      { name: 'Sinónimos de "mentira"', difficulty: 'yellow', words: ['ENGAÑO', 'EMBUSTE', 'FALSEDAD', 'PATRAÑA'] },
      { name: 'Partes de una ventana', difficulty: 'green', words: ['MARCO', 'CRISTAL', 'PERSIANA', 'ALFÉIZAR'] },
      { name: 'Constelaciones', difficulty: 'blue', words: ['ORIÓN', 'CASIOPEA', 'ANDRÓMEDA', 'PEGASO'] },
      { name: 'Contienen "ORO" escondido', difficulty: 'purple', words: ['SONORO', 'DECORO', 'TORONJA', 'CORONA'] }
    ]
  },
  {
    id: 30,
    categories: [
      { name: 'Partes del día', difficulty: 'yellow', words: ['MAÑANA', 'MEDIODÍA', 'TARDE', 'NOCHE'] },
      { name: 'Cubiertos y vajilla', difficulty: 'green', words: ['PLATO', 'VASO', 'TAZA', 'BOL'] },
      { name: 'Razas de gato', difficulty: 'blue', words: ['SIAMÉS', 'PERSA', 'ANGORA', 'BENGALÍ'] },
      { name: 'Son palíndromos', difficulty: 'purple', words: ['RECONOCER', 'ROTOR', 'ORO', 'SOMOS'] }
    ]
  },
  {
    id: 31,
    categories: [
      { name: 'Sinónimos de "fuerte"', difficulty: 'yellow', words: ['POTENTE', 'ROBUSTO', 'VIGOROSO', 'RESISTENTE'] },
      { name: 'Tipos de sopa', difficulty: 'green', words: ['CALDO', 'CREMA', 'GAZPACHO', 'CONSOMÉ'] },
      { name: 'Partes de una bicicleta', difficulty: 'blue', words: ['MANILLAR', 'PEDAL', 'CADENA', 'SILLÍN'] },
      { name: 'Empiezan por "ROMPE"', difficulty: 'purple', words: ['ROMPECABEZAS', 'ROMPEOLAS', 'ROMPEHIELOS', 'ROMPENUECES'] }
    ]
  },
  {
    id: 32,
    categories: [
      { name: 'Sinónimos de "pequeño"', difficulty: 'yellow', words: ['DIMINUTO', 'MINÚSCULO', 'CHIQUITO', 'REDUCIDO'] },
      { name: 'Muebles de oficina', difficulty: 'green', words: ['ESCRITORIO', 'SILLA', 'ARCHIVADOR', 'ESTANTERÍA'] },
      { name: 'Palabras del teatro', difficulty: 'blue', words: ['ESCENARIO', 'TELÓN', 'BUTACA', 'GUIÓN'] },
      { name: 'Esconden la palabra "OSO"', difficulty: 'purple', words: ['FAMOSO', 'GRACIOSO', 'CURIOSO', 'ESPACIOSO'] }
    ]
  },
  {
    id: 33,
    categories: [
      { name: 'Sinónimos de "importante"', difficulty: 'yellow', words: ['ESENCIAL', 'CRUCIAL', 'FUNDAMENTAL', 'PRIMORDIAL'] },
      { name: 'Elementos de un cuarto de baño', difficulty: 'green', words: ['BAÑERA', 'LAVABO', 'INODORO', 'DUCHA'] },
      { name: 'Herramientas de costura', difficulty: 'blue', words: ['AGUJA', 'HILO', 'DEDAL', 'TIJERAS'] },
      { name: 'Tienen doble sentido (prenda y otra cosa)', difficulty: 'purple', words: ['MEDIA', 'BOTA', 'LAZO', 'CORREA'] }
    ]
  },
  {
    id: 34,
    categories: [
      { name: 'Sinónimos de "amigo"', difficulty: 'yellow', words: ['COMPAÑERO', 'COLEGA', 'CAMARADA', 'CONFIDENTE'] },
      { name: 'Vehículos de ruedas para la ciudad', difficulty: 'green', words: ['BICICLETA', 'MONOPATÍN', 'PATINETE', 'TRICICLO'] },
      { name: 'Palabras de fotografía', difficulty: 'blue', words: ['CÁMARA', 'OBJETIVO', 'ENFOQUE', 'DISPARADOR'] },
      { name: 'Son anagramas de otra palabra', difficulty: 'purple', words: ['ASNO', 'LOBO', 'CABO', 'CIMA'] }
    ]
  },
  {
    id: 35,
    categories: [
      { name: 'Partes de un zapato', difficulty: 'yellow', words: ['SUELA', 'CORDÓN', 'TACÓN', 'PLANTILLA'] },
      { name: 'Ingredientes de una tortilla de patatas', difficulty: 'green', words: ['HUEVO', 'PATATA', 'CEBOLLA', 'ACEITE'] },
      { name: 'Términos de tenis', difficulty: 'blue', words: ['SAQUE', 'RED', 'REVÉS', 'RAQUETA'] },
      { name: 'Empiezan por "BOCA"', difficulty: 'purple', words: ['BOCATA', 'BOCACALLE', 'BOCADILLO', 'BOCAZAS'] }
    ]
  }
];
