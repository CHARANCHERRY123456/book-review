import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { logger } from '../logger';
import { MESSAGES } from '../constants/messages';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the redirect URL from the location state or default to home
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!email || !password) {
      setError(MESSAGES.REQUIRED_FIELD);
      return;
    }
    
    try {
      setLoading(true);
      await login(email, password);
      logger.info('User logged in successfully', { email });
      
      // Show success toast and redirect
      window.showToast(MESSAGES.LOGIN_SUCCESS, 'success');
      navigate(from, { replace: true });
    } catch (err) {
      logger.error('Login failed', { error: err, email });
      setError(MESSAGES.LOGIN_ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>
      
      <Card>
        <CardBody>
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Email Address"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                fullWidth
                leftIcon={<Mail size={18} className="text-gray-500" />}
              />
            </div>
            
            <div className="mb-6">
              <Input
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                fullWidth
                leftIcon={<Lock size={18} className="text-gray-500" />}
              />
              <div className="mt-1 text-right">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <Button 
              type="submit" 
              fullWidth 
              isLoading={loading} 
              disabled={loading}
            >
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800">
                Sign Up
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;