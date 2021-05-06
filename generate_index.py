import os

FILE_DIR = 'viscubing_web/src/data/'

names = []
for f in os.listdir(FILE_DIR):
    if f.endswith(".csv"): 
        names.append(f.split('.')[0])

with open(FILE_DIR + 'index.js', 'w') as index:
    for name in names:
        index.write(f'import {name} from "./{name}.csv"\n')
    index.write('const index = {\n')
    for name in names:
        index.write(f'\t{name}: {name},\n')
    index.write('}\nexport default index;')
