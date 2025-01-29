import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://back-end:5000",
});

const getNoticias = async () => {
    try {
        const response = await api.get('/noticias');
        return response.data;
    } catch (error) {
        console.error('Erro ao carregar as notícias:', error);
        return [];
    }
};

const createNoticia = async (noticia) => {
    try {
        const response = await api.post('/noticias', noticia);
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar notícia:', error);
        return null;
    }
};

const updateNoticia = async (id, noticia) => {
    try {
        const response = await api.put(`/noticias/${id}`, noticia);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar a notícia com ID ${id}:`, error);
        return null;
    }
};

const deleteNoticia = async (id) => {
    try {
        await api.delete(`/noticias/${id}`);
        return true;
    } catch (error) {
        console.error(`Erro ao deletar a notícia com ID ${id}:`, error);
        return false;
    }
};

export { getNoticias, createNoticia, updateNoticia, deleteNoticia };
