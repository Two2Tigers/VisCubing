import pandas as pd
import os
import glob

DATA_DIR = './viscubing_web/data/'


def export_files(target, clear=False):
    if clear:
        files = glob.glob(DATA_DIR + 'processed/*')
        for f in files:
            os.remove(f)
    years = target['year'].unique()
    modes = ['average', 'best']
    for m in modes:
        for k in range(len(years)):
            # select each year
            print("*** now exporting:", years[k], m)
            data_each_year = target.loc[target['year'] == years[k]]

            # groupby and choose the min
            data_each_year_gp = data_each_year.groupby(['personId', 'eventId'])
            to_export = data_each_year.loc[data_each_year_gp[m].idxmin()]
            if m == 'average':
                to_export.drop(columns=['best', 'personId', 'year'], inplace=True)
                to_export.rename(columns={'average': 'time'}, inplace=True)
            else:
                to_export.drop(columns=['average', 'personId', 'year'], inplace=True)
                to_export.rename(columns={'best': 'time'}, inplace=True)
            to_export.to_csv(DATA_DIR + 'processed/' + years[k] + '_' + m + '.csv', index=False)

            # sort
            df = pd.read_csv(DATA_DIR + 'processed/' + years[k] + '_' + m + '.csv')
            df.sort_values(by=['eventId', 'time'],
                        inplace=True, ignore_index=True)
            df.drop(df[df['time'] == 999999].index, inplace=True)
            df.reset_index(drop=True, inplace=True)
            df.to_csv(DATA_DIR + 'processed/' + years[k] + '_' + m + '.csv')


def export_single(target, clear=False):
    modes = ['average', 'best']
    if clear:
        files = glob.glob(DATA_DIR + 'processed/*')
        for f in files:
            os.remove(f)
    target.to_csv(DATA_DIR + 'processed/' + 'data.csv')


if __name__ == '__main__':
    big_guy = pd.read_csv(DATA_DIR + 'WCA_export_Results.tsv',
                        sep='\t',
                        usecols=['competitionId', 'personId', 'personCountryId', 'eventId', 'best', 'average'])
    big_guy['year'] = big_guy.competitionId.str[-4:]
    big_guy = big_guy.drop(columns='competitionId')
    big_guy.loc[big_guy['average'] <= 0, 'average'] = 999999
    big_guy.loc[big_guy['best'] <= 0, 'best'] = 999999
    big_guy = big_guy[big_guy.year.str[0] == '2']

    export_files(big_guy, clear=True)
