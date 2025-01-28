import { render, fireEvent, screen } from '@testing-library/react';
import BuscaCep from './BuscaCep';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BuscaCep', () => {
    it('deve renderizar o componente corretamente', () => {
        render(<BuscaCep />);
        expect(screen.getByText('Buscar Endereço por CEP')).toBeInTheDocument();
    });

    it('deve exibir mensagem de erro quando o CEP for inválido', () => {
        render(<BuscaCep />);
        const input = screen.getByPlaceholderText('Digite o CEP');
        fireEvent.change(input, { target: { value: '123' } });
        expect(screen.getByText('O CEP deve conter 8 números')).toBeInTheDocument();
    });

    it('deve buscar o endereço quando o CEP for válido', async () => {
        const enderecoMock = {
            cep: '01001-000',
            logradouro: 'Praça da Sé',
            bairro: 'Sé',
            localidade: 'São Paulo',
            uf: 'SP'
        };

        mockedAxios.get.mockResolvedValueOnce({ data: enderecoMock });

        render(<BuscaCep />);
        const input = screen.getByPlaceholderText('Digite o CEP');
        fireEvent.change(input, { target: { value: '01001000' } });
        fireEvent.click(screen.getByText('Buscar'));

        await screen.findByText('Endereço Encontrado:');
        expect(screen.getByText('Praça da Sé')).toBeInTheDocument();
        expect(screen.getByText('Sé')).toBeInTheDocument();
        expect(screen.getByText('São Paulo')).toBeInTheDocument();
        expect(screen.getByText('SP')).toBeInTheDocument();
    });

    it('deve exibir mensagem de erro quando o CEP não for encontrado', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: { erro: true } });

        render(<BuscaCep />);
        const input = screen.getByPlaceholderText('Digite o CEP');
        fireEvent.change(input, { target: { value: '00000000' } });
        fireEvent.click(screen.getByText('Buscar'));

        await screen.findByText('CEP não encontrado');
    });

    it('deve exibir mensagem de erro quando ocorrer um erro na requisição', async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error('Erro na requisição'));

        render(<BuscaCep />);
        const input = screen.getByPlaceholderText('Digite o CEP');
        fireEvent.change(input, { target: { value: '01001000' } });
        fireEvent.click(screen.getByText('Buscar'));

        await screen.findByText('Falha ao buscar o CEP. Verifique se o número digitado está correto.');
    });
});
