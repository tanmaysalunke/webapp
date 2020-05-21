from flask import Flask, render_template, request, json,redirect,session
from flaskext.mysql import MySQL
from werkzeug.security import generate_password_hash,check_password_hash

mysql = MySQL()
app = Flask(__name__)
app.secret_key = 'why would I tell you my secret key?'


# MySQL configurations

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'aaaaa'
app.config['MYSQL_DATABASE_DB'] = 'webtest'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)


@app.route('/')
def main():
    return render_template('homepage.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/portal')
def showsignup():
    return render_template('signup.html')

@app.route('/teachersign')
def teachersign():
    return render_template('teacher_signup.html')

@app.route('/dashboard')
def dashboard():
    if session.get('user'):
        return render_template('dashboard.html')
    else:
        return render_template('error.html',error = 'Unauthorized Access')

@app.route('/teacherportal')
def dashboard1():
    if session.get('user'):
        return render_template('teacher_home.html')
    else:
        return render_template('error.html',error = 'Unauthorized Access')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/logout')
def logout():
    session.pop('user',None)
    return redirect('/')

@app.route('/signup', methods=['POST'])
def signup():
    try:
        _moodleid = request.form['inputMoodle']
        _name = request.form['inputName']
        _password = request.form['inputPassword']

        if _name and _moodleid and _password:
            conn = mysql.connect()
            cursor = conn.cursor()
            _hashed_password = generate_password_hash(_password)
            cursor.callproc('sp_createUser', (_moodleid, _name, _hashed_password))
            data = cursor.fetchall()

            if len(data) is 0:
                conn.commit()
                return json.dumps({'message': 'User created successfully !'})
            else:
                return json.dumps({'error': str(data[0])})
        else:
            return json.dumps({'html': '<span>Enter the required fields</span>'})

    except Exception as e:
        return json.dumps({'error': str(e)})
    finally:
        cursor.close()
        conn.close()

@app.route('/validatestudentlogin',methods=['POST'])
def validatestudentlogin():
    try:
        _moodleid = request.form['inputMoodle']
        _password = request.form['inputPassword']        


        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('sp_validateLogin',(_moodleid,))
        data = cursor.fetchall()

        username=data[0][1]

        if len(data) > 0:
            if check_password_hash(str(data[0][2]),_password):
                session['user'] = data[0][0]
                return render_template('dashboard.html', moodleid= username)
            else:
                return render_template('error.html',error = 'Invalid Moodle ID or  wrong Password.')
        else:
            return render_template('error.html',error = 'Invalid Moodle ID or wrong Password.')
            

    except Exception as e:
        return render_template('error.html',error = str(e))
    finally:
        cursor.close()
        con.close()


@app.route('/teachersignup', methods=['POST'])
def teachersignup():
    try:
        _teacherid = request.form['inputTeacherID']
        _name = request.form['inputName']
        _password = request.form['inputPassword1']

        if _name and _teacherid and _password:

            conn1 = mysql.connect()
            cursor1 = conn1.cursor()
            _hashed_password = generate_password_hash(_password)
            cursor1.callproc('sp_createTeacher', (_teacherid, _name, _hashed_password))
            data = cursor1.fetchall()

            if len(data) is 0:
                conn1.commit()
                return json.dumps({'message': 'User created successfully !'})
            else:
                return json.dumps({'error': str(data[0])})
        else:
            return json.dumps({'html': '<span>Enter the required fields</span>'})

    except Exception as e:
        return json.dumps({'error': str(e)})
    finally:
        cursor1.close()
        conn1.close()


@app.route('/validateteacherlogin',methods=['POST'])
def validateteacherlogin():
    try:
        _teacherid = request.form['inputTeacher']
        _password = request.form['inputPassword1']        


        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('sp_validateTeacherLogin',(_teacherid,))
        data = cursor.fetchall()
        
        username = data[0][1]


        if len(data) > 0:
            if check_password_hash(str(data[0][2]),_password):
                session['user'] = data[0][0]
                return render_template('teacher_home.html', moodleid= username)
            else:
                return render_template('error.html',error = 'Invalid Moodle ID or  wrong Password.')
        else:
            return render_template('error.html',error = 'Invalid Moodle ID or wrong Password.')
            

    except Exception as e:
        return render_template('error.html',error = str(e))
    finally:
        cursor.close()
        con.close()


if __name__ == "__main__":
	app.debug=True
	app.run(host='127.0.0.1')



