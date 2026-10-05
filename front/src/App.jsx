import { useEffect, useState } from 'react';

// "/api" é repassado pelo nginx para http://api:3000 (DNS interno do Compose)
const API_URL = '/api/suppliers';

// 12345678000195 -> 12.345.678/0001-95
const formatCnpj = (v) =>
  String(v).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');

export default function App() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadSuppliers() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Erro ${res.status} ao buscar fornecedores`);
      setSuppliers(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSuppliers();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Fornecedores</h1>
        <button onClick={loadSuppliers} disabled={loading}>
          {loading ? 'Carregando...' : 'Atualizar'}
        </button>
      </header>

      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Empresa</th>
            <th>CNPJ</th>
            <th>Contato</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length === 0 && !loading && !error && (
            <tr>
              <td colSpan="5" className="empty">
                Nenhum fornecedor cadastrado. Crie um pelo Swagger (/docs na API).
              </td>
            </tr>
          )}
          {suppliers.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.company_name}</td>
              <td>{formatCnpj(s.cnpj)}</td>
              <td>{s.contact_name}</td>
              <td>{s.contact_email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
