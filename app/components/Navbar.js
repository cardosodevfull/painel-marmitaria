"use client"
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../config/AppContext';
import Link from 'next/link'


export default function Navbar() {
    const { aberto, statusLoja, venda, despesa, entregas } = useContext(AppContext);

    return (
        <nav className="navbar">
            <div className="container-fluid">
                <a className="navbar-brand">Painel marmitaria</a>
                <p>
                    R$ {venda.toFixed(2).replace(".", ",")} |
                    R$ {despesa.toFixed(2).replace(".", ",")}
                </p>
                <h5>saldo R$ {(venda - despesa).toFixed(2).replace(".", ",")}</h5>

                <form className="d-flex" role="search">
                    <Link href="/despesa" className='btn btn-secondary'>+ Despesa</Link>
                    <button onClick={() => statusLoja(aberto)} className={aberto ? "btn btn-success" : "btn btn-danger"} type="button">{aberto == true ? "loja aberta" : "loja fechada"}</button>
                </form>
            </div>
        </nav>
    )
}