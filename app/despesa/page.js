"use client"
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../config/AppContext';
import Link from 'next/link'

export default function LancaDespesa() {
    const { addDespesa } = useContext(AppContext);
    const [add,setAdd] = useState(0);

    const handleChange = (e) => {
        let valor = e.target.value 
       setAdd(parseInt(valor))
    }

    const adicionar = ()=>{
        addDespesa(add)
    }

    return (
        <div className='main'>
            <h3>Despesas</h3>
            <Link href="/" className='btn btn-secondary'>Voltar</Link>
            <hr />
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Adicione despesa</label>
                <input 
                    onChange={(e) => handleChange(e)}
                    type="text" className="form-control"
                    />
                <button type="button" className='btn btn-danger mt-2 w-100' onClick={()=> adicionar()} >Adicionar</button>
                                    
            </div>
        </div>
    )
}