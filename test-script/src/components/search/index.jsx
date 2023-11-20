import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Search = () => {
  const [query, setQuery] = useState()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    navigate(`/detail/${query}`)  
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input onChange={(e) => {setQuery(e.target.value)}} type="text" className="h-7 md:h-8 w-36 md:w-auto border border-black outline-none indent-2 rounded" required/>
      <button type="submit" className="bg-slate-300 px-2 h-7 md:h-8 rounded hover:bg-slate-400 text-sm md:text-base">Search</button>
    </form>
  )
}

export default Search