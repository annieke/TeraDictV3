import requests 
import json 

import panlex_python_API.examples

r = requests.post('http://api.panlex.org/lv', data = json.dumps({}))
data = r.json()

print(data["result"][0])

print(translate("hello", eng-000, eng-000))
# FIX THE IMPORT STATEMENTS!!!! 
