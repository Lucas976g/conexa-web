import { useState, useEffect } from "react"
import { useCommunityHome } from "../../hooks/useCommunityHome"
import { getPosts } from "../../services/community.service"

const CommunityPage = () => {
  const { forums, feed, loading, error } = useCommunityHome()

  const [displayedPosts, setDisplayedPosts] = useState([])
  const [activeForum, setActiveForum] = useState("general")

  // Cargar feed inicial cuando el hook termina
  useEffect(() => {
    if (feed && feed.length > 0) {
      setDisplayedPosts(feed)
    }
  }, [feed])

  // Lógica de cambio de foro → llamada real al backend
  const handleForumClick = async (forumId) => {
    setActiveForum(forumId)

    try {
      const topicId = forumId === "general" ? "general" : forumId
      const filteredPosts = await getPosts({ topicId })
      setDisplayedPosts(filteredPosts)
    } catch (err) {
      console.error("Error filtrando posts:", err)
    }
  }

  if (loading) return <div className="p-4">Cargando comunidad...</div>
  if (error) return <div className="p-4 text-red-600">Error al cargar datos.</div>

  return (
    <div className="flex w-full min-h-[calc(100vh-64px)] animate-fadeIn">

      {/* ---------- LISTA DE FOROS ---------- */}
      <div className="w-1/3 border-r border-neutral-300 dark:border-neutral-700 p-4 space-y-3">

        <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
          Foros
        </h2>

        {/* Foro General */}
        <div
          onClick={() => handleForumClick("general")}
          className={`cursor-pointer p-4 rounded-lg border 
            ${activeForum === "general"
              ? "border-amber-500 bg-amber-50 dark:bg-neutral-800"
              : "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
        >
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
            General
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Conversaciones generales de la comunidad
          </p>
        </div>

        {/* Foros dinámicos del backend */}
        {forums.map((forum) => (
          <div
            key={forum.id}
            onClick={() => handleForumClick(forum.id)}
            className={`cursor-pointer p-4 rounded-lg border 
              ${activeForum === forum.id
                ? "border-amber-500 bg-amber-50 dark:bg-neutral-800"
                : "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
          >
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              {forum.name}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {forum.description || "Sin descripción"}
            </p>
          </div>
        ))}

      </div>

      {/* ---------- LISTA DE POSTS ---------- */}
      <div className="w-2/3 p-6 space-y-4">

        <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
          {activeForum === "general"
            ? "Publicaciones Recientes"
            : `Posts en: ${forums.find((f) => f.id === activeForum)?.name || "Foro"}`
          }
        </h2>

        {displayedPosts.length === 0 && (
          <div className="text-neutral-500 dark:text-neutral-400">
            No hay posts aquí todavía.
          </div>
        )}

        {displayedPosts.map((post) => (
          <div
            key={post.id}
            className="p-4 rounded-lg border border-neutral-300 dark:border-neutral-700 
                       hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
              {post.title}
            </h3>

            <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">
              {post.description || post.content || "Sin descripción"}
            </p>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              Por {post.authorName || "Usuario"}, {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default CommunityPage