import { useAuth } from "../hooks/useAuth"

const Test = () => {

     const { increment, setIncrement} = useAuth();
  return (
    <div>
      <p> count = {increment}</p>
      <button onClick={() => setIncrement((prev) => prev + 1)}>increment</button>
    </div>
  )
}

export default Test
