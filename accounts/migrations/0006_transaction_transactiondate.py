# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20150616_0024'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='transactionDate',
            field=models.DateField(verbose_name='Transaction Date', default=django.utils.timezone.now),
        ),
    ]
