import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

import {
  Link,
} from "react-router-dom";

import {
  BookOpen,
  Users,
  IndianRupee,
  TrendingUp,
  PlusCircle,
  Pencil,
  Sparkles,
  BarChart3,
} from "lucide-react";

import API from "../api/axios";

const CreatorDashboard = () => {

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      const res =
        await API.get(
          "/bookings/creator-stats/"
        );

      setStats(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (
      <div className="
        min-h-screen

        flex
        justify-center
        items-center

        bg-gray-100

        dark:bg-[#0b1120]

        text-black
        dark:text-white

        text-4xl
        md:text-5xl

        font-black

        transition
      ">
        Loading...
      </div>
    );
  }

  return (
    <div className="
      min-h-screen

      relative
      overflow-hidden

      bg-gray-100

      dark:bg-[#0b1120]

      dark:bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),transparent_30%)]

      text-black
      dark:text-white

      py-10

      px-4
      md:px-6

      transition
    ">

      {/* BACKGROUND */}

      <div className="
        absolute
        top-[-200px]
        left-[-200px]

        w-[300px]
        md:w-[500px]

        h-[300px]
        md:h-[500px]

        bg-purple-500/20

        rounded-full

        blur-3xl
      " />

      <div className="
        absolute
        bottom-[-200px]
        right-[-200px]

        w-[300px]
        md:w-[500px]

        h-[300px]
        md:h-[500px]

        bg-blue-500/20

        rounded-full

        blur-3xl
      " />

      <div className="
        max-w-7xl
        mx-auto

        relative
        z-10
      ">

        {/* HERO SECTION */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            relative

            rounded-[30px]
            md:rounded-[40px]

            overflow-hidden

            shadow-2xl

            mb-10
          "
        >

          <img
            src="
https://images.unsplash.com/photo-1522202176988-66273c2fd55f
            "
            alt="creator"
            className="
              w-full

              h-[350px]
              md:h-[420px]

              object-cover
            "
          />

          <div className="
            absolute
            inset-0

            bg-gradient-to-r
            from-black/95
            via-black/70
            to-transparent
          " />

          <div className="
            absolute
            inset-0

            flex
            flex-col
            justify-center

            px-5
            md:px-12
          ">

            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.2,
              }}
            >

              <div className="
                flex
                items-center
                gap-3

                mb-5
                md:mb-6
              ">

                <Sparkles
                  size={30}
                  className="
                    text-yellow-400
                  "
                />

                <span className="
                  text-yellow-300

                  font-bold

                  text-base
                  md:text-lg
                ">
                  Creator Dashboard
                </span>

              </div>

              <h1 className="
                text-4xl
                md:text-7xl

                font-black

                leading-tight

                mb-4
                md:mb-5

                text-white
              ">
                {stats?.name}
              </h1>

              <p className="
                text-lg
                md:text-2xl

                text-gray-300

                mb-6
                md:mb-8
              ">
                Role: {stats?.role}
              </p>

              <p className="
                text-gray-300

                text-base
                md:text-lg

                max-w-3xl

                leading-7
                md:leading-9

                mb-8
                md:mb-10
              ">
                Build your mentorship
                empire, manage premium
                sessions and grow your
                student community with
                powerful creator tools.
              </p>

              <div className="
                flex
                flex-col
                sm:flex-row

                gap-4
                md:gap-5
              ">

                <Link
                  to="/create-session"
                  className="
                    bg-gradient-to-r
                    from-purple-500
                    to-blue-500

                    text-white

                    px-6
                    md:px-8

                    py-3
                    md:py-4

                    rounded-2xl

                    font-black

                    text-base
                    md:text-lg

                    hover:scale-105

                    transition
                  "
                >
                  Create Session
                </Link>

                <Link
                  to="/my-sessions"
                  className="
                    border
                    border-white

                    text-white

                    px-6
                    md:px-8

                    py-3
                    md:py-4

                    rounded-2xl

                    font-black

                    text-base
                    md:text-lg

                    hover:bg-white
                    hover:text-black

                    transition
                  "
                >
                  Manage Sessions
                </Link>

              </div>

            </motion.div>

          </div>

        </motion.div>

        {/* STATS */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4

          gap-8

          mb-10
        ">

          {[
            {
              icon: (
                <BookOpen
                  size={45}
                  className="
                    text-purple-400
                    mb-6
                  "
                />
              ),
              value:
                stats?.total_sessions,
              label:
                "Total Sessions",
              gradient:
                "from-purple-600/20 to-purple-900/20",
              border:
                "border-purple-500/20",
            },

            {
              icon: (
                <Users
                  size={45}
                  className="
                    text-blue-400
                    mb-6
                  "
                />
              ),
              value:
                stats?.total_students,
              label:
                "Students",
              gradient:
                "from-blue-600/20 to-blue-900/20",
              border:
                "border-blue-500/20",
            },

            {
              icon: (
                <IndianRupee
                  size={45}
                  className="
                    text-green-400
                    mb-6
                  "
                />
              ),
              value:
                `₹${stats?.total_earnings}`,
              label:
                "Earnings",
              gradient:
                "from-green-600/20 to-green-900/20",
              border:
                "border-green-500/20",
            },

            {
              icon: (
                <TrendingUp
                  size={45}
                  className="
                    text-pink-400
                    mb-6
                  "
                />
              ),
              value:
                stats?.total_bookings,
              label:
                "Bookings",
              gradient:
                "from-pink-600/20 to-pink-900/20",
              border:
                "border-pink-500/20",
            },
          ].map((item, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -10,
              }}
              className={`
                bg-white/70
                dark:bg-transparent

                bg-gradient-to-br

                ${item.gradient}

                border
                ${item.border}

                rounded-3xl

                p-6
                md:p-8

                backdrop-blur-xl

                shadow-2xl
              `}
            >

              {item.icon}

              <h2 className="
                text-4xl
                md:text-5xl

                font-black

                mb-3
              ">
                {item.value}
              </h2>

              <p className="
                text-gray-600
                dark:text-gray-300

                text-base
                md:text-lg
              ">
                {item.label}
              </p>

            </motion.div>

          ))}

        </div>

        {/* FEATURES */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3

          gap-8
        ">

          {[
            {
              icon: (
                <PlusCircle
                  size={55}
                  className="
                    text-purple-400
                    mb-6
                  "
                />
              ),
              title:
                "Create Sessions",
              desc:
                "Launch high-quality mentorship sessions and attract more students.",
              link:
                "/create-session",
              button:
                "Create Now",
            },

            {
              icon: (
                <Pencil
                  size={55}
                  className="
                    text-blue-400
                    mb-6
                  "
                />
              ),
              title:
                "Manage Sessions",
              desc:
                "Edit pricing, update details and manage all your mentorship sessions.",
              link:
                "/my-sessions",
              button:
                "Open",
            },

            {
              icon: (
                <BarChart3
                  size={55}
                  className="
                    text-pink-400
                    mb-6
                  "
                />
              ),
              title:
                "Analytics",
              desc:
                "Track growth, earnings, student engagement and session performance.",
              button:
                "Coming Soon",
            },
          ].map((item, index) => (

            <motion.div
              key={index}
              whileHover={{
                scale: 1.03,
              }}
              className="
                bg-white/70
                dark:bg-white/5

                border
                border-white/10

                rounded-[30px]
                md:rounded-[35px]

                p-6
                md:p-10

                backdrop-blur-xl

                shadow-2xl
              "
            >

              {item.icon}

              <h2 className="
                text-3xl
                md:text-4xl

                font-black

                mb-4
              ">
                {item.title}
              </h2>

              <p className="
                text-gray-600
                dark:text-gray-300

                leading-7
                md:leading-8

                mb-8
              ">
                {item.desc}
              </p>

              {item.link ? (

                <Link
                  to={item.link}
                  className="
                    inline-block

                    bg-gradient-to-r
                    from-purple-500
                    to-blue-500

                    text-white

                    px-6
                    py-3

                    rounded-2xl

                    font-bold
                  "
                >
                  {item.button}
                </Link>

              ) : (

                <button
                  className="
                    bg-black
                    dark:bg-white

                    text-white
                    dark:text-black

                    px-6
                    py-3

                    rounded-2xl

                    font-bold
                  "
                >
                  {item.button}
                </button>

              )}

            </motion.div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default CreatorDashboard;