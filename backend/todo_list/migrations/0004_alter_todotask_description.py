# Generated by Django 3.2 on 2022-07-02 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_list', '0003_auto_20220702_0413'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todotask',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
