import Head from 'next/head'
import { useState, useEffect } from 'react'
import Todos from '../components/Todos'
import { db } from '../FIRE.config'
import {
  collection,
  doc,
  getDocs,
  addDoc,
  query,
  onSnapshot,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [todos, setTodos] = useState([])

  const todosColl = collection(db, 'Todos')

  useEffect(() => {
    setLoading(true)
    onSnapshot(todosColl, async () => {
      const data = await getDocs(query(todosColl, orderBy('timestamp', 'desc')))
      setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
    setLoading(false)
  }, [])

  const addItem = async (e) => {
    e.preventDefault()

    await addDoc(todosColl, {
      todo: userInput,
      timestamp: serverTimestamp(),
    })
    //* setTodos([userInput, ...todos]) ---- Change list via local state. Lose updates upon refresh. *//

    setUserInput('')
  }

  const removeItem = {}

  const completeItem = {}

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gradient-to-br from-zinc-700 via-black to-cyan-600 min-h-screen p-7">
        <h1 className="md:text-4xl text-3xl p-7 max-w-7xl mx-auto font-extrabold text-white">
          My ToDo List
        </h1>
        <form className="flex flex-col md:flex-row space-y-3 md:space-y-0 pb-5 mx-auto items-center max-w-7xl justify-between space-x-4">
          <input
            className="flex-1 rounded text-2xl py-3 px-2"
            type="text"
            name="toDoInput"
            id="TDI"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
          <button
            disabled={userInput.length === 0}
            onClick={addItem}
            className=" text-2xl font-bold bg-zinc-300 hover:bg-zinc-300/80 px-7 py-3 rounded disabled:hover:cursor-not-allowed disabled:text-black/30 disabled:hover:bg-zinc-300"
          >
            Add Item
          </button>
        </form>

        <section className="text-lg px-2 py-5 font-light bg-slate-300/30 backdrop-blur-sm boarder border-black max-w-6xl mx-auto rounded-xl">
          {loading ? (
            <h2 className="text-lg font-bold px-3 py-5 bg-zinc-300 border border-black rounded-xl">
              Loading...
            </h2>
          ) : todos.length === 0 ? (
            <h2 className="text-lg font-bold px-3 py-5 bg-zinc-300 border border-black rounded-xl">
              No ToDos Right Now...
            </h2>
          ) : (
            <Todos list={todos} />
          )}
        </section>
      </main>
    </>
  )
}

export default Home
