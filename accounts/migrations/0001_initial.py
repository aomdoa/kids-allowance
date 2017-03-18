# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('name', models.CharField(max_length=200)),
                ('balance', models.DecimalField(max_digits=10, decimal_places=2)),
            ],
        ),
        migrations.CreateModel(
            name='Child',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Recurance',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('name', models.CharField(max_length=200)),
                ('type', models.CharField(max_length=1, choices=[('I', 'Interest'), ('A', 'Allowance')])),
                ('frequency', models.CharField(max_length=1, choices=[('Y', 'Yearly'), ('M', 'Monthly'), ('B', 'Bi-Weekly'), ('W', 'Weekly'), ('D', 'Daily')])),
                ('applies', models.CharField(max_length=1, choices=[('MO', 'Monday'), ('TU', 'Tuesday'), ('WE', 'Wednesday'), ('TH', 'Thursday'), ('FR', 'Friday'), ('SA', 'Saturday'), ('SU', 'Sunday'), ('FD', 'First Day'), ('LD', 'Last Day'), ('MD', 'Mid Month')])),
                ('value', models.DecimalField(max_digits=6, decimal_places=2)),
                ('last_applied', models.DateField()),
                ('account', models.ForeignKey(to='accounts.Account')),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('description', models.CharField(max_length=200)),
                ('amount', models.DecimalField(max_digits=10, decimal_places=2)),
                ('account', models.ForeignKey(to='accounts.Account')),
            ],
        ),
        migrations.AddField(
            model_name='account',
            name='owner',
            field=models.ForeignKey(to='accounts.Child'),
        ),
    ]
