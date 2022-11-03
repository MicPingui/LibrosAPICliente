import Link from 'next/link'
import { useState } from 'react';
import {useRouter} from 'next/router';

export async function getServerSideProps({params}){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`);
    const data = await res.json();
    return{
        props:{
            book:data
        }
    }
}

const BookEdit = ({book}) =>{
    const router = useRouter();
    const [bookTitle, setbookTitle] = useState(book.title)
    const [errors, setErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(e){
        setSubmitting(true)
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`,{
            method: 'POST',
            headers:{
                accept:'application/json',
                'content-type':'application/json'
            },
            body: JSON.stringify({
                title:bookTitle,
                _method: 'PATCH'
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
            <h1>Editar</h1>
            <form onSubmit={handleSubmit}>
                <label>Titulo:</label>
                <input data-cy="input-book-title-editar" onChange={(e)=> setbookTitle(e.target.value)} type="text" value={String(bookTitle)} disabled={submitting}></input>
                <button data-cy="btn-book-editar" disabled={submitting}>{submitting ? 'Enviando...':'Enviar'}</button>
            </form>
            {errors.title && (<span style={{color:'red',display:'block'}}>{errors.title}</span>)}

            <Link href="/libros">volver</Link>
        </>
    )
}
export default BookEdit

