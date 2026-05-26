import {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import toast from "react-hot-toast";

import {
  motion,
} from "framer-motion";

const MyBookings = () => {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const [hasNext, setHasNext] =
    useState(false);

  useEffect(() => {

    fetchBookings(page);

  }, [page]);

  const fetchBookings = async (
    currentPage
  ) => {

    try {

      const res =
        await API.get(

          `/bookings/my-bookings/?page=${currentPage}`

        );

      setBookings(
        res.data.bookings
      );

      setHasNext(
        res.data.has_next
      );

    } catch (error) {

      toast.error(
        "Failed to load bookings"
      );

    } finally {

      setLoading(false);
    }
  };

  const handleCancelBooking = async (
    bookingId
  ) => {

    try {

      await API.delete(

        `/bookings/cancel/${bookingId}/`

      );

      toast.success(
        "Booking cancelled"
      );

      fetchBookings(page);

    } catch (error) {

      toast.error(
        "Cancel failed"
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
          mb-10
        ">

          <h1 className="
            text-4xl
            md:text-6xl

            font-black

            mb-4
          ">
            My Bookings
          </h1>

          <p className="
            text-gray-600
            dark:text-gray-400

            text-base
            md:text-lg
          ">
            All your booked mentorship sessions
          </p>

        </div>

        {/* EMPTY */}

        {bookings.length === 0 ? (

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
              No bookings yet
            </h2>

          </div>

        ) : (

          <>
            {/* TABLE */}

            <div className="
              overflow-x-auto

              bg-white

              dark:bg-white/5

              border
              border-gray-300
              dark:border-white/10

              rounded-3xl

              backdrop-blur-xl

              shadow-2xl

              transition
            ">

              <table className="
                w-full

                min-w-[900px]

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
                      px-6
                    ">
                      Session
                    </th>

                    <th className="
                      py-5
                      px-6
                    ">
                      Creator
                    </th>

                    <th className="
                      py-5
                      px-6
                    ">
                      Price
                    </th>

                    <th className="
                      py-5
                      px-6
                    ">
                      Status
                    </th>

                    <th className="
                      py-5
                      px-6
                    ">
                      Date
                    </th>

                    <th className="
                      py-5
                      px-6
                    ">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {bookings.map(
                    (booking) => (

                    <motion.tr
                      key={booking.id}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      className="
                        border-b
                        border-gray-200
                        dark:border-white/5

                        hover:bg-gray-100
                        dark:hover:bg-white/10

                        transition
                      "
                    >

                      {/* SESSION */}

                      <td className="
                        py-5
                        px-6
                      ">

                        <div className="
                          flex
                          items-center
                          gap-4
                        ">

                          <img
                            src={
                              booking.session_image
                            }
                            alt={
                              booking.session_title
                            }
                            className="
                              w-20
                              h-16

                              rounded-xl

                              object-cover
                            "
                          />

                          <div>

                            <h2 className="
                              font-bold

                              text-lg
                            ">
                              {
                                booking.session_title
                              }
                            </h2>

                          </div>

                        </div>

                      </td>

                      {/* CREATOR */}

                      <td className="
                        py-5
                        px-6
                      ">
                        {
                          booking.creator_name
                        }
                      </td>

                      {/* PRICE */}

                      <td className="
                        py-5
                        px-6

                        font-bold
                      ">
                        ₹{
                          booking.session_price
                        }
                      </td>

                      {/* STATUS */}

                      <td className="
                        py-5
                        px-6
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

                          {booking.status}

                        </span>

                      </td>

                      {/* DATE */}

                      <td className="
                        py-5
                        px-6

                        text-gray-500
                        dark:text-gray-400
                      ">

                        {
                          new Date(
                            booking.booked_at
                          ).toLocaleString()
                        }

                      </td>

                      {/* ACTION */}

                      <td className="
                        py-5
                        px-6
                      ">

                        {booking.status !==
                        "cancelled" && (

                          <button
                            onClick={() =>
                              handleCancelBooking(
                                booking.id
                              )
                            }
                            className="
                              bg-red-500

                              hover:bg-red-600

                              text-white

                              px-5
                              py-2

                              rounded-xl

                              font-bold

                              transition
                            "
                          >
                            Cancel
                          </button>

                        )}

                      </td>

                    </motion.tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* PAGINATION */}

            <div className="
              flex
              justify-center

              gap-4

              mt-10
            ">

              {page > 1 && (

                <button
                  onClick={() =>
                    setPage(page - 1)
                  }
                  className="
                    bg-gradient-to-r
                    from-gray-800
                    to-black

                    dark:from-white
                    dark:to-gray-300

                    text-white
                    dark:text-black

                    px-6
                    py-3

                    rounded-2xl

                    font-bold

                    hover:scale-105

                    transition
                  "
                >
                  Previous
                </button>

              )}

              {hasNext && (

                <button
                  onClick={() =>
                    setPage(page + 1)
                  }
                  className="
                    bg-gradient-to-r
                    from-purple-500
                    to-blue-500

                    text-white

                    px-6
                    py-3

                    rounded-2xl

                    font-bold

                    hover:scale-105

                    transition
                  "
                >
                  Next
                </button>

              )}

            </div>

          </>

        )}

      </div>

    </div>
  );
};

export default MyBookings;