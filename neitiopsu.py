#coding=utf-8
#Database functionality for Neitiopsu
#Copyright 2018 Marko Loponen. All Rights Reserved!

# FILE
import os
# api cherrypy
import cherrypy
import string
import json
import db

@cherrypy.expose
class neitiApi(object):
    
    def GET(self):
        return open('index.html')

    @cherrypy.expose
    def POST(self, var = None):
        #print(json.loads(cherrypy.request.body.read().decode('utf-8'))['courseid'])
        if(var == 'getGradesByCourseId'):
            return json.dumps(db.getGradesByCourseId(json.loads(cherrypy.request.body.read().decode('utf-8'))['courseid']), indent=4, sort_keys=True, default=str)

if __name__ == '__main__':
    current_dir = os.path.dirname(os.path.abspath(__file__))
    conf = {
        '/': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.sessions.on': True
        },
        '/scripts': {'tools.staticdir.on': True,
                    'tools.staticdir.dir': os.path.join(current_dir, 'scripts')},
        '/icons': {'tools.staticdir.on': True,
                      'tools.staticdir.dir': os.path.join(current_dir, 'icons')},
        '/styles': {'tools.staticdir.on': True,
                    'tools.staticdir.dir': os.path.join(current_dir, 'styles')},

    }
    cherrypy.config.update(
        {'server.socket_host': '0.0.0.0', 'server.socket_port': 6009, })
    cherrypy.quickstart(neitiApi(), '/', conf)
