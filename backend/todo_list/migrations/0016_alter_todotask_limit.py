# Generated by Django 3.2 on 2022-07-04 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_list', '0015_alter_todotask_limit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todotask',
            name='limit',
            field=models.DateField(blank=True, default='04/07/2022'),
        ),
    ]
