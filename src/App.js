import React, { useState, useEffect } from 'react';

import api from './services/api';

import './App.css';

import Header from './components/Header';

/**
 * Componentes
 * Propiedades
 * Estados e Imutabilidade
 * ========================
 * useState - retorna um array com 2 posições
 *  1 - variavel com seu respectivo valor
 *  2 - Função para atualizamos o valor do 1 valor
 */

function App() {
    const [ projects, setProjects ] = useState([]);

    /** 
     * Recebe 2 parametros,
     * 1 - Uma funcao
     * 2 - Quando tiparar a funcao
     * */
    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        // projects.push(`Novo Projeto ${Date.now()}`);
        //setProjects(pecorrendo todo array, adicionando novo valor no array)
        // setProjects([...projects, `Novo Projeto ${Date.now()}`]);
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
	        owner: "Manoel Vieira"
        });

        const project = response.data;

        setProjects([...projects, project]);

    }


    return (
        <>
            <Header title="Projects" />

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
        </>
    );        
}

export default App;