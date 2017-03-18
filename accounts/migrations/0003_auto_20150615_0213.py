# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_child_birthday'),
    ]

    operations = [
        migrations.AlterField(
            model_name='child',
            name='birthday',
            field=models.DateField(default=datetime.datetime(2015, 6, 15, 2, 13, 26, 332693), verbose_name='Birthday'),
        ),
        migrations.AlterField(
            model_name='recurance',
            name='applies',
            field=models.CharField(choices=[('MO', 'Monday'), ('TU', 'Tuesday'), ('WE', 'Wednesday'), ('TH', 'Thursday'), ('FR', 'Friday'), ('SA', 'Saturday'), ('SU', 'Sunday'), ('FD', 'First Day'), ('LD', 'Last Day'), ('MD', 'Mid Month')], max_length=2),
        ),
    ]
