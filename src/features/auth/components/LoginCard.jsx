// LoginCard.jsx
import React, { useState } from 'react';
import { useAuthStore } from '@/shared/store/authStore';

const LoginCard = ({ onGoRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, clearError } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    await login({ emailOrUsername, password });
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <input
          className="blind-check"
          type="checkbox"
          id="blind-input"
          name="blindcheck"
          hidden
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-title">Iniciar Sesión</div>

          <label className="login-label" htmlFor="email-input">Email o Usuario</label>
          <input
            spellCheck={false}
            className="login-input"
            type="text"
            id="email-input"
            placeholder="correo@banco.com"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />

          <div className="frg-pss">
            <label className="login-label" htmlFor="password-input">Contraseña</label>
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>

          <div className="password-wrapper">
            <input
              spellCheck={false}
              className="login-input"
              type={showPassword ? 'text' : 'password'}
              id="password-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="blind-input" className="blind-toggle">
              <span className="hide-text">Ocultar</span>
              <span className="show-text">Mostrar</span>
            </label>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Ingresar'}
          </button>

          <p className="switch-link">
            ¿No tienes cuenta?{' '}
            <button type="button" onClick={onGoRegister} className="link-btn">
              Regístrate
            </button>
          </p>
        </form>

        <label htmlFor="blind-input" className="login-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110" id="pig-body">
            <ellipse cx="50" cy="106" rx="20" ry="4" fill="rgba(0,0,0,0.2)"/>
            <path d="M72,60 Q82,55 80,65 Q78,72 85,70" stroke="#e8a0b0" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <ellipse cx="50" cy="68" rx="28" ry="26" fill="#f4b8c8"/>
            <ellipse cx="50" cy="42" rx="26" ry="24" fill="#f4b8c8"/>
            <ellipse cx="40" cy="32" rx="10" ry="8" fill="white" opacity="0.25"/>
            <ellipse cx="28" cy="24" rx="9" ry="11" fill="#e8a0b0"/>
            <ellipse cx="28" cy="25" rx="5" ry="7" fill="#d4708a"/>
            <ellipse cx="72" cy="24" rx="9" ry="11" fill="#e8a0b0"/>
            <ellipse cx="72" cy="25" rx="5" ry="7" fill="#d4708a"/>
            <ellipse cx="38" cy="40" rx="6" ry="7" fill="#2a1a2a" className="pig-eye-l"/>
            <circle cx="35.5" cy="37.5" r="2" fill="white" opacity="0.9" className="pig-shine-l"/>
            <ellipse cx="62" cy="40" rx="6" ry="7" fill="#2a1a2a" className="pig-eye-r"/>
            <circle cx="59.5" cy="37.5" r="2" fill="white" opacity="0.9" className="pig-shine-r"/>
            <path d="M33,40 Q38,36 43,40" stroke="#2a1a2a" strokeWidth="2" fill="none" strokeLinecap="round" className="pig-eye-closed-l"/>
            <path d="M57,40 Q62,36 67,40" stroke="#2a1a2a" strokeWidth="2" fill="none" strokeLinecap="round" className="pig-eye-closed-r"/>
            <ellipse cx="50" cy="54" rx="12" ry="9" fill="#e8a0b0"/>
            <ellipse cx="46" cy="55" rx="3.5" ry="2.5" fill="#d4708a"/>
            <ellipse cx="54" cy="55" rx="3.5" ry="2.5" fill="#d4708a"/>
            <path d="M44,62 Q50,67 56,62" stroke="#c06080" strokeWidth="1.8" fill="none" strokeLinecap="round" className="pig-mouth"/>
            <ellipse cx="30" cy="50" rx="6" ry="4" fill="#f090a8" opacity="0.5"/>
            <ellipse cx="70" cy="50" rx="6" ry="4" fill="#f090a8" opacity="0.5"/>
            <rect x="42" y="28" width="16" height="3" rx="1.5" fill="#c06080" opacity="0.8"/>
            <ellipse cx="50" cy="19" rx="9" ry="9" fill="#f0c040"/>
            <ellipse cx="50" cy="19" rx="7" ry="7" fill="#e0a820"/>
            <text x="50" y="23" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#a06010" fontFamily="Arial">$</text>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110" id="pig-hands">
            <ellipse cx="16" cy="46" rx="13" ry="10" fill="#f4b8c8"/>
            <ellipse cx="9"  cy="38" rx="5"  ry="7"  fill="#f4b8c8"/>
            <ellipse cx="17" cy="36" rx="5"  ry="7"  fill="#f4b8c8"/>
            <ellipse cx="25" cy="39" rx="4.5" ry="6" fill="#f4b8c8"/>
            <ellipse cx="13" cy="43" rx="5"  ry="3"  fill="white" opacity="0.2"/>
            <ellipse cx="84" cy="46" rx="13" ry="10" fill="#f4b8c8"/>
            <ellipse cx="75" cy="39" rx="4.5" ry="6" fill="#f4b8c8"/>
            <ellipse cx="83" cy="36" rx="5"  ry="7"  fill="#f4b8c8"/>
            <ellipse cx="91" cy="38" rx="5"  ry="7"  fill="#f4b8c8"/>
            <ellipse cx="87" cy="43" rx="5"  ry="3"  fill="white" opacity="0.2"/>
          </svg>
        </label>
      </div>
    </div>
  );
};

export default LoginCard;