import pandas as pd

# read file
print('start reading file')
big_guy = pd.read_csv('WCA_export_Results.tsv',
                      sep='\t',
                      usecols=['competitionId', 'personId', 'personCountryId', 'eventId', 'best', 'average'])
print('reading complete')
big_guy['year'] = big_guy.competitionId.str[-4:]
big_guy = big_guy.drop(columns='competitionId')
big_guy.loc[big_guy['average'] <= 0, 'average'] = 999999
big_guy.loc[big_guy['best'] <= 0, 'best'] = 999999

years = big_guy['year'].unique()
modes = ['average', 'best']
for m in modes:
    for k in range(len(years)):
        # select each year
        print(years[k], m)
        data_each_year = big_guy.loc[big_guy['year'] == years[k]]

        # groupby and choose the min
        data_each_year_gp = data_each_year.groupby(['personId', 'eventId'])
        to_export = data_each_year.loc[data_each_year_gp[m].idxmin()]
        if m == 'average':
            to_export.drop(columns=['best', 'personId', 'year'], inplace=True)
            to_export.rename(columns={'average': 'time'}, inplace=True)
        else:
            to_export.drop(columns=['average', 'personId', 'year'], inplace=True)
            to_export.rename(columns={'best': 'time'}, inplace=True)
        to_export.to_csv(years[k] + '_' + m + '.csv', index=False)

        # sort
        df = pd.read_csv(years[k] + '_' + m + '.csv')
        df.sort_values(by=['eventId', 'time'],
                       inplace=True, ignore_index=True)
        df.drop(df[df['time'] == 999999].index, inplace=True)
        df.reset_index(drop=True, inplace=True)
        df.to_csv(years[k] + '_' + m + '.csv')
