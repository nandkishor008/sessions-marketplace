import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const SessionCard = ({ session }) => {

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-xl
      "
    >

      <img
        src={session.image}
        alt={session.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-2">
          {session.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {session.description}
        </p>

        <div className="flex justify-between mb-4">

          <span className="font-bold text-xl">
            ₹{session.price}
          </span>

          <span>
            {session.duration} mins
          </span>

        </div>

        <div className="flex justify-between items-center">

          <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
            {session.category}
          </span>

          <span className="text-gray-500">
            by {session.creator_name}
          </span>

        </div>

        <Link to={`/sessions/${session.id}`}>

          <button
            className="
              w-full
              mt-6
              bg-black
              text-white
              py-3
              rounded-2xl
            "
          >
            View Details
          </button>

        </Link>

      </div>

    </motion.div>
  );
};

export default SessionCard;