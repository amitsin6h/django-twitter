# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('twitter', '0008_auto_20160522_1826'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Photo',
        ),
    ]
