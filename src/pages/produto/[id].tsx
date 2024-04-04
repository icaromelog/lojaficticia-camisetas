import { Roboto } from "next/font/google";
import { useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next'
import { camisetasJSON } from '../camisetas';
import { RadioGroup } from '@headlessui/react'

import { Produto } from '../index';

const fontRoboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin']
});

interface ProdutoPageProps {
  produto: Produto;
}
const produtosList: Produto[] = camisetasJSON;

//
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = produtosList.map((produto) => ({
    params: { id: produto.id.toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const produto = produtosList.find((produto) => produto.id === Number(params?.id))
  return { props: { produto } }
}

//
export default function produtoPage({ produto }: ProdutoPageProps) {
  const [selectedCor, setSelectedCor] = useState(produto.cores[0])
  const [selectedTamanho, setSelectedTamanho] = useState(produto.tamanhos[0])

  function classNames(...classes: (string | false)[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className={`flex flex-col p-10 ${fontRoboto.className}`}>
      <div className="mx-auto mt-6 max-w-7xl px-10 lg:grid lg:grid-cols-2 lg:gap-x-8 py-12 rounded-md border border-zinc-800 bg-zinc-900">
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 overflow-hidden rounded-md sm:rounded-md">
          <img
            src={produto.imagemUrl}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="mt-10 lg:mt-0 lg:border-l lg:border-zinc-800 lg:pl-8">
          <h1 className="text-2xl font-medium tracking-tight text-gray-300 sm:text-2xl">{produto.nome}</h1>
          <div className="mt-5 mb-5">
            <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in. A erat nam at lectus urna duis convallis convallis tellus. Vestibulum mattis ullamcorper velit sed ullamcorper morbi. Id aliquet risus feugiat in ante metus dictum at tempor. Viverra orci sagittis eu volutpat odio facilisis.</p>
          </div>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-2xl tracking-tight text-emerald-400">R$ {produto.valor}</p>
            <div className="mt-5">
              <h3 className="text-base font-medium text-gray-300">Cores disponíveis</h3>
              <RadioGroup value={selectedCor} onChange={setSelectedCor} className="mt-4">
                <RadioGroup.Label className="sr-only">Escolha uma cor</RadioGroup.Label>
                <div className="select-none flex items-center space-x-3">
                  {produto.cores.map((cor) => (
                    <RadioGroup.Option
                      key={cor.nome}
                      value={cor}
                      className={({ active, checked }) =>
                        classNames(
                          active && checked ? 'ring-2 ring-emerald-400' : '',
                          !active && checked ? 'ring-2 ring-emerald-400' : '',
                          'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                        )
                      }
                    >
                      <RadioGroup.Label as="span" className="sr-only">
                        {cor.nome}
                      </RadioGroup.Label>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          cor.slug,
                          'h-6 w-6 rounded-full'
                        )}
                      />
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-gray-300">Tamanhos</h3>
              </div>

              <RadioGroup value={selectedTamanho} onChange={setSelectedTamanho} className="mt-4">
                <RadioGroup.Label className="sr-only">Escolha um tamanho</RadioGroup.Label>
                <div className="select-none grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-6">
                  {produto.tamanhos.map((tamanho) => (
                    <RadioGroup.Option
                      key={tamanho}
                      value={tamanho}
                      disabled={!tamanho}
                      className={({ active }) =>
                        classNames(
                          tamanho
                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                          active ? 'ring-1 ring-emerald-400' : '',
                          'group relative flex items-center justify-center rounded-md border py-2 px-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-3'
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <RadioGroup.Label as="span" className="text-lg font-bold">{tamanho}</RadioGroup.Label>
                          {tamanho ? (
                            <span
                              className={classNames(
                                active ? 'border' : 'border-2',
                                checked ? 'border-emerald-400' : 'border-transparent',
                                'pointer-events-none absolute -inset-px rounded-md'
                              )}
                              aria-hidden="true"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                stroke="currentColor"
                              >
                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                              </svg>
                            </span>
                          )}
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

