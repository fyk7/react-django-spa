from datetime import datetime, timedelta
from logging import getLogger
from django.conf import settings
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
from api.models import FinancialNews
from ..utils import bloomberg  # , reuters

# settings_devの'django'ロガーを使用
logger = getLogger('django')


class Command(BaseCommand):
    help = "Fetch financial news"

    def handle(self, *args, **options):
        recent_fetched_news = FinancialNews.objects.filter(
            article_timestamp__gte=datetime.today() - timedelta(days=7))
        bloomberg_news = bloomberg.fetch_news()
        # reuters_news = reuters.fetch_news()
        news = bloomberg_news  # + reuters_news
        for n in news:
            financial_news = FinancialNews(publisher=n['publisher'], title=n['title'], detail=n['detail'],
                                           detail_url=n['detail_url'], article_timestamp=n['article_timestamp'])
            if financial_news.title not in [news.title for news in recent_fetched_news]:
                try:
                    financial_news.save()
                except IntegrityError:
                    logger.info(
                        f"Already fetched article: {financial_news.title}")

            else:
                logger.info(f"Skipped article: {financial_news.title}")
