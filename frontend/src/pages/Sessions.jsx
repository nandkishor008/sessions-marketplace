import { useEffect, useState } from "react";

import API from "../api/axios";

import SessionCard from "../components/SessionCard";

import { motion } from "framer-motion";

const Sessions = () => {

  const [sessions, setSessions] =
    useState([]);

  const [
    filteredSessions,
    setFilteredSessions,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const [hasNext, setHasNext] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  // FETCH FIRST TIME

  useEffect(() => {

    fetchSessions(1, true);

  }, []);

  // FILTER

  useEffect(() => {

    filterSessions();

  }, [
    search,
    category,
    sessions,
  ]);

  // FETCH SESSIONS

  const fetchSessions = async (
    currentPage = 1,
    reset = false
  ) => {

    try {

      setLoading(true);

      const res =
        await API.get(

          `/sessions/?page=${currentPage}`

        );

      if (reset) {

        setSessions(
          res.data.sessions
        );

      } else {

        setSessions((prev) => [

          ...prev,

          ...res.data.sessions,
        ]);
      }

      setHasNext(
        res.data.has_next
      );

      setPage(
        res.data.current_page
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // SEARCH + FILTER

  const filterSessions = () => {

    let filtered = [...sessions];

    // SEARCH

    if (search.trim() !== "") {

      filtered = filtered.filter(
        (session) => {

          const searchText =
            search.toLowerCase();

          return (

            session.title
              ?.toLowerCase()
              .includes(searchText)

            ||

            session.description
              ?.toLowerCase()
              .includes(searchText)

            ||

            session.category
              ?.toLowerCase()
              .includes(searchText)

            ||

            session.creator_name
              ?.toLowerCase()
              .includes(searchText)
          );
        }
      );
    }

    // CATEGORY

    if (category !== "") {

      filtered = filtered.filter(
        (session) =>

          session.category ===
          category
      );
    }

    setFilteredSessions(
      filtered
    );
  };

  // LOAD MORE

  const loadMore = () => {

    fetchSessions(page + 1);
  };

  return (
    <div
      className="
        min-h-screen

        bg-gray-100

        dark:bg-[#0b1120]

        dark:bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),transparent_30%)]

        text-black
        dark:text-white

        py-10

        px-4
        md:px-6

        transition

        relative
        overflow-hidden
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            mb-12
          "
        >

          <h1
            className="
              text-4xl
              md:text-6xl

              font-black

              mb-4
            "
          >
            Explore Sessions
          </h1>

          <p
            className="
              text-gray-600
              dark:text-gray-400

              text-lg
            "
          >
            Discover premium mentorship sessions
          </p>

        </motion.div>

        {/* SEARCH + FILTER */}

        <div
          className="
            flex
            flex-col
            lg:flex-row

            gap-5

            mb-12
          "
        >

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search sessions..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              flex-1

              bg-white

              dark:bg-white/5

              border
              border-gray-300
              dark:border-white/10

              backdrop-blur-xl

              text-black
              dark:text-white

              placeholder-gray-500
              dark:placeholder-gray-400

              p-4
              md:p-5

              rounded-2xl

              outline-none

              focus:border-black/20
              dark:focus:border-white/30

              transition
            "
          />

          {/* CATEGORY */}

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="
              bg-white

              dark:bg-white/5

              border
              border-gray-300
              dark:border-white/10

              backdrop-blur-xl

              text-black
              dark:text-white

              p-4
              md:p-5

              rounded-2xl

              outline-none

              w-full
              lg:w-auto

              min-w-[220px]

              transition
            "
          >

            <option value="">
              All Categories
            </option>

            <option value="Programming">
              Programming
            </option>

            <option value="Design">
              Design
            </option>

            <option value="Business">
              Business
            </option>

            <option value="AI">
              AI
            </option>

            <option value="DSA">
              DSA
            </option>

          </select>

        </div>

        {/* LOADING */}

        {loading &&
        sessions.length === 0 ? (

          <div
            className="
              min-h-[40vh]

              flex
              justify-center
              items-center
            "
          >

            <h2
              className="
                text-5xl
                font-black
              "
            >
              Loading...
            </h2>

          </div>

        ) : filteredSessions.length === 0 ? (

          <div
            className="
              bg-white

              dark:bg-white/5

              border
              border-gray-300
              dark:border-white/10

              rounded-3xl

              p-10
              md:p-20

              text-center

              transition
            "
          >

            <h2
              className="
                text-3xl
                md:text-5xl

                font-black

                mb-4
              "
            >
              No Sessions Found
            </h2>

            <p
              className="
                text-gray-600
                dark:text-gray-400
              "
            >
              Try different search or category
            </p>

          </div>

        ) : (

          <>
            {/* GRID */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3

                gap-8
              "
            >

              {filteredSessions.map(
                (session) => (

                <motion.div
                  key={session.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >

                  <SessionCard
                    session={session}
                  />

                </motion.div>

              ))}

            </div>

            {/* LOAD MORE */}

            {hasNext && (

              <div
                className="
                  flex
                  justify-center

                  mt-16
                "
              >

                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="
                    bg-black
                    dark:bg-white

                    text-white
                    dark:text-black

                    px-7
                    md:px-10

                    py-3
                    md:py-4

                    rounded-2xl

                    text-base
                    md:text-lg

                    font-black

                    hover:scale-105

                    transition

                    disabled:opacity-50
                  "
                >

                  {loading

                    ? "Loading..."

                    : "Load More"}

                </button>

              </div>

            )}

          </>
        )}

      </div>

    </div>
  );
};

export default Sessions;