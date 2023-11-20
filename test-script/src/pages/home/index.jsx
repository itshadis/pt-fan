/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import Layout from "../../layout"
import Loader from "../../components/loader/Loader"
import ReactPaginate from "react-paginate"
import Search from "../../components/search"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Home = () => {
  const [pokemons, setPokemons] = useState()
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(16)
  const [pages, setPages] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getPokemons()
    
  }, [offset])

  const getPokemons = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
      setPokemons(res.data.results);
      setPages(Math.floor(res.data.count / limit))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const changePage = ({selected}) => {
    setOffset(selected * limit);
  }

  return (
    <Layout>
      <section className="mt-2">
        <div className="flex justify-between my-1">
          <h2 className="text-xl">List Pokemon</h2>
          <Search />
        </div>
        <div className="grid grid-cols-4 border-y-[1px] border-black">
          <div className={`grid ${loading ? '' : 'grid-cols-3 md:grid-cols-4'} col-span-3 sm:col-span-3 justify-items-center content-center gap-4 my-2`}>
            {
              loading ? (
                <div className="h-96 flex justify-center items-center">
                  <Loader />  
                </div>
              ) :
              
              pokemons?.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Link to={`/detail/${item.name}`} className="bg-green-400 rounded-full hover:bg-yellow-400">
                    <img className="object-cover w-10 md:w-14" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png" alt="pokemon-ball" />
                  </Link>
                  <p className="text-center text-xs md:text-sm font-medium">{item.name}</p>
                </div>
              ))
            }
          </div>
          <div className="p-2">
            <img className="object-cover w-72" src="https://pbs.twimg.com/media/FkGB4ffXoAAxKg-.jpg:large" alt="pokemon-story" />
          </div>
        </div>
        <nav className="pagination is-centered mt-2" role="navigation" aria-label="pagination">
          <ReactPaginate 
            previousLabel={"< Prev"}
            nextLabel={"Next >"}
            pageCount={pages}
            onPageChange={changePage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            containerClassName={"pagination-list"}
            pageLinkClassName={"pagination-link"}
            previousLinkClassName={"pagination-previous"}
            nextLinkClassName={"pagination-next"}
            activeLinkClassName={"pagination-link is-current"}
            disabledLinkClassName={"pagination-link is-disable"}
          />
      </nav>
      </section>
    </Layout>
  )
}

export default Home