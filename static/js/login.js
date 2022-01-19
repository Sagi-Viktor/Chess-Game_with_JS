const container = document.querySelector('div#login');
container.innerHTML = `
<form id="login-form" method="post">
    <label for="username">Username</label>
    <input name="username" id="username" type="text" placeholder="Enter Your username">
    <label for="password">Password</label>
    <input name="password" id="password" type="password" placeholder="Enter Your password">
    <button type="submit">Login</button>
</form>
`