import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuthStore } from '@/shared/store/authStore';

/* ─── íconos SVG inline ─── */
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.1 1.11h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91A16 16 0 0 0 15 15.91l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconId = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="5" rx="2"/><path d="M16 3v4M8 3v4M2 13h20"/>
  </svg>
);
const IconHome = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconBriefcase = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);
const IconDollar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const INITIAL = {
  name: '', surname: '', username: '', email: '',
  password: '', phone: '', dpi: '',
  address: '', jobName: '', monthlyIncome: '',
};

const RegisterCard = ({ onGoLogin }) => {
  const [form, setForm] = useState(INITIAL);
  const [showPwd, setShowPwd] = useState(false);
  const { register, loading, error, successMessage, clearError, clearSuccess } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    clearError();
    clearSuccess();
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      monthlyIncome: parseFloat(form.monthlyIncome) || 0,
    };
    const res = await register(payload);
    if (res.success) {
      setForm(INITIAL);
    }
  };

  return (
    <StyledWrapper>
      <div className="card">
        {/* Cabecera */}
        <div className="card-header">
          <div className="bank-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="12" fill="rgba(26,111,212,0.25)"/>
              <path d="M20 6L34 13V15H6V13L20 6Z" fill="#88bbf0"/>
              <rect x="9" y="18" width="4" height="12" rx="1" fill="#88bbf0"/>
              <rect x="16" y="18" width="4" height="12" rx="1" fill="#88bbf0"/>
              <rect x="23" y="18" width="4" height="12" rx="1" fill="#88bbf0"/>
              <rect x="6" y="31" width="28" height="3" rx="1" fill="#5b9bd5"/>
            </svg>
          </div>
          <div>
            <h2 className="title">Crear Cuenta</h2>
            <p className="subtitle">Registro de cliente</p>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {/* Fila 1: Nombre + Apellido */}
          <div className="row">
            <Field icon={<IconUser />} label="Nombre" name="name" value={form.name}
              onChange={handleChange} placeholder="Juan" required maxLength={25} />
            <Field icon={<IconUser />} label="Apellido" name="surname" value={form.surname}
              onChange={handleChange} placeholder="Pérez" required maxLength={25} />
          </div>

          {/* Fila 2: Username + Email */}
          <div className="row">
            <Field icon={<IconUser />} label="Usuario" name="username" value={form.username}
              onChange={handleChange} placeholder="jperez" required />
            <Field icon={<IconMail />} label="Correo" name="email" type="email" value={form.email}
              onChange={handleChange} placeholder="juan@banco.com" required />
          </div>

          {/* Contraseña */}
          <div className="field-group full">
            <label className="label_input"><IconLock /> Contraseña</label>
            <div className="pwd-wrap">
              <input
                className="input"
                type={showPwd ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres"
                required
                minLength={8}
              />
              <button type="button" className="toggle-pwd" onClick={() => setShowPwd(p => !p)}>
                {showPwd ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          {/* Fila 3: Teléfono + DPI */}
          <div className="row">
            <Field icon={<IconPhone />} label="Teléfono (8 dígitos)" name="phone" value={form.phone}
              onChange={handleChange} placeholder="55551234" required maxLength={8} minLength={8}
              pattern="\d{8}" />
            <Field icon={<IconId />} label="DPI (13 dígitos)" name="dpi" value={form.dpi}
              onChange={handleChange} placeholder="1234567890101" required
              pattern="\d{13}" maxLength={13} minLength={13} />
          </div>

          {/* Dirección */}
          <div className="field-group full">
            <label className="label_input"><IconHome /> Dirección</label>
            <input className="input" type="text" name="address" value={form.address}
              onChange={handleChange} placeholder="Zona 10, Guatemala" required maxLength={255} />
          </div>

          {/* Fila 4: Trabajo + Ingresos */}
          <div className="row">
            <Field icon={<IconBriefcase />} label="Trabajo / Puesto" name="jobName" value={form.jobName}
              onChange={handleChange} placeholder="Desarrollador" maxLength={100} />
            <Field icon={<IconDollar />} label="Ingreso mensual (Q)" name="monthlyIncome" type="number"
              value={form.monthlyIncome} onChange={handleChange} placeholder="5000" required min="0" step="0.01" />
          </div>

          {error && <p className="msg error">{error}</p>}
          {successMessage && <p className="msg success">{successMessage}</p>}

          <button className="btn" type="submit" disabled={loading}>
            {loading ? <><span className="spinner" /> Registrando...</> : 'Crear mi cuenta'}
          </button>

          <p className="switch-link">
            ¿Ya tienes cuenta?{' '}
            <button type="button" onClick={onGoLogin} className="link-btn">
              Inicia sesión
            </button>
          </p>
        </form>
      </div>
    </StyledWrapper>
  );
};

/* Sub-componente para campos individuales */
const Field = ({ icon, label, name, type = 'text', value, onChange, placeholder, ...rest }) => (
  <div className="field-group">
    <label className="label_input">{icon} {label}</label>
    <input className="input" type={type} name={name} value={value}
      onChange={onChange} placeholder={placeholder} {...rest} />
  </div>
);

/* ── Animaciones ── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const StyledWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a1628 0%, #0d2144 50%, #0a1e3d 100%);
  padding: 24px 16px;
  box-sizing: border-box;

  .card {
    width: 640px;
    max-width: 100%;
    border-radius: 22px;
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(100,160,255,0.18);
    box-shadow: 0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset;
    padding: 36px 40px;
    animation: ${fadeUp} 0.5s ease-out both;
    font-family: "Trebuchet MS","Lucida Sans Unicode",Arial,sans-serif;
    box-sizing: border-box;
  }

  /* ── Header ── */
  .card-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 28px;
    padding-bottom: 22px;
    border-bottom: 1px solid rgba(100,160,255,0.2);
  }
  .bank-icon { width: 48px; height: 48px; flex-shrink: 0; }
  .bank-icon svg { width: 100%; height: 100%; }
  .title {
    margin: 0 0 2px;
    font-size: 1.55rem;
    font-weight: 700;
    color: #e8f1ff;
    letter-spacing: 0.4px;
  }
  .subtitle {
    margin: 0;
    font-size: 0.8rem;
    color: rgba(168,196,232,0.65);
    letter-spacing: 0.3px;
  }

  /* ── Form ── */
  .form {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  @media (max-width: 500px) {
    .row { grid-template-columns: 1fr; }
    .card { padding: 24px 20px; }
  }

  .field-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
  }
  .field-group.full { width: 100%; }

  .label_input {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #a8c4e8;
    margin-bottom: 5px;
    user-select: none;
    svg { opacity: 0.75; }
  }

  .input {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(100,160,255,0.22);
    border-radius: 8px;
    outline: none;
    padding: 9px 12px;
    font-size: 14px;
    color: #e8f1ff;
    transition: all 0.22s ease;
    box-sizing: border-box;
    width: 100%;
  }
  .input::placeholder { color: rgba(168,196,232,0.38); }
  .input:focus {
    border-color: rgba(100,160,255,0.65);
    box-shadow: 0 0 0 3px rgba(26,111,212,0.18);
    background: rgba(255,255,255,0.1);
  }

  /* contraseña */
  .pwd-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .pwd-wrap .input { padding-right: 80px; }
  .toggle-pwd {
    position: absolute;
    right: 0;
    height: 100%;
    border: none;
    background: rgba(255,255,255,0.06);
    color: #a8c4e8;
    font-size: 12px;
    padding: 0 14px;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    border-left: 1px solid rgba(100,160,255,0.22);
    transition: all 0.2s;
  }
  .toggle-pwd:hover { background: rgba(255,255,255,0.12); color: #d0e4ff; }

  /* mensajes */
  .msg {
    font-size: 0.83rem;
    margin: 4px 0 10px;
    padding: 10px 14px;
    border-radius: 8px;
    line-height: 1.4;
  }
  .msg.error { background: rgba(255,80,80,0.1); border: 1px solid rgba(255,80,80,0.3); color: #ff9090; }
  .msg.success { background: rgba(80,200,120,0.1); border: 1px solid rgba(80,200,120,0.3); color: #80e0a0; }

  .btn {
    margin-top: 8px;
    padding: 12px 30px;
    cursor: pointer;
    background: linear-gradient(135deg, #1a6fd4 0%, #0d4fa0 100%);
    border-radius: 10px;
    border: 1px solid rgba(100,160,255,0.4);
    box-shadow: 0 4px 18px rgba(13,79,160,0.5);
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 0.5px;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
  }
  .btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(13,79,160,0.7);
    background: linear-gradient(135deg, #2179e0 0%, #1259b5 100%);
  }
  .btn:active { transform: translateY(0); }
  .btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: ${spin} 0.7s linear infinite;
  }

  .switch-link {
    margin-top: 18px;
    text-align: center;
    font-size: 0.83rem;
    color: #a8c4e8;
  }
  .link-btn {
    background: none; border: none;
    color: #5b9bd5; cursor: pointer;
    font-size: inherit; font-weight: 700; padding: 0;
    transition: color 0.2s;
  }
  .link-btn:hover { color: #88bbf0; text-decoration: underline; }
`;

export default RegisterCard;