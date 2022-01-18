from flask import Flask, render_template, request, url_for, redirect, session, escape

import data_manager

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    message = ''
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = data_manager.login(username, password)[0]
        if user.username:
            session['username'] = user.username
            return redirect('/')
        else:
            message = 'Invalid username or password'
    return render_template('login.html', message=message)


if __name__ == '__main__':
    app.run(
        debug=True,
        port=8000,
        host='0.0.0.0'
    )