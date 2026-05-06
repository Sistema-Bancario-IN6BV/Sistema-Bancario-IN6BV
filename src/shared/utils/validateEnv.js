/**
 * Validador de Configuración - Sistema Bancario
 * Verifica que todas las variables de entorno estén configuradas correctamente
 */

export const validateEnvironment = () => {
    const required = {
        VITE_AUTH_URL: 'URL del servicio de autenticación',
        VITE_ADMIN_URL: 'URL del API Admin'
    };

    const missing = [];

    console.log('🔍 Validando variables de entorno...\n');

    Object.entries(required).forEach(([key, description]) => {
        const value = import.meta.env[key];
        if (!value) {
            missing.push(`${key}: ${description}`);
            console.log(`❌ ${key} - NO CONFIGURADO`);
        } else {
            console.log(`✅ ${key} = ${value}`);
        }
    });

    if (missing.length > 0) {
        console.log('\n⚠️  Variables faltantes:\n');
        missing.forEach(m => console.log(`   • ${m}`));
        console.log('\n📝 Crear archivo .env.local con:\n');
        console.log('   VITE_AUTH_URL=http://localhost:3001');
        console.log('   VITE_ADMIN_URL=http://localhost:3002\n');
        return false;
    }

    console.log('\n✅ Todas las variables están configuradas correctamente\n');
    return true;
};

// Ejemplo de .env.local
export const envTemplate = `
# Sistema Bancario - Configuración Frontend
VITE_AUTH_URL=http://localhost:3001
VITE_ADMIN_URL=http://localhost:3002

# Variables opcionales
VITE_API_TIMEOUT=8000
VITE_DEBUG=true
`;

export default {
    validateEnvironment,
    envTemplate
};
