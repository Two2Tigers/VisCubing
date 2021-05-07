import pandas as pd

DATA_DIR = './viscubing_web/src/data/'

def get_best_file(target):
    years = target['year'].unique()
    event_types = target['eventId'].unique()
    grouped_target = target.groupby(['eventId', 'year']).min()
    grouped_target.to_csv(DATA_DIR + 'bests.csv')

if __name__ == '__main__':
    big_guy = pd.read_csv('./viscubing_web/data/' + 'WCA_export_Results.tsv',
                        sep='\t',
                        usecols=['competitionId', 'eventId', 'best', 'average'])
    big_guy['year'] = big_guy.competitionId.str[-4:]
    big_guy = big_guy.drop(columns='competitionId')
    big_guy.loc[big_guy['best'] <= 0, 'best'] = None
    big_guy.loc[big_guy['average'] <= 0, 'average'] = None
    big_guy = big_guy[big_guy.year.str[0] == '2']

    get_best_file(big_guy)
