const Login = () => {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[70vh]">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-heading font-bold text-dark mb-6 text-center">Iniciar Sesión</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8cc550]"
              placeholder="admin@notaria.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8cc550]"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#8cc550] hover:bg-[#7ab345] text-white font-medium py-3 px-4 rounded transition-colors mt-6"
          >
            Acceder
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta? <a href="/register" className="text-[#8cc550] hover:underline font-medium">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
