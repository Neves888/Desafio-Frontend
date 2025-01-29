import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import './BuscaCep.css';

interface Endereco {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

const BuscaCep: React.FC = () => {
  const [cep, setCep] = useState<string>('');
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [validacao, setValidacao] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const formataCep = (valor: string) => {
    const numeroCep = valor.replace(/\D/g, '').slice(0, 8);
    if (numeroCep.length <= 5) return numeroCep;
    return `${numeroCep.slice(0, 5)}-${numeroCep.slice(5)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepFormatado = formataCep(e.target.value);
    setCep(cepFormatado);

    if (cepFormatado.replace(/\D/g, '').length !== 8) {
      setValidacao('O CEP deve conter 8 números');
    } else {
      setValidacao(null);
    }
  };

  const pesquisaCep = async () => {
    try {
      setLoading(true);
      setErro(null);

      if (validacao || cep.replace(/\D/g, '').length !== 8) {
        setErro('Por favor, digite um CEP válido');
        return;
      }

      const response = await axios.get(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
      if (response.data.erro) {
        setErro('CEP não encontrado');
        setEndereco(null);
      } else {
        setEndereco(response.data);
      }
    } catch (error) {
      setErro('Falha ao buscar o CEP. Verifique se o número digitado está correto.');
      setEndereco(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pesquisa-cep">
      <h1 className="cep-titulo">Buscar Endereço por CEP</h1>
      <div className="busca">
        <input
          type="text"
          value={cep}
          onChange={handleChange}
          placeholder="Digite o CEP"
        />
        <button onClick={pesquisaCep} disabled={loading}>
          {loading ? <ClipLoader size={20} color="#fff" /> : 'Buscar'}
        </button>
      </div>
      {validacao && <p className="erro">{validacao}</p>}
      {erro && <p className="erro">{erro}</p>}
      {endereco && (
        <div className="endereco">
          <h2>Endereço Encontrado:</h2>
          <p><strong>CEP:</strong> {endereco.cep}</p>
          <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
          <p><strong>Bairro:</strong> {endereco.bairro}</p>
          <p><strong>Cidade:</strong> {endereco.localidade}</p>
          <p><strong>Estado:</strong> {endereco.uf}</p>
        </div>
      )}
    </div>
  );
};

export default BuscaCep;
