# Generated by Django 3.2 on 2022-07-02 10:10

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_list', '0005_alter_todotask_limit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todotask',
            name='limit',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
