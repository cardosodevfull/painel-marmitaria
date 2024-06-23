"use client"
import React, { useContext, useState } from 'react';
import { AppContext } from './config/AppContext';
import Navbar from './components/Navbar';

export default function Page() {
  const [total, setTotal] = useState(0);
  const { user, entregas, getEntrega, entrega } = useContext(AppContext);

  function addEntrega(Id) {
    getEntrega(Id)
    if (entregas.lenght > 0) {
      setTotal(entrega.sacola.reduce((a, b) => a + b.price, 0).toFixed(2).replace(".", ","))      
    }
    
  }
  
  return (
    <div className="">
      <Navbar />
      <div className="row">
        <div className="col-4 painel-list">
          {entregas.map(e => (
            <a key={e.id} onClick={() => addEntrega(e.id)}><div className='card p-2 mt-2'>
              <p>{e.id}</p>
            </div></a>
          ))}
        </div>
        <div className="col-8 painel-detalhe">
          {entrega.sacola &&
            <div className='mt-2'>
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
                  <p>1 - <span> {s.name}</span></p>
                </div>
              ))}

              <hr />
              <div className='text-end price'>
                <h3>R$ {entrega.sacola.reduce((a, b) => a + b.price, 0).toFixed(2).replace(".", ",")}</h3>
              </div>
            </div>}
        </div>
      </div>     
      
    </div>
  )
}