import React, { useEffect, useState } from 'react';
import { getNoticias, createNoticia, deleteNoticia, updateNoticia } from '../services/api';
import './Noticias.css';

const Noticias = () => {
    const [noticias, setNoticias] = useState([]);
    const [novaNoticia, setNovaNoticia] = useState({ titulo: '', descricao: '' });
    const [noticiaEditando, setNoticiaEditando] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const data = await getNoticias();
                if (Array.isArray(data)) {
                    setNoticias(data);
                } else {
                    console.error('Resposta inválida da API:', data);
                    setNoticias([]);
                }
            } catch (error) {
                console.error('Erro ao carregar notícias:', error);
                setNoticias([]);
            }
        };
        fetchNoticias();
    }, []);

    const handleAddNoticia = async () => {
        if (!novaNoticia.titulo.trim() || !novaNoticia.descricao.trim()) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            let updatedNoticia;
            if (noticiaEditando) {
                updatedNoticia = await updateNoticia(noticiaEditando.id, novaNoticia);
                setNoticias((prevNoticias) =>
                    prevNoticias.map((noticia) =>
                        noticia.id === noticiaEditando.id ? updatedNoticia : noticia
                    )
                );
                setNoticiaEditando(null);
            } else {
                updatedNoticia = await createNoticia(novaNoticia);
                setNoticias((prevNoticias) => [...prevNoticias, updatedNoticia]);
            }
            setNovaNoticia({ titulo: '', descricao: '' });
        } catch (error) {
            console.error('Erro ao adicionar/atualizar notícia:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditNoticia = (noticia) => {
        setNoticiaEditando(noticia);
        setNovaNoticia({ titulo: noticia.titulo, descricao: noticia.descricao });
    };

    const handleDeleteNoticia = async (id) => {
        try {
            await deleteNoticia(id);
            setNoticias((prevNoticias) => prevNoticias.filter((noticia) => noticia.id !== id));
        } catch (error) {
            console.error('Erro ao deletar notícia:', error);
        }
    };

    return (
        <div>
            <h1>Notícias</h1>
            <div>
                <input
                    type="text"
                    placeholder="Título"
                    value={novaNoticia.titulo}
                    onChange={(e) => setNovaNoticia({ ...novaNoticia, titulo: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={novaNoticia.descricao}
                    onChange={(e) => setNovaNoticia({ ...novaNoticia, descricao: e.target.value })}
                />
                <button onClick={handleAddNoticia} disabled={loading}>
                    {loading ? 'Carregando...' : noticiaEditando ? 'Atualizar Notícia' : 'Adicionar Notícia'}
                </button>
                {noticiaEditando && (
                    <button
                        onClick={() => {
                            setNoticiaEditando(null);
                            setNovaNoticia({ titulo: '', descricao: '' });
                        }}
                    >
                        Cancelar
                    </button>
                )}
            </div>
            <ul>
                {noticias.length > 0 ? (
                    noticias
                        .filter((noticia) => noticia !== null && noticia !== undefined)
                        .map((noticia) => (
                            <li key={noticia.id}>
                                <h2>{noticia.titulo}</h2>
                                <p>{noticia.descricao}</p>
                                <div className="buttons">
                                    <button onClick={() => handleEditNoticia(noticia)}>Editar</button>
                                    <button onClick={() => handleDeleteNoticia(noticia.id)}>Deletar</button>
                                </div>
                            </li>
                        ))
                ) : (
                    <p>Nenhuma notícia encontrada.</p>
                )}
            </ul>
        </div>
    );
};

export default Noticias;
