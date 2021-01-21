# Generated by Django 3.1.5 on 2021-01-21 14:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FinancialNews',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('publisher', models.IntegerField(choices=[(1, 'Bloomberg'), (2, 'Roeuter')])),
                ('title', models.CharField(max_length=100)),
                ('detail', models.CharField(max_length=1000)),
                ('detail_url', models.CharField(max_length=200)),
                ('article_timestamp', models.DateTimeField()),
            ],
        ),
        migrations.AddConstraint(
            model_name='financialnews',
            constraint=models.UniqueConstraint(fields=('title', 'article_timestamp'), name='unique_article'),
        ),
    ]
