import sqlite3
import json
from flask import Flask, request, session, g, redirect, url_for, abort, render_template, flash, escape, Markup
from contextlib import closing
from datetime import datetime

# configuration
DATABASE = '/tmp/flaskr.db'
DEBUG = True
SECRET_KEY = 'development key'
USERNAME = 'admin'
PASSWORD = 'default'

app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_envvar('FLASKR_SETTINGS', silent=True)


@app.before_request
def before_request():
	g.db = connect_db()


def connect_db():
	return sqlite3.connect(app.config['DATABASE'])


def init_db():
    with closing(connect_db()) as db:
        with app.open_resource('schema.sql') as f:
            db.cursor().executescript(f.read().decode('utf-8'))
            db.commit()


@app.after_request
def after_request(response):
    g.db.close()
    return response


#view
@app.route('/')
def show_fields():
    cur = g.db.execute('select id, name, commodity, memo from fields order by id desc')
    fields = [dict(id=row[0], name=row[1], commodity=row[2], memo=row[3]) for row in cur.fetchall()]
    # cur = g.db.execute('select name, memo from fields order by id desc')
    # fields = [dict(name=row[0], memo=row[1]) for row in cur.fetchall()]
    # return render_template('show_fields.html', fields=fields)

    cur = g.db.execute('select id, lat, lng from latlng order by id desc')
    # cur = g.db.execute('select id, lat from latlng order by id desc')
    latlng = [dict(id=row[0], lat=row[1], lng=row[2]) for row in cur.fetchall()]
    # latlng = [dict(id=row[0], lat=row[1]) for row in cur.fetchall()]

    return render_template('show_fields.html', fields= fields, latlng=latlng)

# @app.route('/add')
# def add():
#     return render_template('add.html')


@app.route('/add_fields', methods=['POST'])
def add_fields():
    if not session.get('logged_in'):
        abort(401)

    # cur = g.db.execute("select EXISTS(select id from fields order by id desc)")
    # if cur.fetchone():
    # c = g.db.execute('select id from fields order by id desc')
    # result = c.fetchall()
    # c = g.db.execute('select max(id) from fields')
    c = g.db.execute('select count(*) from fields')
    result = c.fetchone()
    if result:
        hoge = result[0]+1
    else:
        hoge = 1

    g.db.execute('insert into fields (id, name, commodity, memo) values (?, ?, ?, ?)',
                 [hoge, request.form['name'], request.form['commodity'], request.form['memo']])
    # g.db.execute('insert into fields (name, commodity, memo) values (?, ?, ?)',
    #              [request.form['name'], request.form['commodity'], request.form['memo']])
    # g.db.execute('insert into fields (name, memo) values (?, ?)',
    #              [request.form['name'], request.form['memo']])

    latlng_list = json.loads(request.form['latlng'])
    for i in latlng_list:
        g.db.execute('insert into latlng (id, lat, lng) values (?, ?, ?)', [hoge,float(i[0]), float(i[1])])
        # g.db.execute('insert into latlng (lat, lng) values (?, ?)', [float(i[0]), float(i[1])])
        # g.db.execute('insert into latlng (lat) values (?)', [float(i)])
        # g.db.execute('insert into latlng (lat) values (?)', [i])

    g.db.commit()

    # flash('New entry was successfully posted')
    return redirect(url_for('show_fields'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != app.config['USERNAME']:
            error = 'Invalid username'
        elif request.form['password'] != app.config['PASSWORD']:
            error = 'Invalid password'
        else:
            session['logged_in'] = True
            flash('You were logged in')
            return redirect(url_for('show_fields'))
    return render_template('login.html', error=error)


@app.route('/map')
def show_map():
    cur = g.db.execute('select id, name, commodity, memo from fields order by id desc')
    fields = [dict(id=row[0], name=row[1], commodity=row[2], memo=row[3]) for row in cur.fetchall()]

    cur = g.db.execute('select id, lat, lng from latlng order by id desc')
    latlng = [dict(id=row[0], lat=row[1], lng=row[2]) for row in cur.fetchall()]

    return render_template('map.html', fields= fields, latlng=latlng)
    # return render_template('map.html')


@app.route('/play')
def show_play():
    return render_template('play.html')


@app.route('/pop')
def show_pop():
    return render_template('pop.html')

# @app.route('/add_plays', methods=['POST'])
# def add_plays():
#     if not session.get('logged_in'):
#         abort(401)
#     # 配列に戻す？
#
#     # 配列内から
#     for lat, lng in request.form['latlng']
#         g.db.execute('insert into latlng (lat, lng) values (?, ?)',lat, lng)
#     g.db.commit()
#
#     return redirect(url_for('show_play'))



if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=True)
