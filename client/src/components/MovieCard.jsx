import { useNavigate } from "react-router-dom"

function MovieCard({ id, title, image }) {

  const navigate = useNavigate()

  return (

    <div
      onClick={() => navigate(`/movie/${id}`)}
      className="w-[220px] bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 duration-300 cursor-pointer"
    >

      <img
        src={image}
        alt={title}
        className="w-full h-[320px] object-cover"
      />

      <div className="p-4">

        <h2 className="text-white text-xl font-semibold">
          {title}
        </h2>

      </div>

    </div>
  )
}

export default MovieCard