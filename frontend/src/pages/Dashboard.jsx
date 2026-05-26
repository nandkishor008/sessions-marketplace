import { useContext } from "react";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import {
  BookOpen,
  Calendar,
  TrendingUp,
  User,
  Rocket,
  Star,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {

  const { user } =
    useContext(AuthContext);

  return (
    <div className="
      min-h-screen
      relative
      overflow-hidden

      bg-gray-100

      dark:bg-[#0b1120]

      dark:bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),transparent_30%)]

      transition

      py-10

      px-4
      md:px-6
    ">

      {/* BACKGROUND EFFECTS */}

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

        {/* HERO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            relative
            overflow-hidden

            rounded-[30px]
            md:rounded-[40px]

            shadow-2xl

            mb-10
          "
        >

          {/* IMAGE */}

          <img
            src="
https://images.unsplash.com/photo-1522202176988-66273c2fd55f
            "
            alt="dashboard"
            className="
              w-full

              h-[350px]
              md:h-[450px]

              object-cover
            "
          />

          {/* OVERLAY */}

          <div className="
            absolute
            inset-0

            bg-gradient-to-r
            from-black/90
            via-black/70
            to-transparent
          " />

          {/* CONTENT */}

          <div className="
            absolute
            inset-0

            flex
            flex-col
            justify-center

            px-5
            md:px-16
          ">

            <motion.h1
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
              className="
                text-4xl
                md:text-7xl

                font-black

                text-white

                leading-tight

                mb-5
                md:mb-6
              "
            >
              Welcome Back,
              <br />

              <span className="
                text-transparent
                bg-clip-text

                bg-gradient-to-r
                from-purple-400
                to-blue-400
              ">
                {user?.username}
              </span>

            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.4,
              }}
              className="
                text-base
                md:text-xl

                text-gray-300

                max-w-2xl

                leading-7
                md:leading-9
              "
            >
              Continue your mentorship
              journey, explore expert
              sessions and accelerate
              your career growth.
            </motion.p>

            {/* BUTTONS */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.6,
              }}
              className="
                flex
                flex-col
                sm:flex-row

                gap-4
                md:gap-5

                mt-8
                md:mt-10
              "
            >

              <Link
                to="/sessions"
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

                  text-base
                  md:text-lg

                  font-bold

                  hover:scale-105

                  transition

                  shadow-2xl
                "
              >
                Explore Sessions
              </Link>

              <Link
                to="/my-bookings"
                className="
                  border
                  border-white

                  text-white

                  px-6
                  md:px-8

                  py-3
                  md:py-4

                  rounded-2xl

                  text-base
                  md:text-lg

                  font-bold

                  hover:bg-white
                  hover:text-black

                  transition
                "
              >
                My Bookings
              </Link>

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

          {/* CARD */}

          {[
            {
              icon: (
                <User
                  size={40}
                  className="
                    text-purple-500
                  "
                />
              ),
              label: "Account",
              value:
                user?.role || "User",
              color:
                "text-black dark:text-white",
            },

            {
              icon: (
                <Rocket
                  size={40}
                  className="
                    text-blue-500
                  "
                />
              ),
              label: "Status",
              value: "Active",
              color:
                "text-green-500",
            },

            {
              icon: (
                <TrendingUp
                  size={40}
                  className="
                    text-pink-500
                  "
                />
              ),
              label: "Growth",
              value: "98%",
              color:
                "text-black dark:text-white",
            },

            {
              icon: (
                <Star
                  size={40}
                  className="
                    text-yellow-500
                  "
                />
              ),
              label: "Membership",
              value: "Premium",
              color:
                "text-black dark:text-white",
            },
          ].map((item, index) => (

            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
              }}
              className="
                backdrop-blur-xl

                bg-white/70
                dark:bg-white/5

                border
                border-white/20

                rounded-3xl

                p-6
                md:p-8

                shadow-2xl
              "
            >

              <div className="
                flex
                justify-between
                items-center

                mb-6
              ">

                {item.icon}

                <span className="
                  text-sm

                  text-gray-500
                  dark:text-gray-300
                ">
                  {item.label}
                </span>

              </div>

              <h2 className={`
                text-3xl
                md:text-4xl

                font-black

                ${item.color}

                capitalize
              `}>
                {item.value}
              </h2>

            </motion.div>

          ))}

        </div>

        {/* QUICK ACTIONS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="
            backdrop-blur-xl

            bg-white/70
            dark:bg-white/5

            border
            border-white/20

            rounded-[30px]
            md:rounded-[40px]

            shadow-2xl

            p-6
            md:p-10
          "
        >

          <h2 className="
            text-4xl
            md:text-5xl

            font-black

            text-black
            dark:text-white

            mb-10
          ">
            Quick Actions
          </h2>

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
                  <BookOpen
                    size={50}
                    className="
                      text-purple-500
                      mb-6
                    "
                  />
                ),
                title:
                  "Browse Sessions",
                desc:
                  "Explore mentorship sessions from expert creators worldwide.",
              },

              {
                icon: (
                  <Calendar
                    size={50}
                    className="
                      text-blue-500
                      mb-6
                    "
                  />
                ),
                title:
                  "My Bookings",
                desc:
                  "Manage your booked mentorship sessions easily.",
              },

              {
                icon: (
                  <TrendingUp
                    size={50}
                    className="
                      text-pink-500
                      mb-6
                    "
                  />
                ),
                title:
                  "Growth Tracking",
                desc:
                  "Track your learning progress and improve continuously.",
              },
            ].map((item, index) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                }}
                className="
                  bg-gray-100
                  dark:bg-[#181c24]

                  rounded-3xl

                  p-6
                  md:p-8

                  shadow-xl

                  transition
                "
              >

                {item.icon}

                <h3 className="
                  text-2xl
                  md:text-3xl

                  font-bold

                  text-black
                  dark:text-white

                  mb-4
                ">
                  {item.title}
                </h3>

                <p className="
                  text-gray-500
                  dark:text-gray-300

                  leading-7
                  md:leading-8
                ">
                  {item.desc}
                </p>

              </motion.div>

            ))}

          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default Dashboard;