"""empty message

Revision ID: 425d088a6401
Revises: 880808fb54ef
Create Date: 2021-12-16 16:39:13.848207

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '425d088a6401'
down_revision = '880808fb54ef'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('card_ibfk_1', 'card', type_='foreignkey')
    op.drop_column('card', 'user')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('card', sa.Column('user', mysql.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('card_ibfk_1', 'card', 'user', ['user'], ['id'])
    # ### end Alembic commands ###