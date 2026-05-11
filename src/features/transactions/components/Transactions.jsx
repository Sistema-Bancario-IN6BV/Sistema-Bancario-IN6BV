import { useState, useEffect } from 'react';
import { getTransactions } from '../../../shared/api/admin';
import { showSuccess, showError } from '../../../shared/utils/toast';

export const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            setLoading(true);
            const res = await getTransactions({ limit: 50 });
            const transactionsData = res.data?.transactions ?? res.data?.transaction ?? res.data ?? [];
            setTransactions(Array.isArray(transactionsData) ? transactionsData : []);
            showSuccess('Transacciones cargadas');
        } catch (error) {
            showError('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const getTransactionType = (type) => {
        const types = {
            'transfer': '📤 Transferencia',
            'deposit': '📥 Depósito',
            'withdrawal': '💸 Retiro',
            'payment': '💳 Pago'
        };
        return types[type] || type;
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Transacciones</h2>
            
            {loading ? (
                <div className="text-center py-8">Cargando...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 text-left">Fecha</th>
                                <th className="p-3 text-left">Tipo</th>
                                <th className="p-3 text-left">Monto</th>
                                <th className="p-3 text-left">Referencia</th>
                                <th className="p-3 text-left">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center text-gray-500">
                                        No hay transacciones
                                    </td>
                                </tr>
                            ) : (
                                transactions.map(tx => (
                                    <tr key={tx.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 text-sm">
                                            {new Date(tx.date).toLocaleDateString()}
                                        </td>
                                        <td className="p-3">{getTransactionType(tx.type)}</td>
                                        <td className="p-3 font-semibold">
                                            ${tx.amount.toFixed(2)}
                                        </td>
                                        <td className="p-3 text-sm">{tx.reference}</td>
                                        <td className="p-3">
                                            <span className={`px-3 py-1 rounded-full text-sm ${
                                                tx.status === 'completed' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {tx.status}
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

export default Transactions;
