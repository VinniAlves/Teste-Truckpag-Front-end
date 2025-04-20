import { useEffect, useState } from 'react';
import { ListagemFilmes } from '../interfaces/listagemFilmes';

export function useFilmes() {
    const [dados, setDados] = useState<ListagemFilmes[]>([]);
    const [dadosFiltrados, setDadosFiltrados] = useState<ListagemFilmes[]>([]);
    const [inputFiltros, setInputFiltros] = useState('');
    const [filtroCheck, setFiltroCheck] = useState({
      assistido: false,
      favorito: false,
      check_anotacao: false,
    })

    const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ghibliapi.vercel.app/films')
      .then(res => res.json())
      .then(data => {
        const dadosModificados = data.map((dadosFilmes: any) => ({
          ...dadosFilmes,
          assistido: false,
          favorito: false,
          check_anotacao: false,
          anotacao_descricao: '',
        }))

        const dadoCorrigidos = dadosModificados.map((filmes: any) => {
          const horas = Math.floor(+filmes.running_time / 60);
          const minutos = +filmes.running_time % 60;
          const dadosAjustados = `${horas}h ${minutos}m`
          filmes.running_time = dadosAjustados
          return {...filmes}
        });

        setDados(dadoCorrigidos);
        setDadosFiltrados(dadoCorrigidos);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [inputFiltros, filtroCheck]);

  function aplicarFiltros() {
    let resultados = dados

    if (inputFiltros.trim() !=='') {
      resultados = resultados.filter(filtros =>
        filtros.title.toLowerCase().includes(inputFiltros.toLowerCase())
      )
    }

    if (filtroCheck.assistido) {
      resultados = resultados.filter(filtros => filtros.assistido);
    }

    if (filtroCheck.favorito) {
      resultados = resultados.filter(filtros => filtros.favorito);
    }

    if (filtroCheck.check_anotacao) {
      resultados = resultados.filter(filtros => filtros.check_anotacao);
    }

    setDadosFiltrados(resultados)
  }

  return {
    dados,
    setDados,
    dadosFiltrados,
    setDadosFiltrados,
    inputFiltros,
    setInputFiltros,
    filtroCheck,
    setFiltroCheck,
    loading,
  };
}