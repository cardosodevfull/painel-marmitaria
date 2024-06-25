"use client"
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './config/AppContext';
import Navbar from './components/Navbar';

export default function Page() {
  const [total, setTotal] = useState(0);
  const { user, entregas, getEntrega, entrega, sound, trocarStatus } = useContext(AppContext);

  useEffect(() => {
    sound()
    return;
  }, [entregas])

  function addEntrega(Id) {
    getEntrega(Id)
    if (entregas.lenght > 0) {
      setTotal(entrega.sacola.reduce((a, b) => a + b.price, 0).toFixed(2).replace(".", ","))
    }

  }

  const setarFeito = (param) => {
    trocarStatus(param)
  }

  return (
    <div className="">
      <Navbar />
      <div className="row">
        <div className="col-4 painel-list">
          {entregas.map(e => (
            <a key={e.id} onClick={() => addEntrega(e.id)}>
              {e.status == "solicitado" ?
                <div className='card bg-warning p-2 mt-2'>
                  <p>{e.status}</p>
                </div>
                :
                <div className='card bg-secondary p-2 mt-2 text-white'>
                  <p>{e.status}</p>
                </div>
              }
            </a>
          ))}
        </div>
        <div className="col-8 painel-detalhe">
          {entrega.sacola &&
            <div className='mt-2'>
              <h6>Status do pedido</h6>
              <p> <span>{entrega.status}</span></p>
              <hr />
              <h6>Dados do cliente</h6>
              <hr />
              <p>Nome: <span>{entrega.user.name}</span></p>
              <p>Telefone: <span>{entrega.user.phone}</span></p>
              <p>Endereço: <span>{entrega.user.location}</span></p>
              <p>número: <span>{entrega.user.number}</span></p>
              <hr />
              <h6>Dados do pedido</h6>
              <hr />
              {entrega.sacola.map((s, i) => (
                <div key={i}>
                  <p>1 - <span> {s.name} </span> <span>{s.espeto && "(" + s.espeto + ")"} </span></p>
                </div>
              ))}

              <hr />
              <div className='text-end price'>
                <h3>R$ {entrega.sacola.reduce((a, b) => a + b.price, 0).toFixed(2).replace(".", ",")}</h3>
              </div>
              <div className='d-flex'>
                {entrega.status == "solicitado" &&
                  <button onClick={() => setarFeito("finalizado")} className='btn btn-secondary'>Finalizar pedido</button>
                }
              </div>
            </div>}
        </div>
      </div>
      <audio id='ad' src='./ad.mp3'></audio>
    </div>
  )
}