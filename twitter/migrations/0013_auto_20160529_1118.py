# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('twitter', '0012_auto_20160528_1325'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='dob',
            field=models.DateField(),
        ),
    ]
