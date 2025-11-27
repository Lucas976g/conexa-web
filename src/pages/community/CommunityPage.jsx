import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useCommunityHome } from "../../hooks/useCommunityHome"
import { getPosts } from "../../services/community.service"
import { useNavigate } from "react-router-dom"
import {
  PlusCircle,
  Loader,
  MessageCircle,
  ThumbsUp,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react"
import Navbar from "../../components/layout/Navbar"

// --- SUB-COMPONENTE: NOVEDADES (Estático) ---
const NewsSection = () => (
  <section className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#111] p-6 border border-gray-200 dark:border-white/10 shadow-sm h-full">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Novedades de CONEXA
      </h2>
      <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500 hover:opacity-80 transition-opacity">
        Ver Archivo
      </button>
    </div>

    <div className="flex flex-col gap-6">
      {/* Card 1 */}
      <div className="flex flex-col md:flex-row gap-4 items-start group cursor-pointer">
        <div
          className="w-full md:w-48 h-28 rounded-lg bg-gray-200 dark:bg-neutral-800 bg-cover bg-center shrink-0 border border-gray-100 dark:border-white/5"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEUduB80o-aHwdJcgmPH8v1Qp83HRtLjyVisP0MpbrfJj8fAP1m1AuK240ilvZxCJ8eXaXucJGALUBzUnkEVnbNyuc7GIX49EhHwP-9b3GRIG3p34kiscYi-D-TuTxKQ9Cmi0FnqkE0E6Skn8r8Q7IG9Ly7yvBI6xnuWE73gQBC0lRAsQNyVy64AAxwpO03XVZmCqY1g21JfOf49aOEUlPTWzSAjQfOu8rHCeUrkVBJRJ5smFUbOks-PmzeqbejhhMa1Y0UWrGrFnc')",
          }}
        ></div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors leading-tight">
            Hito: Avance del 60% en el Tramo Norte
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            Se ha completado una fase crucial del proyecto, superando las
            expectativas en la modernización de la infraestructura logística.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex flex-col md:flex-row gap-4 items-start group cursor-pointer">
        <div
          className="w-full md:w-48 h-28 rounded-lg bg-gray-200 dark:bg-neutral-800 bg-cover bg-center shrink-0 border border-gray-100 dark:border-white/5"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEUduB80o-aHwdJcgmPH8v1Qp83HRtLjyVisP0MpbrfJj8fAP1m1AuK240ilvZxCJ8eXaXucJGALUBzUnkEVnbNyuc7GIX49EhHwP-9b3GRIG3p34kiscYi-D-TuTxKQ9Cmi0FnqkE0E6Skn8r8Q7IG9Ly7yvBI6xnuWE73gQBC0lRAsQNyVy64AAxwpO03XVZmCqY1g21JfOf49aOEUlPTWzSAjQfOu8rHCeUrkVBJRJ5smFUbOks-PmzeqbejhhMa1Y0UWrGrFnc')",
          }}
        ></div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors leading-tight">
            Nuevo Acuerdo de Colaboración Logística
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            CONEXA firma una alianza estratégica con operadores portuarios para
            optimizar la cadena de suministro.
          </p>
        </div>
      </div>
    </div>
  </section>
)

// --- SUB-COMPONENTE: KPIs (Estático) ---
const KPISection = () => (
  <section className="flex flex-col gap-4">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white px-1 mt-2">
      Estado Actual de la Ruta
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* KPI 1 */}
      <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-[#111] p-5 border border-gray-200 dark:border-white/10 shadow-sm">
        <Truck className="text-amber-500 mb-2" size={28} />
        <p className="text-3xl font-black text-gray-900 dark:text-white">
          15,000
        </p>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Flujo (TEUs)
        </p>
      </div>

      {/* KPI 2 */}
      <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-[#111] p-5 border border-gray-200 dark:border-white/10 shadow-sm">
        <CheckCircle2 className="text-blue-500 mb-2" size={28} />
        <p className="text-3xl font-black text-gray-900 dark:text-white">
          98.5%
        </p>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Eficiencia
        </p>
      </div>

      {/* KPI 3 */}
      <div className="flex flex-col gap-1 rounded-xl bg-white dark:bg-[#111] p-5 border border-gray-200 dark:border-white/10 shadow-sm">
        <Clock className="text-green-500 mb-2" size={28} />
        <p className="text-3xl font-black text-gray-900 dark:text-white">48h</p>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Tránsito Prom.
        </p>
      </div>
    </div>
  </section>
)

// --- SUB-COMPONENTE: SIDEBAR DE FOROS (Altura completa) ---
const ForumsSidebar = ({ forums, activeForum, onForumClick }) => (
  // CLAVE: h-full flex flex-col para ocupar toda la altura disponible
  <section className="flex flex-col h-full gap-4 rounded-xl bg-gray-50 dark:bg-[#111] p-6 border border-gray-200 dark:border-white/10">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
      Foros de Impacto
    </h2>

    <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
      {/* Botón "General" */}
      <button
        onClick={() => onForumClick("general")}
        className={`text-left p-4 rounded-lg transition-all border shrink-0 ${
          activeForum === "general"
            ? "bg-white dark:bg-white/10 border-amber-500 shadow-md"
            : "bg-white dark:bg-black/20 border-transparent hover:bg-gray-100 dark:hover:bg-white/5"
        }`}
      >
        <p
          className={`font-semibold ${
            activeForum === "general"
              ? "text-amber-600 dark:text-amber-500"
              : "text-gray-900 dark:text-white"
          }`}
        >
          Discusión General
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Temas varios de la comunidad.
        </p>
      </button>

      {/* Lista Dinámica (Limitamos a 5 para no desbordar visualmente si hay muchos) */}
      {forums.slice(0, 5).map((forum) => (
        <button
          key={forum.id}
          onClick={() => onForumClick(forum.id)}
          className={`text-left p-4 rounded-lg transition-all border shrink-0 ${
            activeForum === forum.id
              ? "bg-white dark:bg-white/10 border-amber-500 shadow-md"
              : "bg-white dark:bg-black/20 border-transparent hover:bg-gray-100 dark:hover:bg-white/5"
          }`}
        >
          <p
            className={`font-semibold ${
              activeForum === forum.id
                ? "text-amber-600 dark:text-amber-500"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {forum.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {forum.description || "Espacio de discusión."}
          </p>
        </button>
      ))}
    </div>

    {/* Footer: mt-auto empuja esto al final del contenedor, nivelando visualmente */}
    <div className="mt-auto pt-4">
      <button className="flex w-full items-center justify-center gap-2 rounded-lg h-10 bg-amber-500 hover:bg-amber-600 text-white dark:text-black font-bold text-sm transition-colors">
        Explorar Todos <ArrowRight size={16} />
      </button>
    </div>
  </section>
)

// --- COMPONENTE PRINCIPAL ---
const CommunityPage = () => {
  const { isAuthenticated } = useAuth()
  const { forums, feed, loading, error } = useCommunityHome()
  const navigate = useNavigate()

  const [displayedPosts, setDisplayedPosts] = useState([])
  const [activeForum, setActiveForum] = useState("general")

  // Inicializa posts
  useEffect(() => {
    if (feed && feed.length > 0) {
      setDisplayedPosts(feed)
    }
  }, [feed])

  // Manejo de clicks en foros
  const handleForumClick = async (forumId) => {
    setActiveForum(forumId)
    try {
      if (forumId === "all") {
        // ... lógica para traer todo
      }
      const topicId = forumId === "general" ? "general" : forumId
      const filteredPosts = await getPosts({ topicId })
      setDisplayedPosts(filteredPosts)
    } catch (err) {
      console.error("Error filtrando posts:", err)
    }
  }

  // Helpers de tiempo
  const timeAgo = (dateString) => {
    const now = new Date()
    const past = new Date(dateString)
    const diffInHours = Math.floor((now - past) / (1000 * 60 * 60))
    if (diffInHours < 1) return "Reciente"
    if (diffInHours < 24) return `${diffInHours}h`
    return `${Math.floor(diffInHours / 24)}d`
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-[#0A0A0A] flex justify-center items-center">
        <Loader size={48} className="animate-spin text-amber-500" />
      </main>
    )
  }

  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        Error cargando comunidad.
      </div>
    )

  return (
    <>
      {!isAuthenticated && <Navbar />}

      <main className="min-h-screen bg-white dark:bg-[#0A0A0A] font-display flex flex-col">
        <div className="flex-1 px-4 sm:px-8 md:px-12 lg:px-16 py-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            {/* --- HEADER --- */}
            <div className="flex flex-wrap items-end justify-between gap-4 py-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                  Portal Comunitario
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl">
                  Conectando comunidades: Información clave y participación para
                  el futuro de la infraestructura.
                </p>
              </div>

              {/* Botón Crear Post */}
              <button
                onClick={() => navigate("/community/create")}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white dark:text-black font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02] active:scale-95"
              >
                <PlusCircle size={20} />
                <span>Nuevo Post</span>
              </button>
            </div>

            {/* --- GRID LAYOUT PRINCIPAL --- */}
            {/* CLAVE: Quitamos 'items-start' para que el grid use 'stretch' por defecto */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* COLUMNA IZQUIERDA (2/3) */}
              <div className="flex flex-col gap-8 lg:col-span-2">
                <NewsSection />
                <KPISection />
              </div>

              {/* COLUMNA DERECHA (1/3) */}
              {/* CLAVE: h-full fuerza al aside a tomar la altura de la fila del grid */}
              <aside className="lg:col-span-1 h-full w-full">
                <ForumsSidebar
                  forums={forums}
                  activeForum={activeForum}
                  onForumClick={handleForumClick}
                />
              </aside>
            </div>

            {/* --- FEED DE PUBLICACIONES (Bottom) --- */}
            <section className="flex flex-col gap-6 pt-4">
              <div className="flex items-center gap-4 px-1 border-b border-gray-200 dark:border-white/10 pb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeForum === "general"
                    ? "Discusión General"
                    : forums.find((f) => f.id === activeForum)?.title ||
                      "Posts"}
                </h2>
                <span className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded-full">
                  {displayedPosts.length} posts
                </span>
              </div>

              {/* Lista de Posts */}
              <div className="flex flex-col gap-4">
                {displayedPosts.length === 0 ? (
                  <div className="p-12 text-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl">
                    <p className="text-gray-500 dark:text-gray-400">
                      No hay publicaciones en este foro aún.
                    </p>
                  </div>
                ) : (
                  displayedPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => navigate(`/community/post/${post.id}`)}
                      className="group flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all cursor-pointer"
                    >
                      {/* Post Header */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full bg-cover bg-center shrink-0 border border-gray-200 dark:border-white/10"
                          style={{
                            backgroundImage: `url('${
                              post.author?.avatar ||
                              "https://ui-avatars.com/api/?name=" +
                                (post?.userName || "User") +
                                "&background=random"
                            }')`,
                          }}
                        />
                        <div className="flex flex-col">
                          <p className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors">
                            {post?.userName || "Anónimo"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            {timeAgo(post.created_at)} •{" "}
                            {post.topic?.title || "General"}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                          {post.description ||
                            post.content ||
                            "Sin contenido previo."}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center gap-6 pt-2 border-t border-gray-100 dark:border-white/5 mt-2">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 group-hover:text-amber-500 transition-colors">
                          <ThumbsUp size={18} />
                          <span className="text-sm font-medium">
                            {post.likeCount || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 group-hover:text-amber-500 transition-colors">
                          <MessageCircle size={18} />
                          <span className="text-sm font-medium">
                            {post.commentCount || 0} comentarios
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}

export default CommunityPage
