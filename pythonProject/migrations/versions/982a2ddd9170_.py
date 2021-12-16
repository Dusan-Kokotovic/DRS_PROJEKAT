"""empty message

Revision ID: 982a2ddd9170
Revises: a0b5ec786850
Create Date: 2021-12-16 16:49:56.692036

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '982a2ddd9170'
down_revision = 'a0b5ec786850'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_transaction_id', table_name='transaction')
    op.drop_table('transaction')
    op.drop_index('card_number', table_name='card')
    op.drop_index('ix_card_id', table_name='card')
    op.drop_table('card')
    op.drop_index('ix_account_id', table_name='account')
    op.drop_table('account')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('account',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('owner_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('amount', mysql.FLOAT(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], name='account_ibfk_1'),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_index('ix_account_id', 'account', ['id'], unique=False)
    op.create_table('card',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('expiring_date', mysql.DATETIME(), nullable=False),
    sa.Column('card_number', mysql.VARCHAR(length=16), nullable=False),
    sa.Column('pin_code_hash', mysql.VARCHAR(length=256), nullable=False),
    sa.Column('user_name', mysql.VARCHAR(length=20), nullable=False),
    sa.Column('user', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user'], ['user.id'], name='card_ibfk_1'),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_index('ix_card_id', 'card', ['id'], unique=False)
    op.create_index('card_number', 'card', ['card_number'], unique=False)
    op.create_table('transaction',
    sa.Column('id', mysql.VARCHAR(length=256), nullable=False),
    sa.Column('amount', mysql.FLOAT(), nullable=False),
    sa.Column('sender_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('receiver_id', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('datetime', mysql.DATETIME(), nullable=False),
    sa.ForeignKeyConstraint(['receiver_id'], ['user.id'], name='transaction_ibfk_1'),
    sa.ForeignKeyConstraint(['sender_id'], ['user.id'], name='transaction_ibfk_2'),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_index('ix_transaction_id', 'transaction', ['id'], unique=False)
    # ### end Alembic commands ###
