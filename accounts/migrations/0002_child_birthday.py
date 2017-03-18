# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='child',
            name='birthday',
            field=models.DateField(verbose_name='Birthday', default=datetime.datetime(2015, 6, 15, 2, 2, 42, 680909)),
        ),
    ]
