 
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/context/firebaseAuth/firebaseConfig"
import { useState } from "react"
import { useRouter } from 'next/router'


function Login(){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  
  const router = useRouter()
    const handleLogin = async (event) => {
      event?.preventDefault();
      try {
        const data = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        console.log("data",data)
        if (!data || !data.user || !auth.currentUser) {
          return
        }
        router.push("/")

      } catch (error) {
        alert("Invalid Credentials login failed")
        console.log(error)
      }
    }
    
  return (
      <>
      <main className="vh-100 vw-100 d-flex justify-content-center align-items-center" >
        <div className="card  w-50 h-50">
          <form className="p-5 ">
            <h1 className="h3 mb-3 text-center">Please sign in</h1>
  
            <div className="form-group p-2">
              <label htmlFor="email">Email: </label>
              <input type="email" className="form-control" id="groupInput" placeholder="Enter your email" required  onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div className="form-group p-2">
              <label htmlFor="password"> Password: </label>
              <input type="password" className="form-control" id="groupPassword" placeholder="Password" required onChange={(event) => setPassword(event.target.value)} />
            </div>
  
            {/* <div className="mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div> */}
            <div className=" d-flex justify-content-center ">

              <button className="w-50 btn btn-lg btn-primary " type="submit" onClick={handleLogin} style={{backgroundColor:'rgb(27, 99, 53)'}} >Log In </button>
            </div>
          </form>
        </div>
      </main>

    </>
  )
}



export default Login;