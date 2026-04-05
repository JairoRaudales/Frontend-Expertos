
import React, { useState, useEffect } from 'react';

//import { useNavigate } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin';
import type { LoginMethod } from '@/types/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { School, Loader2, Eye, EyeOff, User, Mail } from 'lucide-react';
import axios from 'axios';

export function Login() {

  //const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isManualSelection, setIsManualSelection] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [loginMethod, setLoginMethod] = useState<LoginMethod>(() => {
    const saved = localStorage.getItem('loginMethod') as LoginMethod;
    return saved || 'username';
  });



  // Recordar último método usado - inicializar desde localStorage
  useEffect(() => {
    const savedMethod = localStorage.getItem('loginMethod') as LoginMethod;
    if (savedMethod) {
      // Usar inicialización lazy en el estado en lugar de setState aquí
      // Esto se maneja en el useState inicial
    }
  }, []);


  useEffect(() => {
    // Solo auto-detectar si el usuario NO ha seleccionado manualmente
    if (!isManualSelection && identifier.includes('@') && loginMethod !== 'email') {
      const timeoutId = setTimeout(() => {
        setLoginMethod('email');
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [identifier, loginMethod, isManualSelection]);


  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsManualSelection(false); // Resetear para permitir auto-detección en próximo intento

    try {
      const credentials = {
        identifier: identifier,
        password: password,
        method: loginMethod,
      };

      localStorage.setItem('loginMethod', loginMethod);
      
      const result = await loginMutation.mutateAsync(credentials);

      if (!result.exitoso) {
        setErrorMessage(result.mensaje || 'Error en la autenticación');
      }
      
      setIsSuccess(true);

    } catch (error: unknown) {
      let message = 'Ocurrió un error inesperado al iniciar sesión.';

      if (axios.isAxiosError(error)) {
        // Si es un error de Axios, podemos acceder a la respuesta de tu API .NET
        message = error.response?.data?.mensaje || error.message;
      } else if (error instanceof Error) {
        // Si es un error genérico de JavaScript
        message = error.message;
      }

      setErrorMessage(message);
      console.error('Error en el login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-lg">
            <div className="p-3 bg-primary rounded-xl">
              <School className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">EduAdmin</h1>
              <p className="text-sm text-muted-foreground">Sistema Administrativo Escolar</p>
            </div>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Ingrese su correo o usuario para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`transition-all duration-500 ${isSuccess ? 'opacity-0 -translate-y-8' : 'opacity-100'}`}>
              <form
                onSubmit={handleSubmit}
                className={`space-y-4 transition-opacity duration-300 ${loginMutation.isPending ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
              >

                {errorMessage && (
                  <Alert
                    variant="destructive"
                    className="animate-in slide-in-from-top-2 duration-300 border-red-500"
                  >
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}


                <div className="flex gap-2 mb-2">
                  <Button
                    type="button"
                    variant={loginMethod === 'username' ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => {
                      setLoginMethod('username');
                      setIsManualSelection(true);
                    }}
                  >
                    <User className="h-4 w-4" />
                    Usuario
                  </Button>
                  <Button
                    type="button"
                    variant={loginMethod === 'email' ? 'default' : 'outline'}
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => {
                      setLoginMethod('email');
                      setIsManualSelection(true);
                    }}
                  >
                    <Mail className="h-4 w-4" />
                    Correo
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="identifier">
                    {loginMethod === 'email' ? 'Correo Electrónico' : 'Nombre de Usuario'}
                  </Label>
                  <Input
                    id="identifier"
                    type={loginMethod === 'email' ? 'email' : 'text'}
                    placeholder={loginMethod === 'email' ? 'admin@escuela.com' : 'admin'}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    disabled={loginMutation.isPending}
                    className={errorMessage ? 'border-red-500 animate-pulse' : ''}
                  />
                  {identifier.includes('@') && loginMethod === 'username' && (
                    <p className="text-xs text-blue-500">Detectado como email, cambiando modo...</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loginMutation.isPending}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Recordarme
                    </Label>
                  </div>
                  <Button variant="link" className="text-sm px-0" type="button">
                    ¿Olvidó su contraseña?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>
              </form>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Credenciales de demo
                </span>
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>Usuario: admin</p>
              <p>Contraseña: admin</p>
            </div>
          </CardFooter>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-8">
          © 2024 EduAdmin. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}

