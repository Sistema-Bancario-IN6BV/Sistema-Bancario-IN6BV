import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
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
    <StyledWrapper>
      <div className="card">
        <input
          className="blind-check"
          type="checkbox"
          id="blind-input"
          name="blindcheck"
          hidden
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />

        <form className="form" onSubmit={handleSubmit}>
          <div className="title">Iniciar Sesión</div>

          <label className="label_input" htmlFor="email-input">Email o Usuario</label>
          <input
            spellCheck={false}
            className="input"
            type="text"
            id="email-input"
            placeholder="correo@banco.com"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />

          <div className="frg_pss">
            <label className="label_input" htmlFor="password-input">Contraseña</label>
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="password-wrapper">
            <input
              spellCheck={false}
              className="input"
              type={showPassword ? 'text' : 'password'}
              id="password-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="blind-input" className="blind_input">
              <span className="hide">Ocultar</span>
              <span className="show">Mostrar</span>
            </label>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Ingresar'}
          </button>

          <p className="switch-link">
            ¿No tienes cuenta?{' '}
            <button type="button" onClick={onGoRegister} className="link-btn">
              Regístrate
            </button>
          </p>
        </form>

        {/* Cerdito alcancía */}
        <label htmlFor="blind-input" className="avatar">
          {/* Cuerpo principal */}
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
            {/* Ojos abiertos */}
            <ellipse cx="38" cy="40" rx="6" ry="7" fill="#2a1a2a" className="pig-eye-l"/>
            <circle cx="35.5" cy="37.5" r="2" fill="white" opacity="0.9" className="pig-shine-l"/>
            <ellipse cx="62" cy="40" rx="6" ry="7" fill="#2a1a2a" className="pig-eye-r"/>
            <circle cx="59.5" cy="37.5" r="2" fill="white" opacity="0.9" className="pig-shine-r"/>
            {/* Ojos cerrados (líneas) - ocultos por defecto */}
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

          {/* Patas */}
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
    </StyledWrapper>
  );
};

const pigFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
`;
const pigBlink = keyframes`
  0%, 93%, 100% { ry: 7; }
  95%            { ry: 0.4; }
`;
const pigLook = keyframes`
  0%, 100% { transform: translateY(0px) rotateY(0deg); }
  25%       { transform: translateY(-3px) rotateY(-6deg); }
  75%       { transform: translateY(-3px) rotateY(6deg); }
`;
const spin = keyframes`to { transform: rotate(360deg); }`;

const StyledWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a1628 0%, #0d2144 50%, #0a1e3d 100%);

  .card {
    --p: 32px;
    --w-form: 380px;
    --input-px: 0.75rem;
    --input-py: 0.65rem;
    --blind-w: 72px;
    --space-y: 0.5rem;
    width: var(--w-form);
    max-width: 95vw;
    border-radius: 20px;
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(244,184,200,0.2);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    padding: var(--p);
    scrollbar-width: none;
    font-family: "Trebuchet MS","Lucida Sans Unicode",Arial,sans-serif;
    user-select: none;
  }

  .avatar {
    --sz-avatar: 170px;
    order: 0;
    width: var(--sz-avatar);
    height: var(--sz-avatar);
    border: 2px solid rgba(244,184,200,0.3);
    border-radius: 9999px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    margin: 0 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle at 50% 40%, #0d1f3c, #060f1e);
    box-shadow: 0 0 30px rgba(244,184,200,0.1);
    --sz-svg: calc(var(--sz-avatar) - 8px);
  }

  .avatar svg {
    position: absolute;
    transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1);
    height: var(--sz-svg);
    width: var(--sz-svg);
    pointer-events: none;
  }

  .avatar svg#pig-body {
    z-index: 1;
    animation: ${pigFloat} 3s ease-in-out infinite;
  }

  .avatar svg#pig-hands {
    z-index: 2;
    transform: translateY(calc(var(--sz-avatar) / 1.1));
  }

  /* Parpadeo ojos */
  .avatar svg#pig-body .pig-eye-l,
  .avatar svg#pig-body .pig-eye-r {
    animation: ${pigBlink} 5s 1s infinite;
  }

  /* Ojos cerrados ocultos por defecto */
  .avatar svg#pig-body .pig-eye-closed-l,
  .avatar svg#pig-body .pig-eye-closed-r {
    display: none;
  }

  /* Cuando se muestra contraseña: patas suben */
  .blind-check:checked ~ .avatar svg#pig-hands {
    transform: translateY(0);
  }

  /* Ojos abiertos se ocultan */
  .blind-check:checked ~ .avatar svg#pig-body .pig-eye-l,
  .blind-check:checked ~ .avatar svg#pig-body .pig-eye-r {
    display: none;
  }

  /* Brillo oculto */
  .blind-check:checked ~ .avatar svg#pig-body .pig-shine-l,
  .blind-check:checked ~ .avatar svg#pig-body .pig-shine-r {
    display: none;
  }

  /* Ojos cerrados aparecen */
  .blind-check:checked ~ .avatar svg#pig-body .pig-eye-closed-l,
  .blind-check:checked ~ .avatar svg#pig-body .pig-eye-closed-r {
    display: block;
  }

  /* Boca sorprendida */
  .blind-check:checked ~ .avatar svg#pig-body .pig-mouth {
    d: path("M46,62 Q50,58 54,62");
  }

  /* Mira cuando escribe */
  .form:focus-within ~ .avatar svg#pig-body {
    animation: ${pigLook} 4s ease infinite;
  }
  .blind-check:checked ~ .form:focus-within ~ .avatar svg#pig-body {
    animation: none;
  }

   /* ── Show/Hide ── */
  .card label.blind_input {
    cursor: pointer;
    z-index: 4;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    padding: 4px 0;
    width: var(--blind-w);
    height: calc(100% - 2 * var(--space-y) - 4px);
    border-radius: 0 7px 7px 0;
    background-color: rgba(255,255,255,0.06);
    color: #a8c4e8;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    transition: all 0.2s;
    user-select: none;
  }
  .card label.blind_input:before {
    content: "";
    position: absolute;
    left: 0; top: 15%;
    height: 70%; width: 1px;
    background: rgba(100,160,255,0.3);
  }
  .card label.blind_input:hover { color: #d0e4ff; background-color: rgba(255,255,255,0.12); }
  .blind-check ~ label.blind_input span.show,
  .blind-check:checked ~ label.blind_input span.hide { display: none; }
  .blind-check ~ label.blind_input span.hide,
  .blind-check:checked ~ label.blind_input span.show { display: block; }

  /* ── Form ── */
  .form {
    order: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    width: 100%;
  }
  .form .title {
    width: 100%;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem;
    padding-bottom: 1rem;
    color: #e8f1ff;
    border-bottom: 1px solid rgba(100,160,255,0.25);
    letter-spacing: 0.5px;
  }
  .form .label_input {
    white-space: nowrap;
    font-size: 0.85rem;
    margin-top: calc(var(--space-y) / 2);
    color: #a8c4e8;
    font-weight: 600;
    display: inline;
    text-align: left;
    margin-right: auto;
    position: relative;
    z-index: 99;
    user-select: none;
  }
  .form .input {
    resize: none;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(100,160,255,0.25);
    border-radius: 8px;
    outline: none;
    padding: var(--input-py) var(--input-px);
    font-size: 15px;
    width: 100%;
    color: #e8f1ff;
    margin: var(--space-y) 0;
    transition: all 0.25s ease;
    box-sizing: border-box;
  }
  .form .input::placeholder { color: rgba(168,196,232,0.4); }
  .form .input:focus {
    border: 1px solid rgba(100,160,255,0.7);
    box-shadow: 0 0 0 3px rgba(26,111,212,0.2);
    background: rgba(255,255,255,0.1);
  }
  .form .frg_pss {
    width: 100%;
    display: inline-flex;
    align-items: center;
  }
  .form .frg_pss a {
    background-color: transparent;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.25s ease;
    color: #5b9bd5;
    font-weight: 500;
    font-size: 13px;
    margin-left: auto;
  }
  .form .frg_pss a:hover { color: #88bbf0; text-decoration: underline; }

  .password-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .password-wrapper .input {
    width: 100%;
    padding-right: calc(var(--blind-w) + var(--input-px) + 4px);
  }

  .btn {
    padding: 10px 35px;
    cursor: pointer;
    background: linear-gradient(135deg, #1a6fd4 0%, #0d4fa0 100%);
    border-radius: 8px;
    border: 1px solid rgba(100,160,255,0.4);
    box-shadow: 0 4px 15px rgba(13,79,160,0.5), 0 1px 0 rgba(255,255,255,0.1) inset;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 0.5px;
    transition: 0.3s;
    margin-top: 10px;
    min-width: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn:hover:not(:disabled) {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #2179e0 0%, #1259b5 100%);
    box-shadow: 0 6px 20px rgba(13,79,160,0.7), 0 1px 0 rgba(255,255,255,0.15) inset;
  }
  .btn:active { transform: translateY(0); }
  .btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: ${spin} 0.7s linear infinite;
  }

  .error-msg {
    color: #ff8080;
    font-size: 0.82rem;
    margin: 4px 0 0;
    width: 100%;
    text-align: left;
  }

  .switch-link {
    margin-top: 14px;
    font-size: 0.83rem;
    color: #a8c4e8;
  }
  .link-btn {
    background: none;
    border: none;
    color: #5b9bd5;
    cursor: pointer;
    font-size: inherit;
    font-weight: 600;
    padding: 0;
    transition: color 0.2s;
  }
  .link-btn:hover { color: #88bbf0; text-decoration: underline; }
`;

export default LoginCard;