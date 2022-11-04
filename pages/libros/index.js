import Link from 'next/link'

export async function getServerSideProps(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    const data = await res.json()
    
    return {
        props: {
            books: data
        },
        //revalidate: 10 -> una opcion para que cada 10 segundos realice la peticion cuando sea getStaticProps()
    }
}

const BookList = ({ books }) =>{
    async function handleDelete(e, idBook){
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${idBook}`,{
            method: 'POST',
            headers:{
                accept:'application/json',
                'content-type':'application/json'
            },
            body: JSON.stringify({
                _method: 'DELETE'
            })
        })
        if(res.ok){
            //success
            window.location.href = '/libros'
        }
    }
    return (
        <div>
            <h1>Libros</h1>
            <ul data-cy="lista-libros">
                {books.map(book=>(
                    <li key={`book-${book.id}`}>
                        <Link data-cy={`link-ver-libro-${book.id}`} href={`/libros/${book.id}`}>{book.title}</Link> {' - '} 
                        <Link data-cy={`link-editar-libro-${book.id}`} href={`/libros/${book.id}/editar`}>editar</Link>{' - '} 
                        <form onSubmit={(e) => handleDelete(e,book.id)} style={{display:'inline'}}>
                            <button data-cy={`link-eliminar-libro-${book.id}`}>
                                Eliminar
                            </button>
                        </form>
                    </li> 
                ))}
            </ul>
            <Link href="/libros/crear">Nuevo Libro</Link>
        </div>
    )
}
export default BookList
