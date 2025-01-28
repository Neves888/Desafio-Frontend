import React, { useEffect, useState } from 'react';
import { getNoticias, createNoticia, deleteNoticia } from '../services/api';
import './Noticias.css';

const Noticias = () => {
    const [noticias, setNoticias] = useState([]);
    const [novaNoticia, setNovaNoticia] = useState({ titulo: '', descricao: '' });

    useEffect(() => {
        const fetchNoticias = async () => {
            const data = await getNoticias();
            setNoticias(data);
        };
        fetchNoticias();
    }, []);


    const handleAddNoticia = async () => {
        await createNoticia(novaNoticia);
        setNovaNoticia({ titulo: '', descricao: '' }); 
        const data = await getNoticias(); 
        setNoticias(data);
    };


    const handleDeleteNoticia = async (id) => {
        await deleteNoticia(id);
        setNoticias((prevNoticias) => prevNoticias.filter((noticia) => noticia.id !== id));
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
                <button onClick={handleAddNoticia}>Adicionar Notícia</button>
            </div>
            <ul>
                {noticias.map((noticia) => (
                    <li key={noticia.id}>
                        <h2>{noticia.titulo}</h2>
                        <p>{noticia.descricao}</p>
                        <button onClick={() => handleDeleteNoticia(noticia.id)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Noticias;
