import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { logger } from '../logger';
import { MESSAGES } from '../constants/messages';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    general: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      general: '',
    };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = MESSAGES.REQUIRED_FIELD;
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = MESSAGES.REQUIRED_FIELD;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = MESSAGES.INVALID_EMAIL;
      isValid = false;
    }

    if (!password) {
      newErrors.password = MESSAGES.REQUIRED_FIELD;
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = MESSAGES.PASSWORD_TOO_SHORT;
      isValid = false;
    }

    if (password !== passwordConfirm) {
      newErrors.passwordConfirm = MESSAGES.PASSWORDS_DO_NOT_MATCH;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      await register(name, email, password);
      logger.info('User registered successfully', { email });
      
      // Show success toast and redirect to login
      window.showToast(MESSAGES.REGISTER_SUCCESS, 'success');
      navigate('/login');
    } catch (err) {
      logger.error('Registration failed', { error: err, email });
      setErrors({
        ...errors,
        general: MESSAGES.REGISTER_ERROR,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
      
      <Card>
        <CardBody>
          {errors.general && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
              {errors.general}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                label="Full Name"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                error={errors.name}
                fullWidth
                leftIcon={<User size={18} className="text-gray-500" />}
              />
            </div>
            
            <div className="mb-4">
              <Input
                label="Email Address"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                error={errors.email}
                fullWidth
                leftIcon={<Mail size={18} className="text-gray-500" />}
              />
            </div>
            
            <div className="mb-4">
              <Input
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                error={errors.password}
                fullWidth
                leftIcon={<Lock size={18} className="text-gray-500" />}
              />
              <p className="mt-1 text-sm text-gray-500">
                Password must be at least 6 characters
              </p>
            </div>
            
            <div className="mb-6">
              <Input
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="Confirm your password"
                error={errors.passwordConfirm}
                fullWidth
                leftIcon={<Lock size={18} className="text-gray-500" />}
              />
            </div>
            
            <Button 
              type="submit" 
              fullWidth 
              isLoading={loading} 
              disabled={loading}
            >
              Create Account
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Sign In
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default RegisterPage;