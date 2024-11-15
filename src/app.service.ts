import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    //@Inject('API_KEY') private apiKey: string,
    @Inject('PG') private clientPg: Client,
    @Inject('TASK') private task: any,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dataBase = this.configService.database.name;
    return `Hello World!  AK=> ${apiKey}  DB=>  ${dataBase}  `;
  }

  getTask() {
    return new Promise((resolve, rejects) => {
      this.clientPg.query('Select * from tasks', (err, res) => {
        if (err) {
          rejects(err);
          console.error(err);
        }
        resolve(res.rows);
        console.log(res.rows);
      });
    });
  }
}
