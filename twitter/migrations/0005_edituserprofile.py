# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('twitter', '0004_auto_20160519_1707'),
    ]

    operations = [
        migrations.CreateModel(
            name='EditUserProfile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.TextField(max_length=120)),
                ('dob', models.DateTimeField()),
                ('profile_pic', models.ImageField(upload_to='profile_pic/user')),
            ],
        ),
    ]
