# Generated by Django 4.0.6 on 2022-10-19 19:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_alter_order_details_order_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='createdTime',
            field=models.DateField(auto_now_add=True),
        ),
    ]
