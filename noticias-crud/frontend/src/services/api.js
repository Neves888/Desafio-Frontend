import axios from 'axios';

const api = axios.create({
    baseURL: 'http://back-end:5000',
});

const getNoticias = async () => {
    const response = await api.get('/noticias');
    return response.data;
};

const createNoticia = async (noticia) => {
    const response = await api.post('/noticias', noticia);
    return response.data;
};

const updateNoticia = async (id, noticia) => {
    const response = await api.put(`/noticias/${id}`, noticia);
    return response.data;
};

const deleteNoticia = async (id) => {
    const response = await api.delete(`/noticias/${id}`);
    return response.data;
};

export { getNoticias, createNoticia, updateNoticia, deleteNoticia };
