import csv
import pandas as pandas
import pymongo


DATA_DIR = './viscubing_web/data/'
DB_URL = 'mongodb+srv://tyawang:nolhORIc6WYOlk1t@cluster0.ihvp1.mongodb.net/viscubing?retryWrites=true&w=majority'

client = pymongo.MongoClient(DB_URL)
db = client['viscubing']
collection = db["results"]
print("*** Connection Successful ***")

print("*** Reading File... ***")
entries = []

with open(DATA_DIR + 'WCA_export_Results.tsv') as tsv_file:
    readed_tsv = csv.reader(tsv_file, delimiter="\t")
    header = []
    for entry in readed_tsv:
        if not header:
            header = entry
        else:
            entry_dict = {}
            for i in range(len(header)):
                entry_dict[header[i]] = entry[i]
            entries.append(entry_dict)

print("*** Inserting... ***")
res = collection.insert_many(entries)

print("*** Inserting Complete. Result: ***")
print(res)
