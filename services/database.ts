import * as SQLite from 'expo-sqlite';

export default class Database {
    private db: SQLite.WebSQLDatabase;

    constructor() {
        this.db = SQLite.openDatabase('test.db');
    }

    createTable() {
        this.db.transaction(tx => {
            tx.executeSql(
                'create table if not exists test_table (id integer primary key not null, data text not null);'
            );
        });
    }

    insertData(data: string) {
        this.db.transaction(tx => {
            tx.executeSql(
                'insert into test_table (data) values (?);',
                [data]
            );
        });
    }

    delete(id: number) {
        this.db.transaction(tx => {
            tx.executeSql(
                'delete from test_table where id = ?;',
                [id]
            );
        });
    }

    update(id: number, data: string) {
        this.db.transaction(tx => {
            tx.executeSql(
                'update test_table set data = ? where id = ?;',
                [data, id]
            );
        });
    }

    getData(): Promise<SQLite.SQLResultSet> {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx: any) => {
                tx.executeSql(
                    'select * from test_table;',
                    [],
                    (_: any, result: SQLite.SQLResultSet | PromiseLike<SQLite.SQLResultSet>) => {
                        resolve(result);
                    },
                    (_: any, error: any) => {
                        reject(error);
                    }
                );
            });
        });
    }
}

