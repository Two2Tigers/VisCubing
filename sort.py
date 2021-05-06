import pandas as pd

DATA_DIR = './data/'

print('start reading file')
big_guy = pd.read_csv(DATA_DIR + 'original/' + 'WCA_export_Results.tsv',
                      sep='\t')
print('reading complete')

big_guy.loc[big_guy['eventId'] == '333mbo'].to_csv(DATA_DIR + 'processed/' + '333mbo.csv')
