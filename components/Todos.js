import { MdLibraryAddCheck } from 'react-icons/md'
import { FaTrashAlt } from 'react-icons/fa'
import { v4 } from 'uuid'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../FIRE.config'

const Todos = ({ list }) => {
  return (
    <>
      {list.map((todo) => (
        <article
          key={todo.id}
          className="flex mb-3 items-center justify-between px-3 py-5 bg-zinc-300 border border-black rounded-xl space-x-3"
        >
          <div>
            <h2 className="text-lg font-bold">{todo.todo}</h2>
          </div>

          <div className="space-x-0 md:space-x-3 flex flex-col md:flex-row space-y-2 md:space-y-0">
            <button className="border border-black p-2 hover:bg-zinc-200 rounded-xl bg-slate-300">
              <MdLibraryAddCheck className="text-2xl" />
            </button>
            <button
              onClick={() => {
                deleteDoc(doc(db, 'Todos', todo.id))
              }}
              className="border border-black p-2 hover:bg-zinc-200 rounded-xl bg-slate-300"
            >
              <FaTrashAlt className="text-2xl" />
            </button>
          </div>
        </article>
      ))}
    </>
  )
}

export default Todos
