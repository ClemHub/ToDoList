# Generated by Django 3.2 on 2022-07-02 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_list', '0008_alter_todotask_limit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todotask',
            name='limit',
            field=models.DateField(),
        ),
    ]