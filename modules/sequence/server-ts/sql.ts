import { knex } from '@gqlapp/database-server-ts';

export default class Sequence {
  public sequences() {
    return knex.select();
  }
}
