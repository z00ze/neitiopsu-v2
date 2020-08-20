import mysql.connector
import datetime

#MYSQL DATA
cnx = mysql.connector.connect(user='', database='', password='')
cursor = cnx.cursor(buffered=True)

#BASIC QUERIES
query_getGradesByCourseId = ("SELECT c.name, c.courseid, g.year, g.pass, g.one, g.two, g.three, g.four, g.five, g.fail FROM courses as c, grades as g WHERE c.coursecode = g.coursecode AND c.courseid = %s")

query_getCourses = ("SELECT coursecode FROM courses")

query_saveCourseData = ("INSERT INTO courses (coursecode,name,courseid) VALUES (%s,%s,%s)")

query_saveGradesData = ("INSERT INTO grades (coursecode,pass,one,two,three,four,five,fail,year) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)")


def getGradesByCourseId(courseid):
    print(courseid)
    cursor.execute(query_getGradesByCourseId,(courseid,))
    if(cursor.rowcount > 0):
        data = []
        for name,cid,year,passs,one,two,three,four,five,fail in cursor:
            data.append({"name":name,"courseid":cid,"year":year,"pass":passs,"one":one,"two":two,"three":three,"four":four,"five":five,"fail":fail})
        return data
    else:
        print("no data")
        return ""

def getCourses():
    cursor.execute(query_getCourses)
    if(cursor.rowcount > 0):
        data = []
        for coursecode in cursor:
            data.append(coursecode[0])
        return str(data)
    
def saveCourse(data):
    global cnx
    global cursor
    try:
        cursor.execute(query_saveCourseData,(data['coursecode'],data['name'],data['courseid']))
        cnx.commit()
    except Exception as e:
        print(str(e))
        if cursor and cnx:
            cursor.close()
            cnx.close()
            cnx = mysql.connector.connect(user='neitiopsu', database='neitiopsu', password='1337Neiti1337!!')
            cursor = cnx.cursor(buffered=True)
        
def saveGrades(data):
    global cnx
    global cursor
    try:
        cursor.execute(query_saveGradesData,(data['coursecode'],data['pass'],data['one'],data['two'],data['three'],data['four'],data['five'],data['fail'],data['year']))
        cnx.commit()
    except Exception as e:
        print(str(e))
        if cursor and cnx:
            cursor.close()
            cnx.close()
            cnx = mysql.connector.connect(user='neitiopsu', database='neitiopsu', password='1337Neiti1337!!')
            cursor = cnx.cursor(buffered=True)
