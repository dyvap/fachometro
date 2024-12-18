import React, { useState } from 'react';
import { Sparkles, Crown, Star } from 'lucide-react';

const MedidorFacha = () => {
  const [frase, setFrase] = useState('');
  const [resultado, setResultado] = useState(null);
  const [analizando, setAnalizando] = useState(false);
  const [descripcionActual, setDescripcionActual] = useState(null);

  // Patrones igual que antes...
  const patrones = {
    frasesExtremistas: [
      'arriba españa', 'viva franco', 'viva españa', 'santiago matamoros',
      'hacer españa grande', 'por dios y por españa', 'una grande y libre',
      'perro sanchez', 'viruelo', 'chepas', 'marqueses de galapagar',
      'viva cristo rey', 'anti woke', 'dictadura progre', 'dictadura sanitaria',
      'feminazi', 'nueva normalidad', 'agenda 2030', 'que te vote txapote',
      'no nos representan', 'stop comunismo'
    ],
    palabrasFacha: [
      'franco', 'fraga', 'pp', 'vox', 'farlopa', 'cocaina', 'fiesta', 'cayetano', 
      'pijo', 'polo', 'golfing', 'náutica', 'regata', 'pesca', 'caza', 'safari',
      'putero', 'pagafantas', 'moronegro', 'mena', 'paguita', 'chiringuito', 
      'meritocracia', 'emprendedor', 'autonomo', 'casero', 'alquilar', 'herencia',
      'empresa', 'negocio', 'toros', 'torero', 'cacería', 'elitista', 'club',
      'casoplón', 'cortijo', 'finca', 'premium', 'deluxe', 'opus', 'rosario',
      'misa', 'procesión', 'semana santa', 'ejercito', 'militar', 'legión',
      'guardia civil', 'policia', 'orden', 'ley', 'patria', 'nación', 'bandera',
      'himno', 'aguila', 'españa', 'tradición', 'familia', 'valores',
      'coletas', 'perroflauta', 'bolivariano', 'venezuela', 'cuba', 'eta',
      'bildu', 'separatista', 'comunista', 'rojo', 'progre', 'social comunista',
      'chalete', 'galapagar', 'porsche', 'irene montero', 'pablo iglesias',
      'memoria histórica', 'subvención', 'paguita', 'chiringuito'
    ],
    palabrasProgre: [
      'heteropatriarcado', 'privilegio blanco', 'colonialismo', 'cishetero',
      'masculinidad tóxica', 'micromachismo', 'mansplaining', 'capitalismo salvaje',
      'especismo', 'binario', 'abolir', 'colectivizar', 'okupar', 'redistribuir',
      'expropiar', 'fronteras son muerte', 'racializado', 'eurocentrismo',
      'decolonial', 'matriz cisheteropatriarcal', 'deconstruir', 'sororidad',
      'diversidad', 'inclusión', 'feminismo', 'género', 'identidad', 'colectivo',
      'derechos', 'igualdad', 'justicia social', 'sostenible', 'ecológico', 'verde',
      'público', 'social', 'comunidad', 'solidaridad', 'pueblo', 'trabajadores',
      'sanidad pública', 'educación pública', 'cambio climático', 'refugiados',
      'migrantes', 'minorías', 'interseccional', 'machista', 'patriarcado',
      'fascismo', 'antifascismo', 'igualdad', 'resistencia', 'lucha obrera',
      'anticapitalista', 'antiimperialista', 'popular', 'clase trabajadora',
      'huelga', 'manifestación', 'protesta', 'activista', 'ecosocial', 'ecofeminista',
      'lgbtiq+', 'queer', 'disidente', 'no binario', 'trans', 'aliado',
      'perspectiva de género', 'empoderamiento', 'cuidados', 'conciliación',
      'corresponsabilidad', 'techo de cristal', 'brecha salarial', 'violencia machista'
    ]
  };

  const categorias = {
    ultraProgre: {
      titulo: "⭐ CAMARADA DEL POLITBURÓ",
      descripciones: [
        "Perroflauta Premium con carnet de Podemos Platino",
        "Tienes un podcast sobre veganismo interseccional",
        "Te duele España pero en la cuenta bancaria suiza",
        "Okupas una mansión en Galapagar (irónicamente)"
      ]
    },
    progre: {
      titulo: "🌈 REVOLUCIONARIO DE TWITTER",
      descripciones: [
        "Vegano nivel 5: no comes nada que haga sombra",
        "Tu pronombre es xir/xer/antimilitarista",
        "Tu personalidad es ser de izquierdas",
        "Vas en bici aunque vivas en Cuenca"
      ]
    },
    centroIzquierda: {
      titulo: "☕ TIBIO SOCIALDEMÓCRATA",
      descripciones: [
        "Votas PSOE pero no lo dices muy alto",
        "Te indignas en Twitter pero sin hacer mucho ruido",
        "Progre solo en la universidad",
        "Dices que eres de izquierdas pero tienes iPhone"
      ]
    },
    centrista: {
      titulo: "🎪 MASTER OF EQUIDISTANCIA",
      descripciones: [
        "Iluminado por la antorcha del 'depende'",
        "El payaso del 'todos son iguales'",
        "Malabarista del 'ni de izquierdas ni de derechas'",
        "Votas según el último debate de TV"
      ]
    },
    centroDerecha: {
      titulo: "🎩 DERECHITA COBARDE",
      descripciones: [
        "Aspiras a ser tertuliano de 13TV",
        "Te preocupa la prima de riesgo (sin saber qué es)",
        "Juegas al golf pero en campo público",
        "Tienes un Porsche... en el Forza Horizon"
      ]
    },
    derecha: {
      titulo: "💎 CAYETANO PREMIUM",
      descripciones: [
        "Tu padre te consiguió trabajo en el IBEX",
        "Tu personalidad es ser del Opus",
        "Pozí que sí, pozí que no",
        "Tu segundo nombre es María o José sí o sí"
      ]
    },
    ultraDerecha: {
      titulo: "⚔️ CABALLERO LEGIONARIO",
      descripciones: [
        "ARRIBA ESPAÑÑÑA (con todas las Ñ)",
        "Premio Nacional de Facherío 2024",
        "Tu grupo de WhatsApp tiene una foto de Franco",
        "No sales de casa sin la bandera de España en la muñeca"
      ]
    }
  };

  const analizarTexto = (texto) => {
    const textoProcesado = texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const palabras = textoProcesado.split(/\s+/);
    
    let puntuacion = 50;
    let hayPalabrasDetectadas = false;
    
    patrones.frasesExtremistas.forEach(frase => {
      if(textoProcesado.includes(frase.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
        puntuacion += 25;
        hayPalabrasDetectadas = true;
      }
    });

    palabras.forEach(palabra => {
      if(patrones.palabrasFacha.some(p => palabra.includes(p.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))) {
        puntuacion += 12;
        hayPalabrasDetectadas = true;
      }
      if(patrones.palabrasProgre.some(p => palabra.includes(p.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))) {
        puntuacion -= 12;
        hayPalabrasDetectadas = true;
      }
    });

    if (!hayPalabrasDetectadas) {
      const variacion = Math.floor(Math.random() * 41) - 20;
      puntuacion += variacion;
    }

    if(texto.toLowerCase().includes('arriba') && texto.toLowerCase().includes('españa')) {
      puntuacion += 15;
    }
    if(texto.toLowerCase().includes('viva') && texto.toLowerCase().includes('franco')) {
      puntuacion += 20;
    }

    return Math.min(Math.max(Math.round(puntuacion), 0), 100);
  };

  const handleClick = () => {
    setAnalizando(true);
    setTimeout(() => {
      const nivelFacha = analizarTexto(frase);
      const nuevoNivel = getNivelTexto(nivelFacha);
      setResultado(nivelFacha);
      setDescripcionActual(nuevoNivel);
      setAnalizando(false);
    }, 1500);
  };

  const getNivelTexto = (valor) => {
    let categoria;
    if (valor < 20) categoria = categorias.ultraProgre;
    else if (valor < 35) categoria = categorias.progre;
    else if (valor < 45) categoria = categorias.centroIzquierda;
    else if (valor < 55) categoria = categorias.centrista;
    else if (valor < 65) categoria = categorias.centroDerecha;
    else if (valor < 80) categoria = categorias.derecha;
    else categoria = categorias.ultraDerecha;

    return {
      titulo: categoria.titulo,
      descripcion: categoria.descripciones[Math.floor(Math.random() * categoria.descripciones.length)]
    };
  };

  const getColor = (valor) => {
    if (valor < 20) return "from-purple-600 to-pink-600";
    if (valor < 35) return "from-pink-500 to-purple-500";
    if (valor < 45) return "from-blue-500 to-purple-500";
    if (valor < 55) return "from-gray-500 to-blue-500";
    if (valor < 65) return "from-orange-500 to-red-500";
    if (valor < 80) return "from-red-500 to-orange-500";
    return "from-red-700 to-orange-600";
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-2xl">
      <div className="text-center mb-8 relative">
        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
          Medidor de Facha
        </h1>
        {[...Array(3)].map((_, i) => (
          <Crown 
            key={i}
            className="absolute top-0 text-yellow-500 animate-bounce"
            style={{
              left: `${(i + 1) * 25}%`,
              animationDelay: `${i * 200}ms`,
              opacity: 0.7
            }}
            size={24}
          />
        ))}
        <p className="text-gray-600 italic">¡100% científico y avalado por la Universidad de Móstoles!</p>
      </div>

      <div className="mb-6">
        <textarea
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg"
          value={frase}
          onChange={(e) => setFrase(e.target.value)}
          placeholder="Escribe algo aquí para medir tu nivel..."
          rows={4}
          disabled={analizando}
        />
      </div>

      <button
        className={`w-full py-3 px-6 rounded-lg text-xl font-bold text-white transition-all transform hover:scale-105 
          ${analizando 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 shadow-lg'}`}
        onClick={handleClick}
        disabled={analizando || !frase.trim()}
      >
        {analizando ? (
          <span className="flex items-center justify-center">
            <span className="animate-spin mr-2">⚡</span> Analizando...
          </span>
        ) : "¡Analizar!"}
      </button>

      {analizando && (
        <div className="mt-8 text-center">
          <div className="text-2xl font-bold text-gray-600 animate-pulse">
            Procesando texto con IA...
          </div>
          <div className="flex justify-center mt-4">
            {[...Array(3)].map((_, i) => (
              <Sparkles
                key={i}
                className="text-yellow-500 animate-bounce mx-2"
                style={{ animationDelay: `${i * 200}ms` }}
                size={24}
              />
            ))}
          </div>
        </div>
      )}

      {resultado !== null && !analizando && descripcionActual && (
       <div className="mt-8 text-center">
         <div className={`text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${getColor(resultado)}`}>
           {resultado}%
         </div>
         
         <div className="text-2xl font-bold mb-2">
           {descripcionActual.titulo}
         </div>
         
         <div className="text-xl mb-4 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
           {descripcionActual.descripcion}
         </div>

         <div className="flex justify-center space-x-4 mt-6">
           {[...Array(Math.ceil(resultado/20))].map((_, i) => (
             <Star 
               key={i} 
               className="text-yellow-500 animate-bounce" 
               style={{ animationDelay: `${i * 150}ms` }}
               size={28}
             />
           ))}
         </div>

         <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-500 italic">
           * Este análisis ha sido realizado con tecnología de IA avanzada
         </div>
       </div>
     )}
   </div>
 );
};

export default MedidorFacha;
		  