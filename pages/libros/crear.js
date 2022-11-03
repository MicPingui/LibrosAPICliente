import Link from 'next/link'
import { useState } from 'react';
import {useRouter} from 'next/router';

const BookCreate = () =>{
    const router = useRouter();
    const [bookTitle, setbookTitle] = useState('')
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e){
        setSubmitting(true)
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,{
            method: 'POST',
            headers:{
                accept:'application/json',
                'content-type':'application/json'
            },
            body: JSON.stringify({
                title:bookTitle
            })
        })
        if(res.ok){
            //success
            setErrors([]);
            setbookTitle('');
            return router.push('/libros');
        }else{
            //error
            const data = await res.json();
            setSubmitting(false)
            setErrors(data.errors)
        }
    }
    return (
        <>
            <h1>Crear</h1>
            <form onSubmit={handleSubmit}>
                <label>Titulo:</label><br/>
                <input data-cy="input-book-title-create" onChange={(e)=> setbookTitle(e.target.value)} type="text" value={bookTitle} disabled={submitting}></input>
                <button data-cy="btn-book-create" disabled={submitting}>{submitting ? 'Enviando...':'Enviar'}</button>
            </form>
            {errors.title && (<span style={{color:'red',display:'block'}}>{errors.title}</span>)}

            <Link href="/libros">volver</Link>
        </>
    )
}
export default BookCreate
