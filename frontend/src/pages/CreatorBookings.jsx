import {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import toast from "react-hot-toast";

import {
  motion,
} from "framer-motion";

const CreatorBookings = () => {

  const [sessions, setSessions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const res =
        await API.get(
          "/bookings/creator-bookings/"
        );

      setSessions(res.data);

    } catch (error) {

      toast.error(
        "Failed to load bookings"
      );

    } finally {

      setLoading(false);
    }
  };

  const loadNextPage = async (
    sessionId,
    currentPage
  ) => {

    try {

      const res =
        await API.get(

          `/bookings/creator-bookings/?page_${sessionId}=${currentPage + 1}`

        );

      setSessions(res.data);

    } catch (error) {

      toast.error(
        "Failed to load more"
      );
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

      bg-gray-100

      dark:bg-[#0f1117]

      dark:bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.15),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.15),transparent_30%)]

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

        {/* HEADER */}

        <div className="
          mb-12
          md:mb-14
        ">

          <h1 className="
            text-4xl
            md:text-6xl

            font-black

            mb-4
          ">
            Creator Bookings
          </h1>

          <p className="
            text-gray-600
            dark:text-gray-400

            text-base
            md:text-lg
          ">
            Manage all student bookings
          </p>

        </div>

        {/* EMPTY */}

        {sessions.length === 0 ? (

          <div className="
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
          ">

            <h2 className="
              text-3xl
              md:text-4xl

              font-black

              mb-4
            ">
              No Bookings Yet
            </h2>

          </div>

        ) : (

          <div className="
            space-y-10
            md:space-y-12
          ">

            {sessions.map((session) => (

              <motion.div
                key={session.session_id}
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
                  md:rounded-[35px]

                  overflow-hidden

                  shadow-2xl

                  backdrop-blur-xl

                  transition
                "
              >

                {/* SESSION HEADER */}

                <div className="
                  flex
                  flex-col
                  lg:flex-row
                ">

                  <img
                    src={
                      session.session_image
                    }
                    alt={
                      session.session_title
                    }
                    className="
                      w-full

                      lg:w-[350px]

                      h-[220px]
                      md:h-[250px]

                      object-cover
                    "
                  />

                  <div className="
                    flex-1

                    p-5
                    md:p-8
                  ">

                    <h2 className="
                      text-3xl
                      md:text-4xl

                      font-black

                      mb-6
                    ">
                      {
                        session.session_title
                      }
                    </h2>

                    <div className="
                      grid
                      grid-cols-1
                      md:grid-cols-3

                      gap-5
                      md:gap-6
                    ">

                      {/* BOOKINGS */}

                      <div className="
                        bg-gray-100

                        dark:bg-[#1a1f2b]

                        rounded-2xl

                        p-5

                        transition
                      ">

                        <p className="
                          text-gray-600
                          dark:text-gray-400

                          mb-2
                        ">
                          Total Bookings
                        </p>

                        <h3 className="
                          text-3xl
                          md:text-4xl

                          font-black
                        ">
                          {
                            session.total_bookings
                          }
                        </h3>

                      </div>

                      {/* EARNINGS */}

                      <div className="
                        bg-gray-100

                        dark:bg-[#1a1f2b]

                        rounded-2xl

                        p-5

                        transition
                      ">

                        <p className="
                          text-gray-600
                          dark:text-gray-400

                          mb-2
                        ">
                          Earnings
                        </p>

                        <h3 className="
                          text-3xl
                          md:text-4xl

                          font-black

                          text-green-400
                        ">
                          ₹{
                            session.total_earnings
                          }
                        </h3>

                      </div>

                      {/* PRICE */}

                      <div className="
                        bg-gray-100

                        dark:bg-[#1a1f2b]

                        rounded-2xl

                        p-5

                        transition
                      ">

                        <p className="
                          text-gray-600
                          dark:text-gray-400

                          mb-2
                        ">
                          Session Price
                        </p>

                        <h3 className="
                          text-3xl
                          md:text-4xl

                          font-black
                        ">
                          ₹{
                            session.session_price
                          }
                        </h3>

                      </div>

                    </div>

                  </div>

                </div>

                {/* TABLE */}

                <div className="
                  overflow-x-auto

                  p-4
                  md:p-8
                ">

                  <table className="
                    w-full

                    min-w-[700px]

                    border-collapse
                  ">

                    <thead>

                      <tr className="
                        border-b
                        border-gray-300
                        dark:border-white/10

                        text-left
                      ">

                        <th className="
                          py-5
                          px-4
                        ">
                          Student
                        </th>

                        <th className="
                          py-5
                          px-4
                        ">
                          Status
                        </th>

                        <th className="
                          py-5
                          px-4
                        ">
                          Price
                        </th>

                        <th className="
                          py-5
                          px-4
                        ">
                          Booking Date
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {session.bookings.map(
                        (booking) => (

                        <tr
                          key={booking.id}
                          className="
                            border-b
                            border-gray-200
                            dark:border-white/5

                            hover:bg-gray-100
                            dark:hover:bg-white/10

                            transition
                          "
                        >

                          {/* STUDENT */}

                          <td className="
                            py-5
                            px-4

                            font-bold
                          ">
                            {
                              booking.booked_by
                            }
                          </td>

                          {/* STATUS */}

                          <td className="
                            py-5
                            px-4
                          ">

                            <span className={`
                              px-4
                              py-2

                              rounded-full

                              text-sm

                              font-bold

                              ${
                                booking.status ===
                                "cancelled"

                                ? "bg-red-500/20 text-red-400"

                                : "bg-green-500/20 text-green-400"
                              }
                            `}>

                              {
                                booking.status
                              }

                            </span>

                          </td>

                          {/* PRICE */}

                          <td className="
                            py-5
                            px-4

                            font-black
                          ">
                            ₹{
                              booking.session_price
                            }
                          </td>

                          {/* DATE */}

                          <td className="
                            py-5
                            px-4

                            text-gray-600
                            dark:text-gray-400
                          ">

                            {
                              new Date(
                                booking.booked_at
                              ).toLocaleString()
                            }

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

                {/* PAGINATION */}

                {session.has_next && (

                  <div className="
                    flex
                    justify-center

                    pb-8
                  ">

                    <button
                      onClick={() =>
                        loadNextPage(
                          session.session_id,
                          session.current_page
                        )
                      }
                      className="
                        bg-gradient-to-r
                        from-purple-500
                        to-blue-500

                        text-white

                        px-6
                        py-3

                        rounded-2xl

                        font-black

                        hover:scale-105

                        transition
                      "
                    >
                      Load More
                    </button>

                  </div>

                )}

              </motion.div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default CreatorBookings;