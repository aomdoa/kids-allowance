# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_auto_20150615_0214'),
    ]

    operations = [
        migrations.CreateModel(
            name='AccountOperation',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('last_applied', models.DateField(verbose_name='Last Applied', default=django.utils.timezone.now)),
                ('account', models.ForeignKey(to='accounts.Account')),
            ],
        ),
        migrations.RemoveField(
            model_name='recurance',
            name='account',
        ),
        migrations.RemoveField(
            model_name='recurance',
            name='last_applied',
        ),
        migrations.AddField(
            model_name='accountoperation',
            name='recurance',
            field=models.ForeignKey(to='accounts.Recurance'),
        ),
    ]
