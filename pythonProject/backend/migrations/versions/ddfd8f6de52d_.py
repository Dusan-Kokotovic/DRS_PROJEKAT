"""empty message

Revision ID: ddfd8f6de52d
Revises: 
Create Date: 2022-01-24 13:47:17.775646

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ddfd8f6de52d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('coin',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('extern_api_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_coin_extern_api_id'), 'coin', ['extern_api_id'], unique=False)
    op.create_index(op.f('ix_coin_id'), 'coin', ['id'], unique=False)
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.Column('last_name', sa.String(length=30), nullable=False),
    sa.Column('password_hash', sa.String(length=256), nullable=False),
    sa.Column('address', sa.String(length=35), nullable=False),
    sa.Column('city', sa.String(length=20), nullable=False),
    sa.Column('country', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.Column('phone', sa.String(length=12), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_index(op.f('ix_user_id'), 'user', ['id'], unique=False)
    op.create_table('account',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_account_id'), 'account', ['id'], unique=False)
    op.create_table('card',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('expiring_date', sa.DateTime(), nullable=False),
    sa.Column('card_number', sa.String(length=19), nullable=False),
    sa.Column('pin_code_hash', sa.String(length=256), nullable=False),
    sa.Column('user', sa.Integer(), nullable=True),
    sa.Column('user_name', sa.String(length=20), nullable=False),
    sa.ForeignKeyConstraint(['user'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_card_id'), 'card', ['id'], unique=False)
    op.create_table('coin_user_association',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('coin_id', sa.Integer(), nullable=True),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['coin_id'], ['coin.id'], ),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_coin_user_association_id'), 'coin_user_association', ['id'], unique=False)
    op.create_table('transaction',
    sa.Column('base_id', sa.Integer(), nullable=False),
    sa.Column('id', sa.String(length=256), nullable=True),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=True),
    sa.Column('receiver_id', sa.Integer(), nullable=True),
    sa.Column('datetime', sa.DateTime(), nullable=False),
    sa.Column('transaction_state', sa.String(length=7), nullable=False),
    sa.ForeignKeyConstraint(['receiver_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('base_id')
    )
    op.create_index(op.f('ix_transaction_base_id'), 'transaction', ['base_id'], unique=False)
    op.create_index(op.f('ix_transaction_id'), 'transaction', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_transaction_id'), table_name='transaction')
    op.drop_index(op.f('ix_transaction_base_id'), table_name='transaction')
    op.drop_table('transaction')
    op.drop_index(op.f('ix_coin_user_association_id'), table_name='coin_user_association')
    op.drop_table('coin_user_association')
    op.drop_index(op.f('ix_card_id'), table_name='card')
    op.drop_table('card')
    op.drop_index(op.f('ix_account_id'), table_name='account')
    op.drop_table('account')
    op.drop_index(op.f('ix_user_id'), table_name='user')
    op.drop_table('user')
    op.drop_index(op.f('ix_coin_id'), table_name='coin')
    op.drop_index(op.f('ix_coin_extern_api_id'), table_name='coin')
    op.drop_table('coin')
    # ### end Alembic commands ###
