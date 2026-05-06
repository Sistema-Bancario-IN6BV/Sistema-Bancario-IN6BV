import { useState, useEffect } from 'react';
import { getAccounts } from '../../../shared/api/admin';
import { showSuccess, showError } from '../../../shared/utils/toast';

export const Accounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = async () => {
        try {
            setLoading(true);
            const res = await getAccounts();
            const accountsData = res.data?.accounts ?? res.data?.account ?? res.data ?? [];
            setAccounts(Array.isArray(accountsData) ? accountsData : []);
            showSuccess('Cuentas cargadas');
        } catch (error) {
            showError('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Cuentas Bancarias</h2>
            
            {loading ? (
                <div className="text-center py-8">Cargando...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left">Cuenta</th>
                                <th className="p-3 text-left">Tipo</th>
                                <th className="p-3 text-left">Saldo</th>
                                <th className="p-3 text-left">Moneda</th>
                                <th className="p-3 text-left">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center text-gray-500">
                                        No hay cuentas registradas
                                    </td>
                                </tr>
                            ) : (
                                accounts.map(account => (
                                    <tr key={account.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{account.accountNumber}</td>
                                        <td className="p-3">{account.accountType}</td>
                                        <td className="p-3 font-semibold">${account.balance.toFixed(2)}</td>
                                        <td className="p-3">{account.currency}</td>
                                        <td className="p-3">
                                            <span className={`px-3 py-1 rounded-full text-sm ${
                                                account.status === 'active' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {account.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Accounts;
