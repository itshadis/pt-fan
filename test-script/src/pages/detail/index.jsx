/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import Layout from "../../layout"
import Loader from "../../components/loader/Loader"
import Search from "../../components/search"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Bar } from 'react-chartjs-2'

import { 
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const Detail = () => {
  const [loading, setLoading] = useState(false)
  const [pokemon, setPokemon] = useState()
  const [baseStat, setBaseStat] = useState([])
  const [notFound, setNotFound] = useState()
  const { params } = useParams()

  useEffect(() => {
    detailPokemon()
    
  }, [params])

  const detailPokemon = async () => {
    try {
      setLoading(true)
      setBaseStat([])
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params}`)
      setNotFound(false)
      setPokemon(res.data)

      res.data.stats.forEach(e => {
        setBaseStat(arr => [...arr, e.base_stat])
      });
      
    } catch (error) {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const data = {
    labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
    datasets: [
      {
        label: 'Status',
        data: baseStat,
        backgroundColor: 'red'
      } 
    ]
  }
  
  const options = {
    indexAxis: 'y'
  }

  return (
    <Layout>
      <section className="mt-2">
        <div className="flex justify-between my-1">
          <h2 className="text-base md:text-xl">Detail Pokemon : {pokemon ? pokemon.name : ''}</h2>
          <Search />
        </div>
        <div className="border-y-[1px] border-black relative">
          <Link className="absolute text-black bg-blue-300 px-4 h-6 rounded top-1 hover:bg-blue-400" to={'/'}>Back</Link>
          {
            loading ? (
              <div className="h-96 flex justify-center items-center">
                <Loader />
              </div>
            ) :
            (
              !notFound ? (
                <div className="flex gap-1 lg:gap-10 items-center justify-center flex-wrap">
                  <div className="flex flex-col gap-0 lg:gap-1">
                    <img className="object-cover w-32" src={pokemon ? pokemon.sprites.front_default ? pokemon.sprites.front_default : pokemon.sprites.back_shiny : ''} alt="image not found" />
                    <table className="text-sm">
                      <tr>
                        <td className="font-semibold">Name</td>
                        <td className="px-2">:</td>
                        <td>{pokemon ? pokemon.name : ''}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Abilities</td>
                        <td className="px-2">:</td>
                        <td>
                          {pokemon ? pokemon.abilities?.map((item, index) => (
                            <span key={index}>{item.ability.name}, </span>
                          )) : ''}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Height</td>
                        <td className="px-2">:</td>
                        <td>{pokemon ? pokemon.height : ''}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Species</td>
                        <td className="px-2">:</td>
                        <td>{pokemon ? pokemon.species.name : ''}</td>
                      </tr>
                    </table>
                  </div>
                  
                  <div className="my-5 md:my-0 lg:p-20 w-[95%] lg:w-[70%] lg:h-[400px] flex justify-center lg:justify-start items-center">
                    <Bar data={data} options={options} />
                  </div>
                </div>

              ) : (
                <div className="flex justify-center items-center text-4xl font-semibold h-96">Pokemon Not Found</div>
              )
            )
          }
        </div>
      </section>
    </Layout>
  )
}

export default Detail