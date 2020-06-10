import React from 'react';

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        onChange={({ target }) => setUsername(target.value)}
        value={username}
        name="Username"
      />
    </div>
    <div>
      password
      <input
        type="password"
        onChange={({ target }) => setPassword(target.value)}
        value={password}
        name="Password"
      />
    </div>
    <button type="submit">Login</button>
  </form>
);

export default LoginForm;
