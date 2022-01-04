from flask import (Flask, render_template, jsonify)
from flask.globals import request
import os
import requests
from flaggart import wiki_flags, analysis, filehandling
from io import BytesIO

DEFAULT_USER_AGENT = 'ProvoGen/development'

requests.utils.default_user_agent = lambda: DEFAULT_USER_AGENT

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    @app.route('/')
    def provogen():
        return render_template('provogen.j2')

    @app.route('/flag-color', methods=['GET'])
    def flagColour():
        print('test')
        placename = request.args.get('placename')
        print(placename)
        wiki_search = wiki_flags.getflagpage(placename)
        pagename = wiki_flags.selectflagpage(placename, wiki_search)
        flagurl = wiki_flags.getflagurl(pagename)
        print(f'url = {flagurl}')
        flagrequest = requests.get(flagurl)
        pil_image = filehandling.pngify(BytesIO(flagrequest.content))
        colors = analysis.getdominantcolors(pil_image)
        print(f"colors = {colors}")
        return jsonify(colors)

    return app