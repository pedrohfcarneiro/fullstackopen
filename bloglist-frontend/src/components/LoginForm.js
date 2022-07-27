const LoginForm = ({handleLogin, credentials, setCredentials}) => {
    console.log(credentials)
    return(
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div>
              username
              <input type='text' value={credentials.username} name='Username' onChange={({target}) => setCredentials({...credentials, username: target.value})}/>
            </div>
            <div>
              password
              <input type='password' value={credentials.password} name='Password' onChange={({target}) => setCredentials({...credentials, password: target.value})} />
            </div>
            <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  export default LoginForm