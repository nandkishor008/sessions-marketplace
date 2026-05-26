import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div className="
      min-h-screen
      relative
      overflow-hidden
      flex
      justify-center
      items-center

      bg-[#050816]

      px-4
      md:px-6
    ">

      {/* BACKGROUND IMAGE */}

      <img
        src="
https://images.unsplash.com/photo-1516321318423-f06f85e504b3
        "
        alt="background"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      {/* DARK OVERLAY */}

      <div className="
        absolute
        inset-0
        bg-black/75
      " />

      {/* ANIMATED GRADIENT BLOBS */}

      <div className="
        absolute
        w-[300px]
        md:w-[500px]

        h-[300px]
        md:h-[500px]

        bg-purple-500/30

        rounded-full
        blur-3xl

        top-[-100px]
        left-[-100px]

        animate-pulse
      " />

      <div className="
        absolute
        w-[300px]
        md:w-[500px]

        h-[300px]
        md:h-[500px]

        bg-blue-500/30

        rounded-full
        blur-3xl

        bottom-[-100px]
        right-[-100px]

        animate-pulse
      " />

      {/* MAIN CONTENT */}

      <div className="
        relative
        z-10

        text-center

        max-w-5xl
      ">

        {/* TITLE */}

        <motion.h1
          initial={{
            opacity: 0,
            y: -60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            text-5xl
            sm:text-6xl
            md:text-8xl

            font-black

            text-white

            leading-tight
          "
        >

          Learn From

          <br />

          <span className="
            text-transparent
            bg-clip-text

            bg-gradient-to-r
            from-purple-400
            via-pink-400
            to-blue-400
          ">

            Industry Experts

          </span>

        </motion.h1>

        {/* SUBTITLE */}

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
            mt-6
            md:mt-8

            text-lg
            sm:text-xl
            md:text-2xl

            text-gray-300

            leading-8
            md:leading-9

            max-w-3xl
            mx-auto
          "
        >

          Book mentorship sessions with
          experienced creators, developers,
          designers and professionals.

        </motion.p>

        {/* BUTTONS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.7,
          }}
          className="
            mt-10
            md:mt-12

            flex
            flex-col
            sm:flex-row

            justify-center

            gap-5
            md:gap-6
          "
        >

          {/* BUTTON */}

          <Link
            to="/sessions"
            className="
              bg-gradient-to-r
              from-purple-500
              to-blue-500

              text-white

              px-8
              md:px-10

              py-4
              md:py-5

              rounded-2xl

              text-lg
              md:text-xl

              font-bold

              hover:scale-105

              transition

              shadow-2xl
              shadow-purple-500/20
            "
          >
            Explore Sessions
          </Link>

          {/* BUTTON */}

          <Link
            to="/register"
            className="
              border
              border-white/30

              bg-white/10
              backdrop-blur-xl

              text-white

              px-8
              md:px-10

              py-4
              md:py-5

              rounded-2xl

              text-lg
              md:text-xl

              font-bold

              hover:bg-white
              hover:text-black

              transition
            "
          >
            Become Creator
          </Link>

        </motion.div>

        {/* STATS */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
          }}
          className="
            mt-16
            md:mt-20

            grid
            grid-cols-1
            md:grid-cols-3

            gap-5
            md:gap-8
          "
        >

          {/* CARD */}

          <div className="
            backdrop-blur-xl

            bg-white/10

            border
            border-white/20

            rounded-3xl

            p-6
            md:p-8

            shadow-2xl
          ">

            <h2 className="
              text-4xl
              md:text-5xl

              font-black

              text-white
            ">
              500+
            </h2>

            <p className="
              text-gray-300
              mt-2
            ">
              Expert Mentors
            </p>

          </div>

          {/* CARD */}

          <div className="
            backdrop-blur-xl

            bg-white/10

            border
            border-white/20

            rounded-3xl

            p-6
            md:p-8

            shadow-2xl
          ">

            <h2 className="
              text-4xl
              md:text-5xl

              font-black

              text-white
            ">
              10K+
            </h2>

            <p className="
              text-gray-300
              mt-2
            ">
              Sessions Booked
            </p>

          </div>

          {/* CARD */}

          <div className="
            backdrop-blur-xl

            bg-white/10

            border
            border-white/20

            rounded-3xl

            p-6
            md:p-8

            shadow-2xl
          ">

            <h2 className="
              text-4xl
              md:text-5xl

              font-black

              text-white
            ">
              24/7
            </h2>

            <p className="
              text-gray-300
              mt-2
            ">
              Learning Support
            </p>

          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default Home;