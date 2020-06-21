import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPriceColumnInOrdersProducts1592709587101
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders_products',
      new TableColumn({
        name: 'price',
        type: 'decimal',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders_products', 'price');
  }
}
