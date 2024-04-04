import { Roboto } from "next/font/google";
import { useState, useEffect } from 'react';
import { CaretUp, CaretDown } from "@phosphor-icons/react";
import Link from 'next/link';

import { camisetasJSON } from './camisetas';

interface Cor {
  nome: string;
  slug: string;
};

export interface Produto {
  nome: string
  cores: Cor[];
  tamanhos: string[];
  valor: number;
  imagemUrl?: string
  id: number;
};

const fontRoboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin']
});

export default function Home() {
  const [produtosList, setProdutosList] = useState(camisetasJSON);

  const [filterNome, setFilterNome] = useState<string>('');  
  const [filterCores, setFilterCores] = useState<string[]>([]);
  const [filterTamanhos, setFilterTamanhos] = useState<string[]>([]);

  const [sortOrdemValor, setSortOrdemValor] = useState<'Menor Preço' | 'Maior Preço'>('Maior Preço');
  const [filteredProdutosList, setFilteredProdutosList] = useState<Produto[]>([]);

  const [openDropdown, setOpenDropdown] = useState('');

  useEffect(() => {
    let list = [...produtosList];

    if (filterCores.length > 0) {
      list = list.filter(produto => produto.cores.some(cor => filterCores.includes(cor.nome)));
    }

    if (filterTamanhos.length > 0) {
      list = list.filter(produto => produto.tamanhos.some(tamanho => filterTamanhos.includes(tamanho)));
    }

    if (filterNome) {
      list = list.filter(produto => produto.nome.toLowerCase().includes(filterNome.toLowerCase()));
    }

    if (sortOrdemValor === 'Maior Preço') {
      list.sort((a, b) => a.valor - b.valor);
    } else if (sortOrdemValor === 'Menor Preço') {
      list.sort((a, b) => b.valor - a.valor);
    }

    setFilteredProdutosList(list);
  }, [produtosList, filterCores, filterTamanhos, sortOrdemValor, filterNome]);

  const handleSelectCor = (cor: string) => {
    setFilterCores(prevCor => {
      if (prevCor.includes(cor)) {
        return prevCor.filter(c => c !== cor);
      } else {
        return [...prevCor, cor];
      }
    });
  };

  const handleSelectTamanho = (tamanho: string) => {
    setFilterTamanhos(prevTamanho => {
      if (prevTamanho.includes(tamanho)) {
        return prevTamanho.filter(s => s !== tamanho);
      } else {
        return [...prevTamanho, tamanho];
      }
    });
  };

  const handleSortOrdemValor = (order: 'Menor Preço' | 'Maior Preço') => {
    setSortOrdemValor(order);
  };

  return (
    <main className={`flex flex-col p-10 ${fontRoboto.className}`}>

      <div className="flex mx-auto w-full items-center flex max-w-7xl justify-between py-4 border-b border-zinc-800 mb-10">
        <div>Filtrar por:</div>

        <div className="flex items-baseline space-x-2 sm:space-x-4 z-10">
          <div className="relative select-none flex flex-col items-center">
            <button onClick={() => setOpenDropdown(openDropdown === 'cor' ? '' : 'cor')} className="p-2 w-full flex items-center justify-between text-sm tracking-wide space-x-2">
              <span>Cores</span>
              {openDropdown === 'cor' ? <CaretUp size={12} /> : <CaretDown size={12} />}
            </button>
            {openDropdown === 'cor' && (
              <div className="absolute top-10 rounded-md flex flex-col border border-zinc-800 bg-zinc-900 items-start p-4 w-auto min-w-full space-y-2 shadow-md" role="menu">
                {Array.from(new Set(produtosList.flatMap(produto => produto.cores.map(cor => cor.nome)))).map(cor => (
                  <div className="flex items-center space-x-2 whitespace-nowrap" key={cor}>
                    <input type="checkbox" id={cor} className="form-checkbox h-4 w-4" checked={filterCores.includes(cor)} onChange={() => handleSelectCor(cor)} />
                    <label htmlFor={cor} className="text-sm tracking-wide text-gray-300">{cor}</label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative select-none flex flex-col items-center">
            <button onClick={() => setOpenDropdown(openDropdown === 'tamanho' ? '' : 'tamanho')} className="p-2 w-full flex items-center justify-between text-sm tracking-wide space-x-2">
              <span>Tamanhos</span>
              {openDropdown === 'tamanho' ? <CaretUp size={12} /> : <CaretDown size={12} />}
            </button>
            {openDropdown === 'tamanho' && (
              <div className="absolute top-10 rounded-md flex flex-col border border-zinc-800 bg-zinc-900 items-start p-4 w-auto min-w-full space-y-2 shadow-md" role="menu">
                {Array.from(new Set(produtosList.flatMap(produto => produto.tamanhos))).map(tamanho => (
                  <div className="flex items-center space-x-2 whitespace-nowrap" key={tamanho}>
                    <input type="checkbox" id={tamanho} className="form-checkbox h-4 w-4" checked={filterTamanhos.includes(tamanho)} onChange={() => handleSelectTamanho(tamanho)} />
                    <label htmlFor={tamanho} className="text-sm tracking-wide text-gray-300">{tamanho}</label>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative select-none flex flex-col items-center">
            <button onClick={() => setOpenDropdown(openDropdown === 'sort' ? '' : 'sort')} className="p-2 w-full flex items-center justify-between text-sm tracking-wide space-x-2">
              <span>Ordernar Preço</span>
              {openDropdown === 'sort' ? <CaretUp size={12} /> : <CaretDown size={12} />}
            </button>
            {openDropdown === 'sort' && (
              <div className="absolute top-10 rounded-md flex flex-col border border-zinc-800 bg-zinc-900 items-start p-4 w-auto min-w-full space-y-2 shadow-md" role="menu">
                <button onClick={() => handleSortOrdemValor('Menor Preço')} className="sm:p-2  w-full flex items-center justify-between text-sm tracking-wide space-x-2 hover:text-gray-300 active:text-gray-400">
                  <span>Maior Preço</span>
                </button>
                <button onClick={() => handleSortOrdemValor('Maior Preço')} className="sm:p-2 w-full flex items-center justify-between text-sm tracking-wide space-x-2 hover:text-gray-300 active:text-gray-400">
                  <span>Menor Preço</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>


      <div className="mx-auto w-full flex max-w-7xl rounded-md border border-zinc-800 bg-zinc-900">
        <div className="px-10 w-full py-12 sm:py-18">
          <h2 className="text-2xl font-bold text-gray-300">Camisetas</h2>
          <input type="text" className="py-3 px-4 my-5 mx-0 block w-full border border-zinc-800 focus:border-emerald-400 focus:outline-none bg-zinc-900 rounded-lg text-md disabled:opacity-50 disabled:pointer-events-none" placeholder="Pesquisar" value={filterNome} onChange={(e) => setFilterNome(e.target.value)} />
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">

          {filteredProdutosList.length > 0 ? (
            filteredProdutosList.map((produto) => (
              <Link href= {`/produto/${produto.id}`} key={produto.id}>
                <div key={produto.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-65 lg:h-80 transition duration-150 ease-out hover:ease-in">
                    <img src={produto.imagemUrl} className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="grid justify-center justify-items-center mt-4">
                    <div className="text-sm text-gray-400">Tamanhos disponiveis: {produto.tamanhos.join(', ')}</div>
                    <h3 className="text-base mb-2 mt-1 tracking-tight text-gray-300">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {produto.nome}
                    </h3>
                    <p className="text-base font-bold text-emerald-400">R$ {produto.valor}</p>
                    <ul className="flex mt-4 items-center space-x-3">
                      {produto.cores.map((cor) => (
                        <li className={`${cor.slug} h-6 w-6 rounded-full border-2 border-gray-600`}><span className="invisible">{cor.nome}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400 p-15">Nenhum produto encontrado.</p>
          )}
          </div>
        </div>
      </div>
    </main>
  );
}

