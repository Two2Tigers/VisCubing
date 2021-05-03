import pandas as pd

print('start reading file')
big_guy = pd.read_csv('WCA_export_Results.tsv',
                      sep='\t')
print('reading complete')

big_guy.loc[big_guy['eventId'] == '333mbo'].to_csv('333mbo.csv')

