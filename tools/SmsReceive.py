#!/usr/bin/python

import urllib,httplib,sys,codecs

INBOX="/var/spool/gammu/inbox/"


text="ceci un sms de test"
number="0638015943"

f=codecs.open(INBOX+sys.argv[1],"r","utf-16")
text = f.read()
f.close()

params = urllib.urlencode({'number':number,'txt':text.encode('utf-8')})
headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}
conn = httplib.HTTPConnection("vox.bype.org")
conn.request("POST", "/newTxt", params, headers)
response = conn.getresponse()
conn.close()
if response.status == 200:
        sys.exit(0)
else:
        sys.exit(response.status)


