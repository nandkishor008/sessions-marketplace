import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../api/axios";

import toast from "react-hot-toast";

import {
  motion,
} from "framer-motion";

import {
  AuthContext,
} from "../context/AuthContext";

const SessionDetails = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const { user } =
    useContext(AuthContext);

  const [session, setSession] =
    useState(null);

  const [
    relatedSessions,
    setRelatedSessions,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    bookingLoading,
    setBookingLoading,
  ] = useState(false);

  const [imageError,
    setImageError] =
    useState(false);

  useEffect(() => {

    fetchSession();

  }, [id]);

  const fetchSession = async () => {

    try {

      setLoading(true);

      const sessionRes =
        await API.get(
          `/sessions/${id}/`
        );

      setSession(
        sessionRes.data
      );

      const relatedRes =
        await API.get(

          `/sessions/?category=${sessionRes.data.category}`

        );

      const filtered =
        relatedRes.data.sessions.filter(

          (item) =>
            item.id !==
            sessionRes.data.id
        );

      setRelatedSessions(
        filtered.slice(0, 3)
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // BOOK SESSION

  const handleBooking = async () => {

    if (!user) {

      toast.error(
        "Please login first"
      );

      navigate("/login");

      return;
    }

    try {

      setBookingLoading(true);

      await API.post(

        `/bookings/create/${id}/`

      );

      toast.success(
        "🎉 Session booked successfully"
      );

    } catch (error) {

      toast.error(

        error.response?.data?.error ||

        "Booking failed"
      );

    } finally {

      setBookingLoading(false);
    }
  };

  // DELETE SESSION

  const handleDelete = async () => {

    try {

      await API.delete(

        `/sessions/delete/${id}/`

      );

      toast.success(
        "Session deleted"
      );

      navigate("/my-sessions");

    } catch (error) {

      toast.error(
        "Delete failed"
      );
    }
  };

  // LOADING

  if (loading) {

    return (
      <div className="
        min-h-screen
        bg-gray-100
        dark:bg-[#0b1120]
        flex
        justify-center
        items-center
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

      <div className="
        max-w-7xl
        mx-auto
      ">

        {/* BACK BUTTON */}

        <button
          onClick={() => navigate(-1)}
          className="
            mb-8

            bg-white
            dark:bg-white/10

            border
            border-gray-300
            dark:border-white/10

            backdrop-blur-xl

            px-5
            md:px-6

            py-3

            rounded-2xl

            font-bold

            hover:bg-black
            hover:text-white

            dark:hover:bg-white
            dark:hover:text-black

            transition
          "
        >
          ← Back
        </button>

        {/* HERO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            bg-white

            dark:bg-white/5

            border
            border-gray-300
            dark:border-white/10

            rounded-[30px]
            md:rounded-[40px]

            overflow-hidden

            shadow-2xl

            backdrop-blur-xl

            mb-14

            transition
          "
        >

          {/* IMAGE */}

          <div className="
            relative
          ">

            <img
              src={
                imageError

                  ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"

                  : session.image
              }

              alt={session.title}

              onError={() =>
                setImageError(true)
              }

              className="
                w-full

                h-[280px]
                md:h-[500px]

                object-cover
              "
            />

            {/* OVERLAY */}

            <div className="
              absolute
              inset-0

              bg-gradient-to-t
              from-black
              via-black/40
              to-transparent
            " />

          </div>

          {/* CONTENT */}

          <div className="
            p-5
            md:p-10
          ">

            <div className="
              flex
              flex-col
              lg:flex-row

              justify-between

              gap-10
            ">

              {/* LEFT */}

              <div className="
                flex-1
              ">

                <span className="
                  bg-purple-500/20
                  text-purple-400

                  px-5
                  py-2

                  rounded-full

                  text-sm

                  font-bold
                ">
                  {session.category}
                </span>

                <h1 className="
                  text-4xl
                  md:text-6xl

                  font-black

                  mt-6
                  mb-5
                ">
                  {session.title}
                </h1>

                <p className="
                  text-gray-600
                  dark:text-gray-300

                  text-lg
                  md:text-xl

                  leading-8
                  md:leading-9
                ">
                  {session.description}
                </p>

              </div>

              {/* RIGHT */}

              <div className="
                w-full
                lg:w-[350px]

                bg-gray-100
                dark:bg-[#181c24]

                border
                border-gray-300
                dark:border-white/10

                rounded-3xl

                p-6
                md:p-8

                h-fit

                transition
              ">

                <h2 className="
                  text-4xl
                  md:text-5xl

                  font-black

                  mb-6
                ">
                  ₹{session.price}
                </h2>

                <div className="
                  space-y-4

                  text-gray-700
                  dark:text-gray-300

                  mb-8
                ">

                  <p>
                    <span className="
                      font-bold
                      text-black
                      dark:text-white
                    ">
                      Creator:
                    </span>{" "}
                    {session.creator_name}
                  </p>

                  <p>
                    <span className="
                      font-bold
                      text-black
                      dark:text-white
                    ">
                      Duration:
                    </span>{" "}
                    {session.duration} mins
                  </p>

                </div>

                {/* BOOK BUTTON */}

                {user?.role !==
                "creator" && (

                  <button
                    onClick={
                      handleBooking
                    }
                    disabled={
                      bookingLoading
                    }
                    className="
                      w-full

                      bg-gradient-to-r
                      from-purple-500
                      to-blue-500

                      hover:from-purple-600
                      hover:to-blue-600

                      text-white

                      py-4

                      rounded-2xl

                      text-lg

                      font-black

                      hover:scale-105

                      transition

                      disabled:opacity-50
                    "
                  >

                    {bookingLoading

                      ? "Booking..."

                      : user

                      ? "Book Session"

                      : "Login to Book"
                    }

                  </button>

                )}

                {/* CREATOR ACTIONS */}

                {user?.username ===
                session.creator_name && (

                  <div className="
                    flex
                    flex-col
                    sm:flex-row

                    gap-4

                    mt-5
                  ">

                    <Link
                      to={`/edit-session/${session.id}`}
                      className="
                        flex-1

                        bg-yellow-500

                        text-white

                        py-3

                        rounded-2xl

                        text-center

                        font-bold
                      "
                    >
                      Edit
                    </Link>

                    <button
                      onClick={
                        handleDelete
                      }
                      className="
                        flex-1

                        bg-red-500

                        text-white

                        py-3

                        rounded-2xl

                        font-bold
                      "
                    >
                      Delete
                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>

        </motion.div>

        {/* RELATED SESSIONS */}

        {relatedSessions.length > 0 && (

          <div>

            <h2 className="
              text-4xl
              md:text-5xl

              font-black

              mb-10
            ">
              Related Sessions
            </h2>

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3

              gap-8
            ">

              {relatedSessions.map(
                (item) => (

                <motion.div
                  key={item.id}
                  whileHover={{
                    y: -10,
                  }}
                  className="
                    bg-white

                    dark:bg-white/5

                    border
                    border-gray-300
                    dark:border-white/10

                    rounded-3xl

                    overflow-hidden

                    shadow-2xl

                    transition
                  "
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      w-full

                      h-52
                      md:h-56

                      object-cover
                    "
                  />

                  <div className="
                    p-5
                    md:p-6
                  ">

                    <h3 className="
                      text-2xl
                      md:text-3xl

                      font-black

                      mb-4
                    ">
                      {item.title}
                    </h3>

                    <p className="
                      text-gray-600
                      dark:text-gray-400

                      mb-6

                      line-clamp-3
                    ">
                      {
                        item.description
                      }
                    </p>

                    <div className="
                      flex
                      justify-between
                      items-center

                      gap-4
                    ">

                      <span className="
                        text-2xl
                        md:text-3xl

                        font-black

                        text-purple-400
                      ">
                        ₹{item.price}
                      </span>

                      <Link
                        to={`/sessions/${item.id}`}
                        className="
                          bg-gradient-to-r
                          from-purple-500
                          to-blue-500

                          text-white

                          px-5
                          py-3

                          rounded-2xl

                          font-black

                          transition
                        "
                      >
                        View
                      </Link>

                    </div>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default SessionDetails;