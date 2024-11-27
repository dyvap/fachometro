import React, { useState } from 'react';
import { Sparkles, Crown, Star } from 'lucide-react';

const MedidorFacha = () => {
  const [frase, setFrase] = useState('');
  const [resultado, setResultado] = useState(null);
  const [analizando, setAnalizando] = useState(false);

  const handleClick = () => {
    setAnalizando(true);
    setTimeout(() => {
      const nivel = Math.floor(Math.random() * 101);
      setResultado(nivel);
      setAnalizando(false);
    }, 1500);
  };

  const getNivelTexto = (valor) => {
    if (valor < 20) return "🌈 Progre detected";
    if (valor < 40) return "🤓 Centrista iluminado";
    if (valor < 60) return "👔 Cayetano promedio";
    if (valor < 80) return "💎 Barrio Salamanca";
    return "🏰 VOX wants to know your location";
  };

  const getColor = (valor) => {
    if (valor < 20) return "from-purple-500 to-pink-500";
    if (valor < 40) return "from-blue-500 to-green-500";
    if (valor < 60) return "from-yellow-500 to-orange-500";
    if (valor < 80) return "from-red-500 to-purple-500";
    return "from-red-600 to-yellow-500";
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
            Calibrando el fachómetro...
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

      {resultado !== null && !analizando && (
        <div className="mt-8 text-center">
          <div className={`text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${getColor(resultado)}`}>
            {resultado}%
          </div>
          
          <div className="text-2xl font-bold mb-4 p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
            {getNivelTexto(resultado)}
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
            * Este análisis ha sido realizado con tecnología de última generación
          </div>
        </div>
      )}
    </div>
  );
};

export default MedidorFacha;